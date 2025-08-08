import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import cors from 'cors';
import twilio from 'twilio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.log('Twilio credentials not found in environment variables');
}

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // Serve the built React app

// Data storage files
const APP_WAITLIST_FILE = 'app_waitlist.json';
const WEARABLE_WAITLIST_FILE = 'wearable_waitlist.json';

// Initialize waitlist files if they don't exist
async function initializeWaitlistFiles() {
  try {
    await fs.access(APP_WAITLIST_FILE);
  } catch {
    await fs.writeFile(APP_WAITLIST_FILE, JSON.stringify([]));
  }
  
  try {
    await fs.access(WEARABLE_WAITLIST_FILE);
  } catch {
    await fs.writeFile(WEARABLE_WAITLIST_FILE, JSON.stringify([]));
  }
}

// Load waitlist data
async function loadWaitlist(filename) {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
}

// Save waitlist data
async function saveWaitlist(filename, data) {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error saving ${filename}:`, error);
    return false;
  }
}

// App waitlist endpoint
app.post('/api/waitlist/app', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    
    const waitlist = await loadWaitlist(APP_WAITLIST_FILE);
    
    // Check if email already exists
    if (waitlist.some(entry => entry.email === email)) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    // Add new entry with timestamp
    const newEntry = {
      email,
      timestamp: new Date().toISOString(),
      type: 'app'
    };
    
    waitlist.push(newEntry);
    
    const saved = await saveWaitlist(APP_WAITLIST_FILE, waitlist);
    
    if (saved) {
      console.log(`App waitlist: ${email} added`);
      res.status(200).json({ message: 'Successfully added to app waitlist' });
    } else {
      res.status(500).json({ error: 'Failed to save to waitlist' });
    }
  } catch (error) {
    console.error('App waitlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Wearable waitlist endpoint
app.post('/api/waitlist/wearable', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    
    const waitlist = await loadWaitlist(WEARABLE_WAITLIST_FILE);
    
    // Check if email already exists
    if (waitlist.some(entry => entry.email === email)) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    // Add new entry with timestamp
    const newEntry = {
      email,
      timestamp: new Date().toISOString(),
      type: 'wearable'
    };
    
    waitlist.push(newEntry);
    
    const saved = await saveWaitlist(WEARABLE_WAITLIST_FILE, waitlist);
    
    if (saved) {
      console.log(`Wearable waitlist: ${email} added`);
      res.status(200).json({ message: 'Successfully added to wearable waitlist' });
    } else {
      res.status(500).json({ error: 'Failed to save to waitlist' });
    }
  } catch (error) {
    console.error('Wearable waitlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// SMS endpoint for phone number submissions
app.post('/api/sms', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    if (!phone || !name || !email) {
      return res.status(400).json({ error: 'Name, email, and phone number are required' });
    }
    
    // Clean phone number (remove all non-digits)
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Validate phone number format (must be exactly 10 digits)
    if (!/^\d{10}$/.test(cleanPhone)) {
      return res.status(400).json({ error: 'Phone number must be exactly 10 digits' });
    }
    
    // Format phone number for SMS (add +1 for US numbers)
    const formattedPhone = `+1${cleanPhone}`;
    
    // Send SMS message
    if (client) {
      const message = await client.messages.create({
        body: 'IMPULSE 2025',
        from: twilioPhoneNumber,
        to: formattedPhone
      });
      
      console.log(`SMS sent to ${formattedPhone}: ${message.sid}`);
      console.log(`Message status: ${message.status}`);
      console.log(`Message direction: ${message.direction}`);
    } else {
      console.log('Twilio client not available - SMS not sent');
    }
    
    // Save to waitlist
    const waitlist = await loadWaitlist(APP_WAITLIST_FILE);
    const newEntry = {
      name,
      email,
      phone: formattedPhone,
      timestamp: new Date().toISOString(),
      type: 'sms'
    };
    
    waitlist.push(newEntry);
    await saveWaitlist(APP_WAITLIST_FILE, waitlist);
    
    res.status(200).json({ 
      message: 'SMS sent successfully',
      sid: message.sid 
    });
    
  } catch (error) {
    console.error('SMS error:', error);
    
    // If Twilio fails, still save to waitlist
    try {
      const { name, email, phone } = req.body;
      const cleanPhone = phone.replace(/\D/g, '');
      const formattedPhone = `+1${cleanPhone}`;
      
      const waitlist = await loadWaitlist(APP_WAITLIST_FILE);
      const newEntry = {
        name,
        email,
        phone: formattedPhone,
        timestamp: new Date().toISOString(),
        type: 'sms_fallback'
      };
      
      waitlist.push(newEntry);
      await saveWaitlist(APP_WAITLIST_FILE, waitlist);
      
      res.status(200).json({ 
        message: 'Added to waitlist (SMS service temporarily unavailable)'
      });
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError);
      res.status(500).json({ error: 'Failed to process request' });
    }
  }
});

// Get all users for admin
app.get('/api/admin/users', async (req, res) => {
  try {
    const appWaitlist = await loadWaitlist(APP_WAITLIST_FILE);
    const wearableWaitlist = await loadWaitlist(WEARABLE_WAITLIST_FILE);
    
    // Combine all users with their source
    const allUsers = [
      ...appWaitlist.map(entry => ({ ...entry, source: 'app' })),
      ...wearableWaitlist.map(entry => ({ ...entry, source: 'wearable' }))
    ];
    
    res.json({
      users: allUsers,
      total: allUsers.length,
      appCount: appWaitlist.length,
      wearableCount: wearableWaitlist.length
    });
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export users as CSV
app.get('/api/admin/export-csv', async (req, res) => {
  try {
    const appWaitlist = await loadWaitlist(APP_WAITLIST_FILE);
    const wearableWaitlist = await loadWaitlist(WEARABLE_WAITLIST_FILE);
    
    // Combine all users
    const allUsers = [
      ...appWaitlist.map(entry => ({ ...entry, source: 'app' })),
      ...wearableWaitlist.map(entry => ({ ...entry, source: 'wearable' }))
    ];
    
    // Create CSV content
    const csvHeader = 'Name,Email,Phone,Source,Timestamp\n';
    const csvRows = allUsers.map(user => 
      `"${user.name || ''}","${user.email || ''}","${user.phone || ''}","${user.source}","${user.timestamp}"`
    ).join('\n');
    
    const csvContent = csvHeader + csvRows;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="impulse-users.csv"');
    res.send(csvContent);
    
  } catch (error) {
    console.error('CSV export error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clear all data
app.post('/api/admin/clear', async (req, res) => {
  try {
    await fs.writeFile(APP_WAITLIST_FILE, JSON.stringify([]));
    await fs.writeFile(WEARABLE_WAITLIST_FILE, JSON.stringify([]));
    
    res.json({ message: 'All data cleared successfully' });
  } catch (error) {
    console.error('Clear data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get waitlist stats (for admin purposes)
app.get('/api/waitlist/stats', async (req, res) => {
  try {
    const appWaitlist = await loadWaitlist(APP_WAITLIST_FILE);
    const wearableWaitlist = await loadWaitlist(WEARABLE_WAITLIST_FILE);
    
    res.json({
      app: {
        count: appWaitlist.length,
        emails: appWaitlist.map(entry => entry.email)
      },
      wearable: {
        count: wearableWaitlist.length,
        emails: wearableWaitlist.map(entry => entry.email)
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Initialize and start server
async function startServer() {
  await initializeWaitlistFiles();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`App waitlist file: ${APP_WAITLIST_FILE}`);
    console.log(`Wearable waitlist file: ${WEARABLE_WAITLIST_FILE}`);
  });
}

startServer().catch(console.error); 
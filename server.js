const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

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
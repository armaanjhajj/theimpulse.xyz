# SMS Setup Guide

To enable SMS functionality for the waitlist, you need to set up Twilio:

## 1. Get Twilio Credentials

1. Sign up for a Twilio account at https://www.twilio.com
2. Get your Account SID and Auth Token from the Twilio Console
3. Purchase a phone number from Twilio

## 2. Environment Variables

Create a `.env` file in the root directory with:

```
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
PORT=3001
```

## 3. How It Works

- When users submit their name and phone number, the system:
  1. Validates the phone number format
  2. Sends an SMS via Twilio with a welcome message
  3. Saves the user to the waitlist
  4. Falls back to just saving to waitlist if SMS fails

## 4. SMS Message

The system sends this message:
"Hey [name]! Thanks for joining the Impulse waitlist. You'll be the first to know when we launch. Stay tuned! 🚀"

## 5. Phone Number Format

The system accepts:
- (555) 123-4567
- 555-123-4567
- 5551234567
- +15551234567

And automatically formats them for SMS sending.

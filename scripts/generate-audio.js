import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create sounds directory if it doesn't exist
const soundsDir = path.join(__dirname, '../public/sounds');
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// Create placeholder audio files (empty files for now)
const audioFiles = ['ambient.mp3', 'footsteps.mp3', 'elevator.mp3'];

audioFiles.forEach(file => {
  const filePath = path.join(soundsDir, file);
  if (!fs.existsSync(filePath)) {
    // Create an empty file as placeholder
    fs.writeFileSync(filePath, '');
    console.log(`Created placeholder: ${file}`);
  }
});

console.log('Audio placeholders created. Replace with actual audio files for full experience.');

// Script to fix note timestamps with realistic dates
const mongoose = require('mongoose');
require('dotenv').config();

// Use the same connection string from your main app
const MONGO_URI = process.env.mongoURL || 'mongodb://localhost:27017/notesdb';

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  user: String,
  createdAt: Date,
  updatedAt: Date
}, { versionKey: false });

const Note = mongoose.model('note', noteSchema);

async function fixNotesTimestamps() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    
    // Get all notes
    const notes = await Note.find({});
    console.log(`Found ${notes.length} notes to process`);
    
    const now = new Date();
    const oneMonthAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)); // 30 days ago
    const oneWeekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)); // 7 days ago
    
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      
      // Create realistic timestamps spread over the last month
      const randomDaysAgo = Math.floor(Math.random() * 30); // 0 to 30 days ago
      const randomHours = Math.floor(Math.random() * 24); // 0 to 23 hours
      const randomMinutes = Math.floor(Math.random() * 60); // 0 to 59 minutes
      
      const createdDate = new Date(now.getTime() - (randomDaysAgo * 24 * 60 * 60 * 1000) - (randomHours * 60 * 60 * 1000) - (randomMinutes * 60 * 1000));
      
      // For some notes, add an updated date a few hours/days after creation
      let updatedDate = createdDate;
      if (Math.random() > 0.6) { // 40% of notes will have been updated
        const updateDelayHours = Math.floor(Math.random() * 48) + 1; // 1 to 48 hours later
        updatedDate = new Date(createdDate.getTime() + (updateDelayHours * 60 * 60 * 1000));
      }
      
      await Note.findByIdAndUpdate(note._id, {
        createdAt: createdDate,
        updatedAt: updatedDate
      });
      
      console.log(`Updated note ${i + 1}/${notes.length}: Created ${createdDate.toLocaleString()}, Updated ${updatedDate.toLocaleString()}`);
    }
    
    console.log(`Successfully updated timestamps for all ${notes.length} notes`);
    
    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error updating notes:', error);
    process.exit(1);
  }
}

fixNotesTimestamps();
// Script to add createdAt to all notes missing it
const mongoose = require('mongoose');
require('dotenv').config();

// Use the same connection string from your main app
const MONGO_URI = process.env.mongoURL || 'mongodb://localhost:27017/notesdb';

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  user: String,
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

const Note = mongoose.model('note', noteSchema);

async function addCreatedAtToNotes() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    
    const result = await Note.updateMany(
      { createdAt: { $exists: false } },
      { $set: { createdAt: new Date() } }
    );
    
    console.log(`Updated ${result.matchedCount} notes with createdAt timestamps.`);
    console.log(`Modified ${result.modifiedCount} documents.`);
    
    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error updating notes:', error);
    process.exit(1);
  }
}

addCreatedAtToNotes();

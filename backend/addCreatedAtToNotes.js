// Script to add createdAt to all notes missing it
const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/notesdb'; // Change db name if needed

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  user: String,
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

const Note = mongoose.model('note', noteSchema);

async function addCreatedAtToNotes() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const result = await Note.updateMany(
    { createdAt: { $exists: false } },
    { $set: { createdAt: new Date() } }
  );
  console.log(`Updated ${result.nModified || result.modifiedCount} notes.`);
  await mongoose.disconnect();
}

addCreatedAtToNotes().catch(console.error);

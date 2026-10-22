const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title: {type: String, required: true, trim: true, maxlength: 200},
    body: {type: String, required: true, trim: true, maxlength: 100000},
    tags: {type: [String], default: []},
    pinned: {type: Boolean, default: false},
    user: {type: String, required: true}
},{
    versionKey: false,
    timestamps: true // This automatically adds createdAt and updatedAt
});

const NoteModel = mongoose.model("note", noteSchema);

module.exports = {
    NoteModel
};
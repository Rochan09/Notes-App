const mongoose = require("mongoose")

const reminderSchema = mongoose.Schema({
    title: {type: String, required: true, trim: true, maxlength: 200},
    description: {type: String, trim: true, maxlength: 5000, default: ""},
    date: {type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/},
    time: {type: String, match: /^\d{2}:\d{2}$/, default: ""},
    completed: {type: Boolean, default: false},
    repeat: {type: String, enum: ["none", "daily", "weekly", "monthly", "yearly"], default: "none"},
    user: {type: String, required: true}
}, {
    versionKey: false,
    timestamps: true
})

const ReminderModel = mongoose.model("reminder", reminderSchema)

module.exports = {
    ReminderModel
}

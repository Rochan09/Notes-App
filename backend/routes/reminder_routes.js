const express = require("express")
const { ReminderModel } = require("../models/ReminderModel")
const { authenticator } = require("../middleware/auth")

const reminderRouter = express.Router()
reminderRouter.use(authenticator)

const parseBoolean = (value) => {
    if (typeof value === "boolean") {
        return value
    }
    if (typeof value === "string") {
        return value.toLowerCase() === "true"
    }
    return Boolean(value)
}

const reminderFields = (body) => ({
    ...(body.title !== undefined ? { title: body.title } : {}),
    ...(body.description !== undefined ? { description: body.description } : {}),
    ...(body.date !== undefined ? { date: body.date } : {}),
    ...(body.time !== undefined ? { time: body.time } : {}),
    ...(body.completed !== undefined ? { completed: parseBoolean(body.completed) } : {}),
    ...(body.repeat !== undefined ? { repeat: body.repeat } : {})
})

reminderRouter.get("/", async(req, res) => {
    try {
        const data = await ReminderModel.find({user: req.user.id})
            .sort({date: 1, time: 1, createdAt: 1})
        res.send({data, message: "Successful", status: 1})
    } catch (error) {
        res.status(500).send({message: error.message, status: 0})
    }
})

reminderRouter.post("/create", async(req, res) => {
    try {
        const reminder = new ReminderModel({
            ...reminderFields(req.body),
            user: req.user.id
        })
        await reminder.save()
        res.status(201).send({data: reminder, message: "Reminder created", status: 1})
    } catch (error) {
        res.status(400).send({message: error.message, status: 0})
    }
})

reminderRouter.patch("/", async(req, res) => {
    const {id} = req.headers
    try {
        const reminder = await ReminderModel.findOneAndUpdate(
            {_id: id, user: req.user.id},
            reminderFields(req.body),
            {new: true, runValidators: true}
        )
        if (!reminder) {
            return res.status(404).send({message: "Reminder not found", status: 0})
        }
        res.send({data: reminder, message: "Reminder updated", status: 1})
    } catch (error) {
        res.status(400).send({message: error.message, status: 0})
    }
})

reminderRouter.delete("/", async(req, res) => {
    const {id} = req.headers
    try {
        const reminder = await ReminderModel.findOneAndDelete({_id: id, user: req.user.id})
        if (!reminder) {
            return res.status(404).send({message: "Reminder not found", status: 0})
        }
        res.send({message: "Reminder deleted", status: 1})
    } catch (error) {
        res.status(400).send({message: error.message, status: 0})
    }
})

module.exports = {
    reminderRouter
}

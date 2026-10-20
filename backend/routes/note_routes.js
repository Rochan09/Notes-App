const express = require("express")
const { NoteModel } = require("../models/NoteModel")
const { authenticator } = require("../middleware/auth")

const noteRouter = express.Router()
noteRouter.use(authenticator)

noteRouter.get("/", async(req, res)=>{
    try {
        const data = await NoteModel.find({user: req.user.id})
        res.send({
            data,
            message: "Successful",
            status: 1
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            status: 0
        })
    }
})

noteRouter.post("/create", async(req, res)=>{
    try {
        const { title, body, tags } = req.body
        const note = new NoteModel({
            title,
            body,
            ...(Array.isArray(tags) ? { tags } : {}),
            user: req.user.id
        })
        await note.save()
        res.status(201).send({
            message: "Note created",
            status: 1
        })
    } catch (error) {
        res.status(400).send({
            message: error.message,
            status: 0
        })
    }
})

noteRouter.patch("/", async(req, res)=>{
    let {id} = req.headers
    try {
        const { title, body, tags } = req.body
        const updateData = {
            ...(title !== undefined ? { title } : {}),
            ...(body !== undefined ? { body } : {}),
            ...(Array.isArray(tags) ? { tags } : {}),
            updatedAt: new Date()
        }
        const note = await NoteModel.findOneAndUpdate(
            {_id: id, user: req.user.id},
            updateData,
            { new: true, runValidators: true }
        )
        if (!note) {
            return res.status(404).send({
                message: "Note not found",
                status: 0
            })
        }
        res.send({
            message: "Note updated",
            status: 1
        })
    } catch (error) {
        res.status(400).send({
            message: error.message,
            status: 0
        })
    }
})

noteRouter.delete("/", async(req, res)=>{
    let {id} = req.headers
    try {
        const note = await NoteModel.findOneAndDelete({_id: id, user: req.user.id})
        if (!note) {
            return res.status(404).send({
                message: "Note not found",
                status: 0
            })
        }
        res.send({
            message: "Note deleted",
            status: 1
        })
    } catch (error) {
        res.status(400).send({
            message: error.message,
            status: 0
        })
    }
})

module.exports = {
    noteRouter
}
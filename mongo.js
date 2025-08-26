const express = require("express")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/studentdata")
    .then(() => console.log("MONGO DB connected"))
    .catch(err => console.log(" DB connection error", err))
const studentschema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    rollno: String
})


const Student = mongoose.model("student", studentschema)
app.post('/insert', async (req, res) => {
    const { name, age, department, rollno } = req.body
    const newStudent = new Student({ name, age, department, rollno });
    try {
        await newStudent.save();
        res.status(201).send("Student inserted")
    } catch (error) {
        res.status(400).send("error")
    }
})
app.get('/getallstd', async (req, res) => {
    try {
        const data = await Student.find();
        res.send(data)
    }
    catch {
        res.status(500).send("error")
    }
})
app.get('/getstdbyroll', async (req, res) => {
    const { rollno } = req.body
    try {
        const { rollno } = req.body

        const data = await Student.findOne({ rollno });
        if (data) {
            res.send(data)
        }
        else {
            res.status(404).send("not found")
        }
    }
    catch {
        res.status(500).send("error")
    }
})
app.get('/getstdbyroll', async (req, res) => {
    const { rollno } = req.body
    try {
        const { rollno } = req.body

        const data = await Student.findOne({ rollno });
        if (data) {
            res.send(data)
        }
        else {
            res.status(404).send("not found")
        }
    }
    catch {
        res.status(500).send("error")
    }
})
app.get('/getstdbyroll', async (req, res) => {
    const { rollno } = req.body
    try {
        const { rollno } = req.body

        const data = await Student.findOne({ rollno });
        if (data) {
            res.send(data)
        }
        else {
            res.status(404).send("not found")
        }
    }
    catch {
        res.status(500).send("error")
    }
})

app.delete('/deletebyroll', async (req, res) => {
    const { rollno } = req.body
    try {
        const { rollno } = req.body

        const data = await Student.deleteOne({ rollno });//it return the count
        if (data.deletedCount > 0) {
            res.send("delete successfully")
        }
        else {
            res.status(404).send("not found")
        }
    }
    catch {
        res.status(500).send("error")
    }
})

app.delete('/deletebyroll', async (req, res) => {
    const { rollno } = req.body
    try {
        const { rollno } = req.body

        const data = await Student.deleteOne({ rollno });//it return the count
        if (data.deletedCount > 0) {
            res.send("delete successfully")
        }
        else {
            res.status(404).send("not found")
        }
    }
    catch {
        res.status(500).send("error")
    }
})

app.delete('/deletebyrollno', async (req, res) => {
    const { rollno } = req.body
    try {
        const { rollno } = req.body

        const data = await Student.findOneAndDelete({ rollno });
        if (data) {

            res.send(data)

        }
        else {
            res.status(404).send("not found")
        }
    }
    catch {
        res.status(500).send("error")
    }
})

app.delete('/updatestudent', async (req, res) => {
    const { rollno, name, age, department } = req.body
    try {


        const data = await Student.findOneAndUpdate(
            { rollno },
            { name, age, department },
            { new: true }
        );
        if (data) {

            res.send("student updated")

        }
        else {
            res.status(404).send("not found")
        }
    }
    catch {
        res.status(500).send("error")
    }
})
app.listen(3003)






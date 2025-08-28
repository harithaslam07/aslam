const express = require("express")
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const app = express()
const db=require('./db')

app.use(express.json())

db()
const studentschema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    rollno: String
})

const Student = mongoose.model("student", studentschema)

app.post('/login',loginn)
app.post('/insert', insertdata)
app.get('/getallstd', verifytoken, getdata)
app.get('/getstdbyroll', verifytoken, getroll)
app.delete('/deletebyroll', verifytoken, deleteroll)
app.delete('/deletebyrollno', verifytoken, deleteby)
app.put('/updatestudent', verifytoken, updatval)



async function loginn (req, res) {
    let { username, password } = req.body
    if (username == "aslam" && password == "999") {
        let token = jwt.sign({ username }, "SECRETKEY", {
            expiresIn: '1h'
        })
        res.send(token);
    }
}

function verifytoken(req, res, next) {
    let token = req.body.token
    if (!token) return res.send("no token provided")
    jwt.verify(token, "SECRETKEY", (err, decoded) => {
        if (err) {

            return res.send("invalid token");
        }
        console.log(decoded)
        next()
    })


}

async function insertdata(req, res) {
    const dup = await Student.findOne({ rollno: req.body.rollno })
    if (!dup) {
        const newStudent = new Student(req.body)


        try {
            await newStudent.save();
            res.status(201).send("Student inserted")
        } catch (error) {
            res.status(400).send("error")
        }
    }
    else {
        res.send("duplicate")
    }
}


async function getdata(req, res) {
    try {
        const data = await Student.find();
        res.send(data)
    }
    catch {
        res.status(500).send("error")
    }
}
async function getroll(req, res) {
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
}




async function deleteroll(req, res) {
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
}



async function deleteby(req, res) {
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
}


async function updatval(req, res) {
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
}
    
app.listen(3003);
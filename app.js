const express = require('express')
const controller=require('./controller')
const app = express()

app.use(express.json());
app.post('/insert', controller.insertdata)
app.get('/get', controller.getdata)
app.get('/getrollno', controller.getrollno)
app.delete('/deleteda', controller.deletedata)
app.put('/edit',controller.editstudent)
app.get('/paramscheck/:id',(req,res)=>{
    res.send("params checked")
})
app.get('/querycheck',(req,res)=>{
    res.send("query params checked")
})

app.listen(3002)
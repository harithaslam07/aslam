let data = []

function insertdata(req, res) {
    let check = data.find(el => el.rollno == req.body.rollno)
    if (!check) {
        data.push(req.body)
        console.log("data : ", data)
        res.send("[SUCCESS]Data recieved")
    }
    else {
        res.send("[INFO]data exist")
    }
}
function getdata(req, res) {
    console.log("enter to get all srudent")
    res.send(data)
}
function getrollno(req, res) {
    let roll = req.body.rollno
    let st = data.find(el => el.rollno == roll)
    if (st) {
        res.status(200).send(st)
    }
    else {
        res.status(400).send("not found")
    }

}
function deletedata(req, res) {
    let roll = req.body.rollno
    data = data.filter(el => el.rollno != roll)
    res.send("deleted successfully")


}
function editstudent(req, res) {
    let roll = req.body.rollno
    let index = data.findIndex(s => s.rollno === roll)
    if (index != -1) {
        data[index] = req.body;
        res.send("student updated")
    }
    else {
        res.status(404).send("student Not found")
    }


}
module.exports = { deletedata, getrollno, insertdata, getdata, editstudent }
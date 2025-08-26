const http = require('http')
let data = [];
const server = http.createServer((req, res) => {
    if (req.method == 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        })
        req.on('end', () => {
            let finaldata = JSON.parse(body);
            data.push(finaldata)
            console.log(data)
            res.statusCode = 200;
            res.end('data inserted')
        })
    }
    if (req.method === 'GET') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        })
        req.on('end', () => {

            if (body) {
                let finaldata = JSON.parse(body);
                if (finaldata.rollNo) {
                    let result = data.find(s => s.rollNo === finaldata.rollNo)
                    res.end(JSON.stringify(result || {}))
                    return;
                }
                else {
                    res.end(JSON.stringify(data))
                }
            }
            else {
                res.end(JSON.stringify(data))
            }

        })
    }
    if (req.method === 'DELETE') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        }
        )
        req.on('end', () => {

            if (body) {
                let finaldata = JSON.parse(body);
                if (finaldata.rollNo) {
                    let index = data.findIndex(s => s.rollNo === finaldata.rollNo)
                    data.splice(index, 1);
                    res.end('data deleted')
                }

            }


        }
        )
    }
    if (req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        }
        )
        req.on('end', () => {

            if (body) {
                let finaldata = JSON.parse(body);
                if (finaldata.rollNo) {
                    let index = data.findIndex(s => s.rollNo === finaldata.rollNo)
                    data[index] = finaldata
                    console.log(data)
                    res.end('data updated')
                }

            }


        }
        )
    }






}).listen(3001);









const express = require('express')
const fs = require('fs')
const mysql = require('mysql');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/savePixels', (req, res) => {
    fs.truncate('pixel.json', 0, function () { console.log('done', req.body) })
    let body = JSON.stringify(req.body)
    fs.appendFile('pixel.json', body, function (err) {
        if (err) throw err;
        console.log('Saved!');
        res.status(200).send('success!')
    });
    //or writeFile that delete anyway
    // fs.writeFile('pixel.json', { "id": req.body.id, genes: { "R": req.body.pixel[0], "G": req.body.pixel[1], "B": req.body.pixel[2] } }, function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    // });
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
})

db.connect(err => {
    if (err)
        throw err
    console.log('mysql connected!')
})

app.get('/createTable', (req, res) => {
    let sql = 'CREATE TABLE PIXEL(id INT,genes JSON)'
    db.query(sql, err => {
        if (err)
            throw err
        res.send('table created')
    })
})
app.get('/insertData', (req, res) => {
    let sql = 'INSERT INTO PIXEL SET ?'
    db.query(sql, req.body, err => {
        if (err)
            throw err
        res.send('employee added')
    })
})

app.listen(3000)
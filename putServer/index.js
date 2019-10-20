const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'intership'
});

mysqlConnection.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> { console.log(`Server srarted on port ${port}`) });

function response(statusCode, message) {
    return {
      statusCode: statusCode,
      body: JSON.stringify(message)
    };
  }

app.post('/api/addpost', (req, res) => {
    let add = req.body;
    let post = {
        title: add.title, 
        body: add.body
    };
    let sql = 'INSERT INTO posts SET ?';
    mysqlConnection.query(sql, post, (err, result) => {
        if(err) throw err;
        res.send('Post created...');
    });
});


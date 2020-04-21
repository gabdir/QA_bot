const mysql = require('mysql')


const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "aidar23121999"
});
  
con.connect((err) => {
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

// try {
//     con.query('CREATE DATABASE qas', (err, result) => {
//         if (err) throw err 
//         console.log('Database created')
//     })
// }
// catch (e){
//     console.log('Database already exist.')
// }


  
con.end((err) => {
    console.log('Connection is terminated.')
});
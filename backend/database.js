const { Client } = require('pg');


const client = new Client({
    user: 'postgres',
    host: 'db',
    database: 'jsoneditor',
    password: '12345',
    port:5432
  });


  client.on("connect",()=>{console.log('DataBase Connected=============>')});
  client.on("end",()=>{console.log('DataBase end===================>')});


module.exports = client;




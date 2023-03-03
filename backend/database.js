const { Client } = require('pg');


const client = new Client({
    user: 'postgres',
    host: 'db',
    database: 'jsoneditor',
    password: '12345',
    port:5432
  });


  client.on("connect",()=>{console.log('<======== Database connected ========>')});
  client.on("end",()=>{console.log('<======== Database end ========>')});


module.exports = client;

 
  
  
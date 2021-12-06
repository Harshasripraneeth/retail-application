'use strict';
const sql = require('mssql');

const config = {
  server: 'cloud-retail.database.windows.net',
  user: 'group-14',
  password: 'Project@1234',
  database: 'retail'
};

const poolPromise =new sql.ConnectionPool(config)
    .connect()
    .then (pool =>{
        console.log("connected")
        return pool
    })
    .catch(err => console.log("failed to connect", err)); 

module.exports = {
  sql, poolPromise
};
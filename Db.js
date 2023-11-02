import mysql from "mysql2";
import "dotenv/config";
let {HOST,USER,PASSWORD,DB} = process.env

var connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

let dbcount=0;
connection.connect(function (err) {
  dbcount++ ;
  console.log("trying--to--connect--db"+dbcount);
  if (err) {
    console.log('error when connecting to db:', err);
    setTimeout(connection.connect(), 2000);
  }
});

connection.on('error', function (err) {
  console.log('connection.on---', err);
  if (err) {connection.connect();} 

});

export default connection;
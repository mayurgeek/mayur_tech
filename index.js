import connection from "./Db.js";
import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import taskRouter from "./src/routers/taskRouter.js";
let serverPort = process.env.SERVERPORT


connection;
const app = express();
      app.use(cors());

app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 70000,
  })
);

app.use(express.static("public"));


connection.query(
  "SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))",
  (err, rows) => {
    if (err) {
      console.log(
        "error-------------------SET GLOBAL sql_mode===========" + err
      );
    } else {
      console.log("--ok-----------------SET GLOBAL sql_mode======ok=====");
      console.log(rows);
    }
  }
);

app.use(
  taskRouter
);

app.get("/server-check", (_req, res) => {
  let dat = new Date();
  res.send({
    latest_update: dat,
    latest_commit: "port-ok 9999  - server-ok",
  });
});

  
  app.listen(serverPort||3000, () => {
    console.log(`server is running at ${serverPort||3000}`);
  });


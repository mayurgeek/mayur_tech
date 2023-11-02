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


app.listen(serverPort || 8888, () => {
  console.log(`server is running at ${serverPort || 8888}`);
});


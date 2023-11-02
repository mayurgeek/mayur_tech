import connection from "../../Db.js";

export function queryListen(qry) {
    return new promise((resolve,reject)=>{
        connection.query(qry,
            (err, rows) => {
              if (err) {
                console.log("err");
                reject(err);
              } else {
                console.log(rows);
                resolve(rows);
              }
            }
          );
    })
}
import express from "express";
import path from "path";
import { MongoClient } from "mongodb";

const app = express();
const __dirname = path.resolve();
app.use(express.static(__dirname + "/public"));

let db;
const url = "mongodb+srv://finetonight:shin@apple-node.qjs1ty3.mongodb.net/";
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum");

    app.listen(8080, () => {
      console.log("서버 연결 성공");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (요청, 응답) => {
  응답.sendFile(__dirname + "/index.html");
});

app.get("/news", () => {
  // insert
  //  db.collection("post").insertOne({ title: "어쩌구" });
});

app.get("/list", async (요청, 응답) => {
  let result = await db.collection("post").find().toArray();
  응답.send("DB에 있던 게시물");
  console.log(result);
});

const client = require("./database");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");


const connectToDB = async () => {
  try {
    await client.connect();
  } catch (err) {
    console.log(err);
  }
};

  

// connect to DB
connectToDB();


app.use(cors());
app.use(bodyParser.json());

app.get("/read", async(req, res) => {
  try {


    console.log("helo");
    client.query("SELECT * FROM json_data", (err, Data) => {
      if (err) throw err;
      console.log(Data.rows);
      res.json(Data.rows);
    });
  } catch (e) {
    res.status(500).send("Error Occurs");
  }
});

app.post("/api/insert-json", async(req, res) => {
  try {
    console.log(req.body);
    const json = req.body;

    await client.query(`
    CREATE TABLE IF NOT EXISTS json_data (
      id SERIAL PRIMARY KEY,
      data JSON NOT NULL,
      createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);


    client.query(
      "INSERT INTO json_data (data) VALUES ($1)",
      [json],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error inserting user");
        } else {
          res.send("User inserted successfully");
        }
      }
    );
  } catch (e) {
    res.status(500).send("Error Occurs");
  }
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

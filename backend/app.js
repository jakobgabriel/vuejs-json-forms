const client = require("./database");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Vue JSON App API",
			version: "1.0.0",
			description: "Data collection platform API",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./app.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
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
/**
 * @swagger
 * components:
 *   schemas:
 *     json_data:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: "Name of the user"
 *         age:
 *           type: integer
 *           description: "Age of the user"
 *         email:
 *           type: string
 *           format: email
 *           description: "Email address of the user"
 *       example:
 *         name: John Doe
 *         age: 30
 *         email: johndoe@example.com
 */
 /**
  * @swagger
  * tags:
  *   name: Insert JSON
  *   description: The data insertion API
  */
/**
 * @swagger
 * /api/insert-json:
 *   post:
 *     summary: Insert JSON data
 *     tags: [Insert JSON]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/json_data'
 *     responses:
 *       200:
 *         description: The data was successfully submited
 *       500:
 *         description: Some server error
 */
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
          res.send("The data was successfully submited");
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

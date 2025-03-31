"use strict"

// Import modules
import express, { response } from "express"
import mysql from "mysql2/promise"

const app = express()
const port = 3000

app.use(express.json())

async function connectToDB() {
    return await mysql.createConnection({
        host: "localhost",
        user: "card_user",
        password: "asdf1234",
        database: "cards_db"
    })
}

app.get("/api/cards/:id", async (request, response) => {
    let connection = null;

    try {

        connection = await connectToDB()

        const [results, fields] = await connection.execute("SELECT * FROM card WHERE card_id = ?",
                                                            [request.params.id]);

        console.log(`${results.length} rows returned`);
        console.log(results);
        response.status(200).json(results);
    }
    catch (error) {
        response.status(500);
        response.json(error);
        console.log(error);
    }
    finally {
        if (connection !== null) {
            connection.end();
            console.log("Connection closed successfully!");
        }
    }
});

app.get("/api/cards", async (request, response) => {
    let connection = null;

    try {

        connection = await connectToDB()

        const [results, fields] = await connection.execute("SELECT * FROM card");

        console.log(`${results.length} rows returned`);
        console.log(results);
        response.status(200).json(results);
    }
    catch (error) {
        response.status(500);
        response.json(error);
        console.log(error);
    }
    finally {
        if (connection !== null) {
            connection.end();
            console.log("Connection closed successfully!");
        }
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
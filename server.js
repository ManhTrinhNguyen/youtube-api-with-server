import express from "express"
import fetch from "node-fetch"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.static("public"))
app.use(express.json())


app.get("/", (req, res) => {
    res.sendFile(__dirname, "index.html")
})

app.post("/", (req, res) => {
    const apiKey = process.env.API_KEY
    //const channelId = "UCqZQlzSHbVJrwrn5XvzrzcA"
    let query = req.body.query
    let channelID = req.body.channelId
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&channelId=${channelID}&q=${query}&maxResults=6`
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        return res.json(data)
    })
    .catch(error => console.log(error))
})


app.listen(3000, () => {
    console.log("App listen on Port 3000");
})

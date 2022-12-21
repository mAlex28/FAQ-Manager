const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors')

const questionRoutes = require("./routes/questionRoutes")

const app = express()
dotenv.config()

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use("/", questionRoutes)

app.get("/", (req, res) => {
  res.send("FAQ Manager server is running")
})

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true, // use to avoid deprecreated error
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(5000, () => console.log(`Server is running on PORT 5000`))
  )
  .catch((err) => console.log(err))

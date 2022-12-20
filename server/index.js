const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const questionRoutes = require("./routes/questionRoutes")

const app = express()
dotenv.config()
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.use("/", questionRoutes)

app.get("/", (req, res) => {
  res.send("FAQ Manager server is running")
})

mongoose
  .connect(
    "mongodb+srv://alex:alex@faqmanagerdb.olud0v0.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true, // use to avoid deprecreated error
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    app.listen(5000, () => console.log(`Server is running on PORT 5000`))
  )
  .catch((err) => console.log(err))

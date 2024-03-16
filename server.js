const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const router = require("./Routes/Userrouter");
const app = express();

app.use(express.json()); //middlewares
app.use("/user", router);

app.get("/", (req, res) => {
  res.send("WelCOME TO USER API CASESTUDY");
});

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  // mongoose.connect(process.env.Cluster_URL, options)
  .then(() => {
    app.listen(port, () => {
      console.log("Server started on port no. " + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });

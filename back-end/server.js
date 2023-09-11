const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const bodyParser = require("body-parser")
const DB = require("./database/DB");

const app = express();
const userRouter = require('./routes/userRoutes');

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use(bodyParser.json());

//DB Config
mongoose.set("strictQuery", false);
mongoose
  .connect(DB.MongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(5000, console.log(`Server started at port 5000`));
  })
  .catch((error) => {
    console.error(error);
  });
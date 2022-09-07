const express = require("express");
const app = express();
const mongoose = require("mongoose");


app.use(express.urlencoded( { extended: true } ));
app.use(express.json( {parameterLimit: 100000, limit: '50mb'} ));

///////////////////DATABASE  CONFIGURATION  ///////////////////
const db = require("./Config/db").mongodbOnline;
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(m => {
      global.mongodbconndbs = m.connection;
      console.log("db connected")
      
      ///////////////// API ROUTES ////////////////
      app.use("/api", require("./Routes/index"));
      // app.use("/api", require("./Routes/attendence"));
      // app.use("/upload", require("./Api/UploadDocs"));
    
    app.get("/", (req, res) => {
        res.status(200).json({ msg: "server running..." });
    });
    
});

///////////// PORT ENVOIRMENT //////////////////
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`SERVER RUNNING AT PORT ${port}`);
});
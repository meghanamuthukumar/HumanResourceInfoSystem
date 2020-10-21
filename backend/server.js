const express = require('express');
const app = express();
const db = require('./db');
const cors = require("cors");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    //if (req.method === 'OPTIONS') {
        //res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      //  return res.status(200).json({});
    //}
})


// import route
const EmployeeRoute = require("./EmployeeRoute");
const AssetRoute = require("./AssetRoute");
const SocialNetworkRoute = require("./SocialNetworkRoute");

// router middleware
app.use("/",EmployeeRoute);
app.use("/", AssetRoute);
app.use("/", SocialNetworkRoute);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log('server is listening on port 8000'))
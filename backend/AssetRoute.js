const express = require("express");
const router = express.Router();
const db = require('./db');
const { body, validationResult } = require('express-validator');
const shortid = require('shortid');
const httpCodes = require('./helpers/httpCodes');

router.post("/createAsset", [
    body("name", "Name is required!!").not().isEmpty(),
  ],
  async (req, res) => {
    console.log("request")
      const error = validationResult(req);
      if(!error.isEmpty()) {
          return res.status(httpCodes.BadRequest).json({ error: error.array() })
      }
    const data = [
        req.body.assetcategory,
        req.body.name,
        req.body.quantity,
        req.body.measurement,
        req.body.vendorname,
        req.body.price,
        req.body.date, 
        req.body.receiver,
        shortid.generate(),
      ]

      console.log(data)
      insertquery = "INSERT INTO asset VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
       db.query(insertquery,
      data)
      .then(result => {
        console.log("post request");
          res.status(httpCodes.OK).json({

              message: 'Added Successfully',
              body: {
                 data: {data}
              }
          })
      })
      .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
      })
  
    });

    router.get("/getAllAsset", async (req, res) => {
      const sql = await db.query('SELECT * FROM asset')
         //const data = res.send(sql.rows)
         .then(result => {
            // data.forEach(row => console.log(row))
             res.status(httpCodes.OK).json(result.rows)
         })
         .catch(err => {
             console.log(err)
             res.status(httpCodes.NotFound).json(err)
         })
  })

module.exports = router;
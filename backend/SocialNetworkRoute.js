const express = require("express");
const router = express.Router();
const db = require('./db');
const shortid = require('shortid');
const httpCodes = require('./helpers/httpCodes');

router.post("/createSocialNetwork", async (req, res) => {
    const data = [
        req.body.facebook,
        req.body.twitter,
        req.body.instagram,
        req.body.pinterest,
        req.body.linkedin,
        req.body.youtube,
        shortid.generate(),
        req.body.empid
      ]

     // console.log(data)
      insertquery = "INSERT INTO socialnetwork VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
      db.query(insertquery, data)
      .then(result => {
       // console.log("post request");
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

router.get("/getById/:networkId", async (req, res) => {
      var getid = req.params.networkId;
        const sql = 'SELECT facebook, twitter, instagram, pinterest, linkedin, youtube, employee.empid FROM socialnetwork JOIN employee ON  socialnetwork.empid = employee.empid WHERE employee.empid=$1'
        db.query(sql, [getid])
        .then( result => {
          res.status(httpCodes.OK).json(result.rows)
        })
        .catch(err => {
            console.log(err)
            res.status(httpCodes.NotFound).json(err)
        })
    })

    router.put("/editSocialNetwork/:id", async (req, res) => {

        var id = req.params.id;
        const data = [
        req.body.facebook,
         req.body.twitter,
         req.body.instagram,
        req.body.pinterest,
        req.body.linkedin,
        req.body.youtube,
         id
        ]
        var  edited ='UPDATE socialnetwork SET facebook = $1, twitter = $2, instagram = $3, pinterest = $4, linkedin = $5, youtube = $6  WHERE id = $7'
        db.query(edited, data)
            .then(result => {
                res.status(httpCodes.OK).json({
                  message: 'Edited Successfully',
                  body: {
                     data: {data}
                    }
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(httpCodes.NotFound).json(err)
            })
      })
   

module.exports = router;
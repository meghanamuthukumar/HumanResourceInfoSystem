const express = require("express");
const router = express.Router();
const db = require('./db');
const { body, validationResult } = require('express-validator');
const shortid = require('shortid');

const multer  = require('multer');
const format = require('date-format');
const httpCodes = require('./helpers/httpCodes');
const nodemailer = require('nodemailer');
const sendEmail = require('./Email/sendingEmail');

// bytea

const multerConf = {
  storage : multer.diskStorage({
    destination : function(req, file, next){
      next(null, './public/images');
    },
    filename: function(req, file, next){
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.' +ext);
    }
  }),
  fileFilter: function(req, file, next) {
    if(!file){
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if(image){
      next(null, true);
    } else{
      next({message: "File type not supported"}, false);
    }
  }
}

/*
var storage = multer.diskStorage({
  destination: "./public/images/",
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase();
    cb(null, filename);
  },
});
var upload = multer({
  storage: storage,
}).single("image");
*/


router.post("/create", multer(multerConf).single('image'), [
    body("name", "Name is required!!").not().isEmpty(),
    body("phonenumber1", "Phone number is required").not().isEmpty(),
  ],
  async (req, res) => {

      const error = validationResult(req);
      if(!error.isEmpty()) {
          return res.status(httpCodes.BadRequest).json({ error: error.array() })
      }

   
    var data = [
        req.body.name,
        req.body.designation,
        req.body.email1,
        req.body.email2,
        req.body.dob,
        req.body.gender,
        req.body.joindate, 
        req.body.address1,
        req.body.address2,
        req.body.area,
        req.body.pincode,
        req.body.city,
        req.body.state,
        req.body.bankifsc,
        req.body.bankupi,
        req.body.pan,
        req.body.bloodgroup,
        req.body.referred,
        req.body.comments, 
        shortid.generate(),
        req.file,
        new Date().toLocaleString("en-GB",{timeZone:"Asia/Kolkata"}).split(", ")[0],
        req.body.phonenumber1,
        req.body.phonenumber2,
        req.body.bankac,
        req.body.aadhar,
        req.body.facebook,
        req.body.twitter,
        req.body.instagram,
        req.body.pinterest,
        req.body.linkedin,
        req.body.youtube,
        new Date().toLocaleString("en-GB",{timeZone:"Asia/Kolkata"}).split(",")[1]
      ]
       db.query('INSERT INTO employee VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33)',
      data)
      db.query('INSERT INTO employeehistory VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33)',
      data)
      .then(result => {
          res.status(httpCodes.OK).json({
              message: 'Added Successfully',
              body: {
                 data: {data}
              }
          })
          sendEmail.sendMailer(
            req.body.email1,
            "Employee Registration",
            "Hi," +
            req.body.name +
            " your registration is created"
          )
      })
      .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
      })
  
    });

  router.get("/getAll", async (req, res) => {
    const sql = await db.query('SELECT * FROM employee')
      // const data = res.send(sql.rows)
      .then(result => { 
         // data.forEach(row => console.log(row))
          res.status(httpCodes.OK).json(result.rows)
      })
      .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
      })
})

router.get("/getOne/:employeeId", async (req, res) => {
  var getone_id = req.params.employeeId;
    const sql = 'SELECT * FROM employee WHERE empid = $1'
    db.query(sql, [getone_id])
    .then( result => {
      res.status(httpCodes.OK).json(result.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

router.put("/edit/:id", multer(multerConf).single('image'), async (req, res) => {

  var empid = req.params.id;
  const data = [
    req.body.name,
    req.body.designation,
    req.body.email1,
    req.body.email2,
    req.body.dob,
    req.body.gender,
    req.body.joindate,
    req.body.address1,
    req.body.address2,
    req.body.area,
    req.body.pincode,
    req.body.city,
    req.body.state,
    req.body.bankifsc,
    req.body.bankupi,
    req.body.pan,
    req.body.bloodgroup,
    req.body.referred,
    req.body.comments,
    req.file,
    new Date().toLocaleString("en-GB",{timeZone:"Asia/Kolkata"}).split(", ")[0],
    req.body.phonenumber1,
    req.body.phonenumber2,
    req.body.bankac,
    req.body.aadhar,
    req.body.facebook,
    req.body.twitter,
    req.body.instagram,
    req.body.pinterest,
    req.body.linkedin,
    req.body.youtube,
    new Date().toLocaleString("en-GB",{timeZone:"Asia/Kolkata"}).split(",")[1],
    empid
  ]
  const data2 = [
    req.body.name,
    req.body.designation,
    req.body.email1,
    req.body.email2,
    req.body.dob,
    req.body.gender,
    req.body.joindate,
    req.body.address1,
    req.body.address2,
    req.body.area,
    req.body.pincode,
    req.body.city,
    req.body.state,
    req.body.bankifsc,
    req.body.bankupi,
    req.body.pan,
    req.body.bloodgroup,
    req.body.referred,
    req.body.comments,
    shortid.generate(),
    req.file,
    new Date().toLocaleString("en-GB",{timeZone:"Asia/Kolkata"}).split(", ")[0],
    req.body.phonenumber1,
    req.body.phonenumber2,
    req.body.bankac,
    req.body.aadhar,
    req.body.facebook,
    req.body.twitter,
    req.body.instagram,
    req.body.pinterest,
    req.body.linkedin,
    req.body.youtube,
    new Date().toLocaleString("en-GB",{timeZone:"Asia/Kolkata"}).split(",")[1]
  ]
  var time = req.params.timestamp;
  var  edited ='UPDATE employee SET name = $1, designation = $2, email1 = $3,email2 = $4,' + 
   'dob = $5, gender = $6, joindate = $7, address1 = $8, address2 = $9,' + 
  'area = $10, pincode = $11, city = $12, state = $13, bankifsc = $14, bankupi = $15,' + 
  'pan = $16, bloodgroup = $17, referred = $18, comments = $19, photo = $20, date = $21, ' +
  'phonenumber1 = $22, phonenumber2 = $23, bankac = $24, aadhar = $25,'+  
  'facebook= $26, twitter = $27, instagram = $28, pinterest = $29, linkedin = $30, youtube = $31, timestamp = $32  WHERE empid = $33 '
  
  db.query('INSERT INTO employeehistory VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33)',
      data2)
  
  db.query('SELECT * from employeehistory WHERE timestamp = $1', [time])
  
  .then(result => {
      console.log(result.rows);
      db.query(edited, data)
      .then(response =>{
        res.status(httpCodes.OK).json({
          message: 'Edited Successfully',
            body: {
            data: {data}
            }
        })
        sendEmail.sendMailer(
          req.body.email1,
          "Edit has done successfully",
          "Hi," +
          req.body.name +
          " your have updated"
        )
      })
        .catch(err =>{
          console.log(err)
          res.status(httpCodes.BadRequest).json(err.message)
        })
    })
      .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
      })
})



module.exports = router;
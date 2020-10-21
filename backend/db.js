const pg = require('pg');
pg.defaults.ssl = true;
var connection = "...."; //database goes here

var db = new pg.Client(connection);
db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('connected to postresql database.....')
    }
    
})

module.exports = db
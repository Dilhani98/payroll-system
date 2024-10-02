const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const mysql=require("mysql2");
const cors=require('cors')
const { createPool } = require("mysql2");
const req = require("express/lib/request");
const res = require("express/lib/response");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const db=createPool({
    host:"localhost",
    user:"root",
    password:"Dilhani@1234",
    database:"emp"
});



//  const contactRouter = require('./routes/contacts');
//  app.use('/contacts',contactRouter);



app.post("/client", (req, res) => {
    console.log("hi");
    const name=req.body.name;
    const salary=req.body.salary;
    const deduction=req.body.deduction;
    const allowance=req.body.allowance;

    db.query(
     'INSERT INTO salary (salary_ID,amount,allowance,deduction) VALUES (?,?,?)',
     [name,salary,allowance,deduction],
     (err, result) => {
         if(err){
             console.log(err)
         }else{
             res.send("Values Inserted")
         }
     }
     )
})



app.listen(5000,()=>{
    console.log("server is running on port 5000 ");
});

module.exports=db
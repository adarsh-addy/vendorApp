const mysql = require('mysql');
const express = require("express");
const BackendRouter = express.Router();

// creatpool is used for application grade connectivity in mysql
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "vendor_db",
  });

  BackendRouter.post("/save", async (req, res) => {
    const vendorname = req.body.vendorname;
    const bank_acc_no = req.body.bank_acc_no;
    const bank_name = req.body.bank_name;
    const address = req.body.address;
    const city = req.body.city;
    const country = req.body.country;
    const zip_code = req.body.zip_code;

    if(!vendorname && !bank_acc_no && !bank_name && !address && !city && !country && !zip_code){
      return res.status(400).send({
         message:"Invalid all details"
       })
     }
    // callback og getconnection is type of promise return type of callback.
    db.getConnection(async (err, connection) => {
      if (err) throw err;
  
      // whenever this is called , we will search in database;
      // ? = this is placeholder
      const sqlSearch =
        "SELECT *FROM new_vendor WHERE vendorname=? && bank_acc_no=?";
      const search_query = mysql.format(sqlSearch, [vendorname, bank_acc_no]);
      // whenever this is called we want to insert something to database;
  
      const sqlInsert =
        "INSERT INTO new_vendor(vendorname,bank_acc_no,bank_name,address,city,country,zip_code) VALUES(?,?,?,?,?,?,?)";
      const insert_query = mysql.format(sqlInsert, [
        vendorname,
        bank_acc_no,
        bank_name,
        address,
        city,
        country,
        zip_code
      ]);
  
      // now asking the connection for sql database for the given record;
      await connection.query(search_query, async (err, result) => {
        if (err) throw err;
        console.log("------>searching for result");
        console.log(result.length);
        if (result.length != 0) {
          // releasing the connection with database;
          connection.release();
          console.log("Record already exists");
          res.json({
            message: "Record already exists",
          });
        } else {
          await connection.query(insert_query, (err, result) => {
            if (err) throw err;
            console.log("Record inserted");
            res.json({
              message: "Record inserted successfully",
              result: result,
            });
            connection.release();
          });
        }
      });
    });
  });

  BackendRouter.patch("/update", async (req, res) => {
    const id = req.body.id;
    const vendorname = req.body.vendorname;
    const bank_acc_no = req.body.bank_acc_no;
    const bank_name = req.body.bank_name;
    const address = req.body.address;
    const city = req.body.city;
    const country = req.body.country;
    const zip_code = req.body.zip_code;

    if(!id && !vendorname && !bank_acc_no && !bank_name && !address && !city && !country && !zip_code){
      return res.status(400).send({
         message:"Invalid all details"
       })
     }
    
    db.getConnection(async (err, connection) => {
      if (err) throw err;
      const sqlInsert = `UPDATE new_vendor SET vendorname='${vendorname}', bank_acc_no=${bank_acc_no}, bank_name='${bank_name}', address='${address}' ,city='${city}', country='${country}', zip_code=${zip_code} WHERE id=${id}`;
      await connection.query(sqlInsert, (err, result) => {
        if (err) throw err;
        console.log("Record updated");
        res.json({
          message: "Record updated successfully",
          result: result,
        });
        connection.release();
      });
    });
  });

  BackendRouter.post("/idresult", (req, res) => {
    const id = req.body.id;
    if(!id){
      return res.status(400).send({
         message:"Invalid id "
       })
     }
    console.log("--->id", id);
    // let password=req.body.password;
    db.getConnection(async (err, connection) => {
      if (err) throw err;
      const sqlSearch = `SELECT * FROM new_vendor WHERE id='${id}'`;
      await connection.query(sqlSearch, async (err, result) => {
        if (err) throw err;
        console.log("result", result);
        res.json({
          message: "Query executed",
          records: result,
        });
        connection.release();
      });
    });
  });
  
  BackendRouter.get("/show", async (req, res) => {
    db.getConnection(async (err, connection) => {
      if (err) throw err;
      const sqlSearch = "SELECT * FROM new_vendor";
      await connection.query(sqlSearch, (err, result) => {
        if (err) throw err;
        console.log("result", result);
        res.json({
          message: "Query Executed",
          records: result,
        });
        connection.release();
      });
    });
  });

  BackendRouter.delete("/delete",async(req,res)=>{
    let id=req.body.id
   console.log(req.body);
    db.getConnection(async(err,connection)=>{
        if(err){
            console.log(err);
        }else{
            const insert_qu=`DELETE FROM new_vendor WHERE id ='${id}'`
           await connection.query(insert_qu,(err,result)=>{
                if(err) throw err
                console.log("result",result);
                res.json({
                    message:"Delete Query Executed"

                })
                connection.release()
            })
           
        }

    })
})


  BackendRouter.get("/showcity", async (req, res) => {
    db.getConnection(async (err, connection) => {
      if (err) throw err;
      const sqlSearch = "SELECT * FROM city";
      await connection.query(sqlSearch, (err, result) => {
        if (err) throw err;
        console.log("result", result);
        res.json({
          message: "Query Executed",
          records: result,
        });
        connection.release();
      });
    });
  });

  BackendRouter.get("/showcountry", async (req, res) => {
    db.getConnection(async (err, connection) => {
      if (err) throw err;
      const sqlSearch = "SELECT * FROM country";
      await connection.query(sqlSearch, (err, result) => {
        if (err) throw err;
        console.log("result", result);
        res.json({
          message: "Query Executed",
          records: result,
        });
        connection.release();
      });
    });
  });

  BackendRouter.get('/test',(req,res)=>{
    res.json({
        messsage:'DB connected'
    })
  })



  module.exports=BackendRouter;
  
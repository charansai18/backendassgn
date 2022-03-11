const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs")


var mysqlConnection = mysql.createConnection({
    host: 'sql5.freesqldatabase.com',
    user: 'sql5478075',
    password: '7wXvfkSIPA',
    database: 'sql5478075',
    multipleStatements: true
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('connected');
    }
    else{
        console.log('failed');
    }
});

app.get("/",(req,res)=>{
    res.render("start");
})
app.get("/insert",(req,res)=>{
    res.render("insert");
})

app.get('/view',(req,res)=>{
    mysqlConnection.query('SELECT * FROM invoices ORDER BY date',(err,results)=>{
        if(!err)
        {
            res.render("view", {data: results});
        }
        else{
            throw err;
        }
    })
})

app.post('/addinvoice', (req,res)=>
{
    mysqlConnection.query('INSERT INTO invoices(storename,storeaddress,storephone,storeemail,buyername,buyerphone,date,time,itemname,quantity,priceperitem,discount,gst,taperitem,ta,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.storename,req.body.storeaddress,req.body.storephone,req.body.storeemail,req.body.buyername,req.body.buyerphone,req.body.date,req.body.time,req.body.itemname,req.body.quantity,req.body.priceperitem,req.body.discount,req.body.gst,req.body.taperitem,req.body.ta,req.body.status],(err,response)=>{
        if(!err)
        {
            res.send('Record has inserted');
        }
        else{
            throw err;
        }
    })
});

app.get("/getbyid/:id",(req,res)=>{
    mysqlConnection.query('SELECT * FROM invoices WHERE id=?',[req.params.id],(err,results)=>{
        if(!err)
        {
            res.render("update", {data: results});
        }
        else{
            throw err;
        }
    })
})

app.get('/getstudents', (req,res)=>
{
    
});

app.post('/updateinvoices/:id', (req,res)=>{
    mysqlConnection.query('UPDATE invoices SET storename=?, storeaddress=?, storephone=?, storeemail=?, buyername=?, buyerphone=?, date=?, time=?, itemname=?, quantity=?, priceperitem=?, discount=?, gst=?, taperitem=?, ta=?, status=? WHERE id=?',[req.body.storename,req.body.storeaddress,req.body.storephone,req.body.storeemail,req.body.buyername,req.body.buyerphone,req.body.date,req.body.time,req.body.itemname,req.body.quantity,req.body.priceperitem,req.body.discount,req.body.gst,req.body.taperitem,req.body.ta,req.body.status,req.params.id],(err,rows,fields)=>{
        if(!err)
        {
            res.redirect("/view");
        }
        else{
            throw err;
        }
    })
})

app.get('/deleteinvoices/:id', (req,res)=>{
    mysqlConnection.query('DELETE FROM invoices WHERE id=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        {
            res.redirect("/view");
        }
        else{
            throw err;
        }
    })
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("running at 3000");
})
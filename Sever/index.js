const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 4000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({exteded:true}));

app.get('/api/get',(req,res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet,(error,result)=>{
       res.send(result);
    })
});

app.post('/api/post',(req,res)=>{
    const {name,email,contact} = req.body;

    const sqlInsert = "INSERT INTO contact_db (name , email, contact) VALUES (?,?,?)";

    db.query(sqlInsert,[name,email,contact],(error,result)=>{
        if(error){
            console.log(error);
        }

    })
})


app.delete('/api/remove/:id',(req,res)=>{
    const {id} = req.params;
    // const {name,email,contact} = req.body;

    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";

    db.query(sqlRemove,id,(error,result)=>{
        if(error){
            console.log(error);
        }
        
    })
})

app.get('/api/get/:id',(req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet,id,(error,result)=>{
        if(error){
            console.log(error);
        }
       res.send(result);
    })
});
app.put('/api/update/:id',(req,res)=>{
    const {id} = req.params;
    const {name,email,contact} = req.body; 
    const sqlUdate = "UPDATE  contact_db SET name=?, email=?, contact=? WHERE id=?";
    db.query(sqlUdate,[name,email,contact,id],(error,result)=>{
        if(error){
            console.log(error);
        }
       
       res.send(result);
    })
});


app.get('/',(req,res)=>{
    // const sqlInsert = "INSERT INTO contact_db (name , email, contact) VALUES ('Adnan','Adnan@test,com','67376736454')";
    // db.query(sqlInsert,(error,result)=>{
    //     console.log("Error",error);
    //     console.log("Result:",result);
           res.send("hello express") 



    // }) 
 
})





app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
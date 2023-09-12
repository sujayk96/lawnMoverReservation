const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
var cors = require('cors');
app.use(cors());
let savedReservations = []

app.get('/',(req, res) => {
    res.send("hello from GET!");
})

app.get("/addUser/:userName/", (req,res) => {
    let users = []
    fs.readFile('user_details.txt', (err, data) => {
    if (err) {
      
      console.log("no res currently!");
    }
    else{
        users = JSON.parse(data);
        console.log(users);
    }
   });
   console.log(req.params.userName);
   users.push({"name":req.params.userName,
});
    fs.writeFile('user_details.txt', JSON.stringify(users), err => {
        if (err) throw err;
        console.log("file written");
    });
    res.write("User added!");
    res.end();
});

app.get("/getDetails/:userName", (req,res) => {
    
    fs.readFile('reservation_details.txt', (err, data) => {
        if (err) {
          res.write("File not created yet. Add errors!");
          res.end();
        }
        else{
            savedReservations = JSON.parse(data);
            console.log(savedReservations);
            savedReservations.forEach(reservation => {
                if (reservation.name === req.params.userName){
                    console.log(reservation.name);
                    res.write(JSON.stringify(reservation));
                }
                
            });
          res.end();
        }
       });
});

app.get("/update/:userName/:startDate/:startTime/:numHours",(req,res) =>{
    fs.readFile('reservation_details.txt', (err, data) => {
        if (err) {
            console.log("no res currently!");
        }
        else{
            savedReservations = JSON.parse(data);
        }
            console.log(req.params.userName);
            //console.log(savedReservations);
            savedReservations.forEach((reservation, index, object) => {
                console.log(reservation.name);
                if (reservation.name === req.params.userName){
                    object.splice(index,1);
                }
                res.write("changes made!");
                res.write(JSON.stringify(reservation));
                
            });
            savedReservations.push({"name":req.params.userName,
            "startDate":req.params.startDate,
            "startTime":req.params.startTime,
            "numHours":req.params.numHours
        });
            fs.writeFile('reservation_details.txt', JSON.stringify(savedReservations), err => {
                if (err) throw err;
                console.log("file written");
            });

            
            res.end();
        
       });
});

app.get("/delete/:userName",(req,res) =>{
    fs.readFile('reservation_details.txt', (err, data) => {
    if (err) {
        res.write("File not created yet. Add errors!");
        res.end();
    }
    else{
        savedReservations = JSON.parse(data);
        let n = savedReservations.length;
        console.log(req.params.userName);
        savedReservations.forEach((reservation, index, object )=> {
            if (reservation.name === req.params.userName){
                object.splice(index,1);
                console.log("delevting");
                res.write("changes made!");
            }
            
            
        });
        if (n == savedReservations.length){
            res.write("user not found!");
        }

        fs.writeFile('reservation_details.txt', JSON.stringify(savedReservations), err => {
            if (err) throw err;
            console.log("file written");
        });

        
        res.end();
    }
    });
    
    
} );

app.get("/allReservations", (req, res) => {
    fs.readFile('reservation_details.txt', (err, data) => {
        if (err) {
            res.write(JSON.stringify([]));
          res.end();
        }
        else{
            savedReservations = JSON.parse(data);
            res.write(JSON.stringify(savedReservations));
            res.end();
        }
       });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
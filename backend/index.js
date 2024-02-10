const express = require('express')
const request = require('request');
const cors = require('cors');
const fs = require('fs'); 
const mongoose = require('mongoose');

const uri = 'mongodb://localhost/ResearchDB';

app = express();
const PORT = 9000;
app.use(cors());
app.use(express.json());

const userRouter = require('./routes/userAuth.js');
app.use('/users', userRouter);

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("MongoDB database connection established successfully!");
    app.listen(PORT, function (){ 
        console.log('Listening on Port 9000');
    });
  }).catch(err => console.log(err));


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

const researchPostsRouter = require('./routes/researchPost.js');
app.use('/researchPosts', researchPostsRouter);

const hiringFormRouter = require('./routes/hiringForm.js');
app.use('/application', hiringFormRouter);

app.get('/recommendation/:researchId', function(req, res) {

    console.log(req.body);

    var options = { 
        method: 'POST', 
        uri: 'http://127.0.0.1:8000/get_recommendation', 
        body: {
            "job_id" : req.params.researchId
        }, 
        json: true // Automatically stringifies the body to JSON 
    }; 
     
    // var returndata = "done"; 
    var sendrequest = request(options, function(error, response, body) {
        // console.log(response);
        console.log(body);
        res.send(body); 
    });
    
});

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("MongoDB database connection established successfully!");
    app.listen(PORT, function (){ 
        console.log('Listening on Port 9000');
    });
  }).catch(err => console.log(err));


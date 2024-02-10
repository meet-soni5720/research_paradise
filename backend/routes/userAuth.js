const router = require('express').Router();
// Importing Models
let User = require('../models/user.model');


// REGISTER ROUTE
router.post('/signup', async (req, res) => {
  try {
    // Check if username already exists
    const query = await User.find({ username: req.body.email }).exec();

    if(query.length !== 0) {
      return res.status(401).json("User already exists");
    }

    console.log(req.body);

    user_data = {
        email : req.body.email,
        name : req.body.name,
        password: req.body.password,
        googleScholar : req.body.googleScholarId ? req.body.googleScholarId : null,
        github : req.body.githubId ? req.body.githubId : null,
        additionalLinks : req.body.additionalLink ? req.body.additionalLink : null,
        isProfessor : req.body.isProfessor
    }

    // Creating the user
    const user = new User(user_data);

    const newUser = await user.save();

    // Send back the user and token as response
    res.json({
      cred: {
        user: newUser
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.get('/', async(req, res) => {
    try{
        const users = await User.find();
        res.json(users)
    }
    catch(err){
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.json(user);
    }
    catch{
        console.error(err.message);
        res.status(404).json("user not found");
    }
});

router.patch('/:id', async(req, res) => {
    try{
       const user = await User.findById(req.params.id);
       for(var key in req.body){
        if(user.hasOwnProperty(key)){
            user[key] = req.body[key];
        }
       }

       user.save();
    }
    catch(err){
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

// router.delete('/:id', async(req, res) => {
//     try{
//         const user = await User.findById(req.params.id);
//         user.re();
//     }
//     catch(err){
//         console.error(err.message);
//         res.status(500).json("Server error");
//     }
// });

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;
    let user;

    user = await User.find({username: username}).exec();

    // If user is not found give back response
    if(user.length === 0) {
      return res.status(401).json("Username or Password is incorrect");
    }
    // console.log(user);

    // If password is not valid then give back response
    if(password != user[0].password) {
      return res.status(401).json("Username or Password is incorrect");
    }

    // Send back the user and token as response
    res.json({
      cred: {
        user: user[0]
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
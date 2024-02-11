const router = require('express').Router();
// const multer = require('multer');
let hiringForm = require('../models/hiringForm.model');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
// });

// const upload = multer({ storage: storage });

router.get('/research/:researchPost', async(req, res) => {
    try{
        const hf = await hiringForm.find({researchPostId : req.params.researchPost});
        res.json(hf);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

router.post('/:researchPost', async(req, res) => {
    try{
        hiringForm_data = {
            researchPostId : req.params.researchPost,
            userId : req.body.userId,
            userName : req.body.userName,
            email : req.body.email,
            relevantSkills : req.body.relevantSkills,
            researchStatement : req.body.researchStatement
        }

        const hfd = hiringForm(hiringForm_data);
        hfd.save();
        res.json(hfd);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json("server error");
    }
});


router.get('/:hiringFormId', async(req, res) => {
    try{
        const hfd = await hiringForm.findById(req.params.hiringFormId);
    
        // Send back the user and token as response
        res.json(hfd);
    
      } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
      }
});

module.exports = router;
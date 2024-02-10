const router = require('express').Router();
const multer = require('multer');
let hiringForm = require('../models/hiringForm.model');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

router.get('/:researchPost', async(req, res) => {
    try{
        const hf = await hiringForm.find({researchPostId : req.params.researchPost});
        res.json(hf);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

router.post('/:researchPost', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'researchStatement', maxCount: 1 }]),
     async(req, res) => {
    try{
        hiringForm_data = {
            researchPostId : req.params.researchPost,
            userId : req.body.userId,
            resume : req.files['resume'][0].path,
            researchStatement : req.files['researchStatement'][0].path
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
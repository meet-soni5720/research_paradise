const router = require('express').Router();
let researchPosts = require('../models/researchPost.model');

router.get('/', async(req, res) => {
    try{
        const rps = await researchPosts.find().sort({updatedAt : -1});
        res.json(rps);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

router.get('/:id', async(req, res) => {
    try{
        const rps = await researchPosts.findById(req.params.id);
        res.json(rps);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

router.get('/:professorId', async(req, res) => {
    try{
        const rps = await researchPosts.find({professorId : req.params.professorId});
        res.json(rps);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json("server error");
    }
});

router.patch('/:id', async(req, res) => {
    try{
       const rp = await researchPosts.findById(req.params.id);
       for(var key in req.body){
        if(rp.hasOwnProperty(key)){
            rp[key] = req.body[key];
        }
       }
       rp.save();
    }
    catch(err){
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

router.post('/', async(req, res) => {
    try{
        post_data = {
            professorId : req.body.professorId,
            title : req.body.title,
            description : req.body.description,
            teamMembers : req.body.teamMembers ? req.body.teamMembers : null,
            isHiring : req.body.isHiring,
            projectLink : req.body.projectLink ? req.body.projectLink : null,
            requiredSkills : req.body.requiredSkills ? req.body.requiredSkills : null
        }

        const rp = new researchPosts(post_data);

        const newRP = await rp.save();
    
        // Send back the user and token as response
        res.json(rp);
    
      } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
      }
});

module.exports = router;
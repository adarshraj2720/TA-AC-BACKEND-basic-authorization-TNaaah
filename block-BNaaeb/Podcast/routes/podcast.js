var express = require('express');
var router = express.Router();

var Podcast = require('../modals/podcast')
var User = require('../modals/user')

var auth = require('../middlewares/auth');
const { route } = require('.');

    // router.get('/',(req,res,next)=>{
    //     res.render('addpodcast');
    // })

router.get('/',auth.isUser,(req,res,next)=>{
    console.log(req.user.plan ,"plan");
    let userplan = req.user.plan;
    if(userplan === 'Free'){
        Podcast.find({podcastplan:userplan},(err,podcast)=>{
            res.render('adminDashboard',{podcast:podcast})
        })
    }
    if(userplan === "VIP"){
        Podcast.find({podcastplan:{$in:['VIP','Free']}},(err,podcast)=>{
            res.render('adminDashboard',{podcast:podcast})
        })
    }
    if(userplan === "Preminum"){
        Podcast.find({},(err,podcast)=>{
            res.render('adminDashboard',{podcast:podcast});
        })
    }
})


// router.get('/',auth.isAdmin,(req,res,next)=>{
//     Podcast.find({},(err,podcast)=>{
//         res.render('adminDashboard',{podcast:podcast});
//     })
// })

router.get('/new',(req,res,next)=>{
    res.render('addpodcast');
})


router.post('/',auth.isAdmin,(req,res,next)=>{
    var userID = req.body.userID;
    Podcast.create(req.body,(err,createPodcast)=>{
        res.redirect('/podcast/new')
    })
})

router.get('/adminDashboard',(req,res,next)=>{
    Podcast.find({},(err,podcast)=>{
        res.render('adminDashboard',{podcast:podcast})
    })
})



//delete
router.get('/:id/delete',(req,res,next)=>{
    var id = req.params.id;
    Podcast.findByIdAndDelete(id,(err,deletepodcast)=>{
        console.log(err,deletepodcast);
        res.redirect('/podcast/adminDashboard')
    })
})

//edit 

router.get('/:id/edit',(req,res,next)=>{
    var id = req.params.id;
    Podcast.findById(id,(err,podcast)=>{
        res.render('editpodcast',{podcast:podcast});
    })
})


router.post('/:id/edit',(req,res,next)=>{
    var id = req.params.id;
    Podcast.findByIdAndUpdate(id,req.body,(err,podcast)=>{
        res.redirect('/podcast/adminDashboard')
    })
})


module.exports = router;
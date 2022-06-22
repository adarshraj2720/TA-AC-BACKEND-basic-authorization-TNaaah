var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth')


var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/protected',auth.loggedInUser,(req,res)=>{
  res.send('Proteted Resource');

})

router.get('/success',(req,res,next)=>{
  res.render('success');
})

router.get('/failure',(req,res,next)=>{
  res.render('failure')
})


router.get('/auth/github', passport.authenticate('github'))


router.get('/auth/github/callback',passport.authenticate('github',
{failureRedirect:'/failure'}),(req,res)=>{
  //,session:false ==> use after the /failure
  res.redirect('/product')
}
)

//google
router.get('/auth/google', passport.authenticate('google',{
  scope:["profile","email "]
})
)


router.get('/auth/google/callback',passport.authenticate('google',
{failureRedirect:'/failure'}),(req,res)=>{
  //,session:false ==> use after the /failure
  res.redirect('/product')
}
)




module.exports = router;

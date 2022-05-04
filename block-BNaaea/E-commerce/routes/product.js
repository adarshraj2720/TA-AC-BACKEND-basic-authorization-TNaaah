var express = require('express');
var router = express.Router();

var User = require('../modals/user')
var Product = require('../modals/product')

var auth = require('../middlewares/auth')
var path = require('path')

var multer = require('multer');
// const { path } = require('../app');

var pathfile = path.join(__dirname,'../uploadimage')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathfile)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })


//add product
router.get('/new' ,(req ,res ,next) => {
    //console.log(req.session.userID)
   var userID = req.session.userID;
   console.log(userID,"userid");
   User.findById(userID ,(err ,user) => {
     if(user.isAdmin === true) {
       return res.render('addproduct')
     } else {
       return res.redirect('/product')
     }
   })

})

router.post('/' ,upload.single('image'),(req ,res) => {
  req.body.image = req.file.filename;
    Product.create(req.body ,(err ,product) => {
     
      console.log(req.file.filename)
      console.log(err ,product)
      res.redirect('/product/new')
    })
 })

//product
router.get('/',(req,res)=>{
    var userID = req.session.userID;
    var isAdmin = false;
    var isRegister = true;

    if(!userID){
        isAdmin=false;
        isRegister = false;

    }
if(isRegister === true){
    User.findById(userID,(err,user)=>{
        console.log(user.isAdmin,"login");
        if(user.isAdmin===true){
            isAdmin= true;
        }
    })
}
Product.find({},(err,products)=>{
    console.log(products)
    res.render('product',{products,isAdmin,isRegister});
})
})





//edit
router.get('/:id/edit',auth.isAdmin,(req ,res) => {
    var id  = req.params.id;
    console.log(id);
    var userID = req.session.userID;
    // User.findById(userID ,(err ,user) => {
    //   if(user.isAdmin === true) {
        Product.findById(id ,(err ,product) => {
          res.render('editproduct' ,{product :product})
        })
    //   }
    // })
  
  })
  
  router.post('/:id/edit' ,(req ,res) => {
    var id = req.params.id;
    Product.findByIdAndUpdate(id ,req.body,(err ,updateProduct) => {
      console.log(updateProduct ,"update product")
      res.redirect('/product')
    })
  })


//delete
router.get('/:id/delete',auth.isAdmin,(req,res,next)=>{
    var userID= req.session.userID
    console.log(userID,'userid');
    var id = req.params.id;
    console.log(req.user,"rrrrrrrr");
    // User.findById(userID,(err,user)=>{
    //     if(user.isAdmin===true){
            Product.findByIdAndDelete(id,(err,userdelete)=>{
                res.redirect('/product');
            })

    //     }
    // })
})


//like
router.get('/:id/like',auth.isUser,(req,res,next)=>{
    var userID = req.session.userID;
    var id = req.params.id;
    // User.findById(userID,(err,user)=>{
    //     if(user.isAdmin===false){
            Product.findByIdAndUpdate(id,{$inc:{likes:1}},(err,like)=>{
                res.redirect('/product')
            })
    //     }
    // })
})

//dislike
router.get('/:id/dislike',auth.isUser,(req,res,next)=>{
    var userID = req.session.userID;
    var id = req.params.id;
    // User.findById(userID,(err,user)=>{
    //     if(user.isAdmin===false){
            Product.findByIdAndUpdate(id,{$inc:{likes:-1}},(err,like)=>{
                res.redirect('/product')
            })
    //     }
    // })
})

module.exports= router;
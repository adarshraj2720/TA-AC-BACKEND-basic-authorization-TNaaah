var monogoose = require('mongoose');
var schema = monogoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String,minlength:5},
    plan:{type:String, default:"Free"},
    isAdmin:{type:Boolean}
})


userSchema.pre('save',function(next){

    console.log(this,'This in the pre')
    //all admin
    let alladmin=["adarsh@123","sahil@123"];
    if(alladmin.includes(this.email)){
        this.isAdmin= true;
    }else{
        this.isAdmin= false;
    }

    if(this.password && this.isModified ('password')){
        bcrypt.hash(this.password,10,(err,hashed)=>{
            if(err) return next(err)
            this.password = hashed;
            return next()
        })
    }else{
        next()
    }
})


userSchema.methods.verifypassword=function(password,cb){
    bcrypt.compare(password,this.password ,(err,result)=>{
        console.log(result)
        return cb(err,result)
    })
}


var User = monogoose.model('User',userSchema);
module.exports=User;
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

var wishlistSchema = new schema({
    title : {type : String } ,
    quantity : {type : Number ,default:1 },
    likes : {type : Number , default :0} ,
    price :{type : Number },
    userID :[{type : schema.Types.ObjectId, ref :"User"}] ,
    slug: { type: String, slug: "title" },
    image:{type:String}
   
})

var whishlist = mongoose.model('whishlist' , wishlistSchema)
module.exports = whishlist;
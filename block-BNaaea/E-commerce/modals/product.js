var mongoose = require('mongoose');
var schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

var productSchema = new schema({
    title : {type : String } ,
    quantity : {type : Number ,default:1 },
    likes : {type : Number , default :0} ,
    price :{type : Number },
    commentID :[{type : schema.Types.ObjectId, ref :"Comment"}] ,
    slug: { type: String, slug: "title" },
    image:{type:String}
   
})

var Product = mongoose.model('Product' , productSchema)
module.exports = Product;
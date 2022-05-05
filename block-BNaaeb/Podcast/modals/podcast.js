var monogoose = require('mongoose');
var schema = monogoose.Schema;

var podcastSchema = new schema({
    title:{type:String},
    artists:{type:String},
    song:{type:String},
    podcastplan:{type:String},
    userID:{type:schema.Types.ObjectId,ref:"User"},

})


var Podcast = monogoose.model('Podcast',podcastSchema)
module.exports=Podcast;
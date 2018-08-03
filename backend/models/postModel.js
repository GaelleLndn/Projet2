mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
    //_id: String,
    title: {type: String, required: true, max: 50},
    content: {type: String, required: true, max: 50},
    //date: { type: String, required : true, default: 'today'},
    //category: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category', required : true}]
})


module.exports = mongoose.model('Post', postSchema);
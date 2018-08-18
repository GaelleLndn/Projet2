mongoose = require ('mongoose');

const logSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true, max: 50},
    date: { type: String, required : true, default: 'today'},
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category', required : true}],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true }
}, { timestamps: true })


module.exports = mongoose.model('Log', logSchema);
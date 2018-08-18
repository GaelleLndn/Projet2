mongoose = require ('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    label: {type: String, required: true, max: 50, unique: true},
    logs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Log'}],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true }
}, { timestamps: true })


module.exports = mongoose.model('Category', categorySchema);
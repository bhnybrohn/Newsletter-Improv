const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
     mail: {
         type: String,
         required: true
     }
})

module.exports = mongoose.model('Posts', PostSchema)
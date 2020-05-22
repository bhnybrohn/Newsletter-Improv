const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
     mail: {
         type: String,
         required: true
     }
})

module.exports = Post = mongoose.model('post', PostSchema)
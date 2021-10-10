const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    }
});

const BlogModel = mongoose.model('blogs', BlogSchema)

module.exports = BlogModel
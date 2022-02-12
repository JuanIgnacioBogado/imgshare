const {Schema, model} = require('mongoose');
const {extname} = require('path');

const ImageSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    filename: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

ImageSchema.virtual('uniqueId')
    .get(function () {
        return this.filename.replace(extname(this.filename), '');
    });

module.exports = model('Image', ImageSchema);
const {Comment, Image} = require('../models');

async function imageCounter() {
    return await Image.countDocuments();
};

async function commentsCounter() {
    return await Comment.countDocuments();
};

async function imagesTotalViewsCounter() {
    const result = await Image.aggregate([{$group: {
        _id: '1',
        viewsTotal: {$sum: '$views'}
    }}]);
    return result[0].viewsTotal;
};

async function likesTotalCounter() {
    const result = await Image.aggregate([{$group: {
        _id: '1',
        likesTotal: {$sum: '$likes'}
    }}]);
    return result[0].likesTotal;
};

module.exports = async () => {
    
    const [
        images,
        comments,
        views,
        likes
    ] = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imagesTotalViewsCounter(),
        likesTotalCounter()
    ]);

    return {
        images,
        comments,
        views,
        likes
    }

}
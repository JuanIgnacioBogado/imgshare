const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

module.exports = async viewModel => {
    const [
        stats,
        popular,
        comments
    ] = await Promise.all([
        Stats(),
        Images.popular(),
        Comments.newest()
    ]);

    viewModel.sidebar = {
        stats,
        popular,
        comments
    }

    return viewModel;
};
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Blog = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String, slug: 'title' },
        videoId: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Blog.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Blog', Blog);

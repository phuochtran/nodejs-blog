const Blog = require('../models/Blog');
const { mongooseToObject } = require('../../util/mongoose');

class BlogController {
    // [GET]-/blog/:slug
    show(req, res, next) {
        Blog.findOne({ slug: req.params.slug })
            .then((blog) => {
                res.render('blogs/show', { blog: mongooseToObject(blog) });
            })
            .catch(next);
    }

    // [GET]-/blog/create
    create(req, res) {
        res.render('blogs/create');
    }

    // [POST]-/blog/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const blog = new Blog(req.body);
        blog.save()
            .then(() => res.redirect('/me/stored/blogs'))
            .catch(next);
    }

    // [GET]-/blog/:id/edit
    edit(req, res, next) {
        Blog.findById(req.params.id)
            .then((blog) =>
                res.render('blogs/edit', { blog: mongooseToObject(blog) }),
            )
            .catch(next);
    }

    // [PUT]-/blog/:id
    update(req, res, next) {
        Blog.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/blogs'))
            .catch(next);
    }

    // [DELETE]-/blog/:id
    destroy(req, res, next) {
        Blog.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE]-/blog/:id/force
    forceDestroy(req, res, next) {
        Blog.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH]-/blog/:id/restore
    restore(req, res, next) {
        Blog.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST]-/blog/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Blog.delete({ _id: { $in: req.body.blogIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid!' });
        }
    }
}

module.exports = new BlogController();

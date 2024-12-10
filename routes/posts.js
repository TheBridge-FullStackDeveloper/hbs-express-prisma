const prisma = require('../prisma');
const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();


router.get('/confirm/:id', asyncHandler(areYouSure));
router.get('/update/:id', asyncHandler(updatePostView));
router.get('/create', asyncHandler(createPostView));


router.get('/', asyncHandler(getAllPosts));
router.post('/', asyncHandler(createPost));
router.get('/:id', asyncHandler(getPostById));
router.put('/:id', asyncHandler(updatePostById));
router.delete('/:id', asyncHandler(deletePostById));

// async function getAllPosts(req, res) {
//     const allPosts = await prisma.post.findMany();
//     res.render('allposts', {
//         title: 'All Posts',
//         posts: allPosts
//     });
// }

async function getAllPosts(req, res) {
    const allPosts = await prisma.post.findMany({
        take: 15,
        orderBy: {
            updatedAt: 'desc',
        },
    });
    res.render('allposts', {
        title: 'All Posts',
        posts: allPosts,
        isViewPosts: true,
        showDelete: true,
    });
}

async function areYouSure(req, res) {
    const post = await prisma.post.findUnique({ where: {
            id: req.params.id
        }
    });
    if (post == null) {
        res.json('Post not found.')
    }
    res.render('sure', {
        title: 'Are you sure?',
        post: post
    });
}

async function updatePostView(req, res) {
    const post = await prisma.post.findUnique({ where: {
            id: req.params.id
        }
    });
    if (post == null) {
        res.json('Post not found.')
    }
    res.render('form', {
        title: 'Update a post',
        actionUrl: `/posts/${req.params.id}?_method=PUT`,
        defaultTitle: post.title,
        defaultContent: post.content,
        isUpdate: true,
    });
}

async function createPostView(req, res) {
    res.render('form', {
        title: 'Create a post',
        actionUrl: '/posts/',
        defaultTitle: '',
        defaultContent: '',
        isUpdate: false,
        isCreatePost: true,
    });
}



async function createPost(req, res) {
    const filteredBody = ({ title, content } = req.body);
    const post = await prisma.post.create({data: {
        ...filteredBody
    }});
    res.render('postview', {
        title: 'Post Created',
        post,
    });
}

async function getPostById(req, res) {
    const post = await prisma.post.findUnique({ where: {
            id: req.params.id
        }
    });
    if (post == null) return res.json('Not found...');
    res.render('postview', {
        title: 'Post View',
        post,
    });
}

async function updatePostById(req, res) {
    const filteredBody = filterDefinedFields({ title: req.body.title, content: req.body.content });
    console.log(filteredBody)
     try {
        const post = await prisma.post.update({ where: {
                id: req.params.id,
            },
            data: {
                ...filteredBody
            }
        });
        res.render('postview', {
            title: 'Updated Post View',
            post,
        });
    } catch (error) {
        // res.json(error);
        res.json(`Post with ID ${req.params.id} not found.`)
    }
}

function filterDefinedFields(fields) {
    return Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== undefined)
    );
}

async function deletePostById(req, res) {
    try {
        const post = await prisma.post.delete({ where: {
                id: req.params.id
            }
        });
        res.render('postview', {
            title: 'Deleted Post',
            post,
        });
    } catch {
        res.json(`Post with ID ${req.params.id} not found.`)
    }
}

module.exports = router;
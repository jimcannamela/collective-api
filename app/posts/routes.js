const express = require('express')
const router = express.Router()
const db = require('../../lib/db')

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *         author:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         votes:
 *           type: integer
 *           format: int32
 *         img_url:
 *           type: string
 *           format: uri
 */

/**
 * @openapi
 * /posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts.
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *             application/json: 
 *               schema:
 *                   type: array
 *                   items: 
 *                     $ref: '#/components/schemas/Post'
 */
router.get('/posts', (req, res) => {
  const posts = db.posts.findAll()
  res.json(posts)
})

/**
 * @openapi
 * /posts/{postId}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get a post.
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: Id of post to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *             application/json: 
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/posts/:id', (req, res) => {
  const post = db.posts.find(req.params.id)
  res.json(post)
})

/**
 * @openapi
 * /posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Add a post.
 *     requestBody:
 *       description: 'The post to add. Note: {id} will be ignored in the request body.'
 *       content:  
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Success. The newly created post will be returned.
 *         content: 
 *           application/json: 
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 */
router.post('/posts', (req, res) => {
  const newpost = db.posts.insert({
    "author": req.body.author,
    "content": req.body.content,
    "title": req.body.title,
    "createdAt": new Date(),
    "votes": 0,
    "img_url": req.body.img_url
  })
  res.json(newpost)
})

/**
 * @openapi
 * /posts/votes/increase/{postId}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Upvote a post.
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: Id of the post to upvote.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Success. The upvoted post will be returned.
 *         content: 
 *           application/json: 
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.get('/posts/votes/increase/:id', (req, res) => {
  const post = db.posts.find(req.params.id)
  post.votes++
  res.json(post)
})

/**
 * @openapi
 * /posts/votes/decrease/{postId}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Downvote a post.
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: Id of the post to downvote.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Success. The downvoted post will be returned.
 *         content: 
 *           application/json: 
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.get('/posts/votes/decrease/:id', (req, res) => {
  const post = db.posts.find(req.params.id)
  post.votes--
  res.json(post)
})

/**
 * @openapi
 * /posts/{postId}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delete a post.
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: Id of the post to delete.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Delete was successful.
 */
router.delete('/posts/:id', (req, res) => {
  const post = db.posts.find(req.params.id)
  if (post) {
    db.posts.delete(req.params.id)
  }

  res.status(200)
  res.end()
})

module.exports = router

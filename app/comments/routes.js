const express = require('express')
const router = express.Router()
const db = require('../../lib/db')

/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *         content:
 *           type: string
 *         post_id:
 *           type: integer
 *           format: int32
 *           description: The id of the post that this comment belongs to.
 */

/**
 * @openapi
 * /comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get all comments.
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *             application/json: 
 *               schema:
 *                   type: array
 *                   items: 
 *                     $ref: '#/components/schemas/Comment'
 */
router.get('/comments', (req, res) => {
  const comments = db.comments.findAll()
  res.json(comments)
})

/**
 * @openapi
 * /comments/{commentId}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get a comment.
 *     parameters:
 *       - name: commentId
 *         in: path
 *         description: Id of comment to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *            application/json: 
 *               schema:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get('/comments/:id', (req, res) => {
  const comment = db.comments.find(req.params.id)
  res.json(comment)
})

/**
 * @openapi
 * /comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Add a comment to a post.
 *     requestBody:
 *       description: 'The comment to add. Note: {id} will be ignored in the request body.'
 *       content:  
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Success. The newly created comment will be returned.
 *         content: 
 *           application/json: 
 *               schema:
 *                 $ref: '#/components/schemas/Comment'
 */
router.post('/comments', (req, res) => {
  const newComment = db.comments.insert({
    "content": req.body.content,
    "post_id": req.body.post_id,
  });
  res.json(newComment)
})

/**
 * @openapi
 * /comments/{commentId}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete a comment.
 *     parameters:
 *       - name: commentId
 *         in: path
 *         description: Id of the comment to delete.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Delete was successful.
 */
router.delete('/comments/:id', (req, res) => {
  const comment = db.comments.find(req.params.id)
  if (comment) {
    db.comments.delete(req.params.id)
  }

  res.status(200)
  res.end()
})

module.exports = router

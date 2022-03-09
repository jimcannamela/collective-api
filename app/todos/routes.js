const express = require('express');
const router = express.Router();
const db = require('../../lib/db')

/**
 * @openapi
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         complete:
 *           type: boolean
 *     SavedTodo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *         name:
 *           type: string
 *         complete:
 *           type: boolean
 */

/**
 * @openapi
 * /todos:
 *   get:
 *     tags:
 *       - Todos
 *     summary: Get all todos.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref : '#/components/schemas/SavedTodo'
 */
router.get('/todos', (req, res) => {
    const todos = db.todos.findAll();
    res.json(todos);
})

/**
 * @openapi
 * /todos/{todoId}:
 *   get:
 *     tags:
 *       - Todos
 *     summary: Get a todo.
 *     parameters:
 *       - name: todoId
 *         in: path
 *         description: Id of todo to retrive.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref : '#/components/schemas/SavedTodo'
 */
router.get('/todos/:id', (req, res) => {
    const todo = db.todos.find(req.params.id)
    res.json(todo);
})

/**
 * @openapi
 * /todos:
 *   post:
 *     tags:
 *       - Todos
 *     summary: Add a todo.
 *     requestBody:
 *       description: 'The todo to add.'
 *       content:
 *         application/json:
 *            schema:
 *               $ref : '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Success. The newly created todo will be returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref : '#/components/schemas/SavedTodo'
 */
router.post('/todos', (req, res) => {
    const newTodo = db.todos.insert({
        name: req.body.name,
        complete: req.body.complete || false
    })
    res.json(newTodo)
})

/**
 * @openapi
 * /todos/{todoId}:
 *   patch:
 *     tags:
 *       - Todos
 *     summary: Update a todo.
 *     parameters:
 *       - name: todoId
 *         in: path
 *         description: Id of todo to update.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     requestBody:
 *       description: 'The todo updates.'
 *       content:
 *         application/json:
 *            schema:
 *               $ref : '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Success. The updated todo will be returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref : '#/components/schemas/SavedTodo'
 */
router.patch('/todos/:id', (req, res) => {
    const todo = db.todos.find(req.params.id)
    if(req.body.name) {
        todo.name = req.body.name
    }
    if(req.body.complete) {
        todo.complete = req.body.complete
    }
    res.json(todo)
})

/**
 * @openapi
 * /todos/{todoId}:
 *   delete:
 *     tags:
 *       - Todos
 *     summary: Delete a todo.
 *     parameters:
 *       - name: todoId
 *         in: path
 *         description: Id of todo to delete.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Delete was successful.
 */
router.delete('/todos/:id', (req, res) => {
    const todo = db.todos.find(req.params.id)
    if(todo) {
        db.todos.delete(req.params.id)
    }

    res.status(200)
    res.end()
})
module.exports = router;
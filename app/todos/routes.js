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
 *                 $ref : '#/components/schemas/Todo'
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
 *               $ref : '#/components/schemas/Todo'
 */
router.get('/todos/:id', (req, res) => {
    const todo = db.todos.find(req.params.id)
    res.json(todo);
})

router.post('/todos', (req, res) => {
    const newTodo = db.todos.insert({
        name: req.body.name,
        complete: req.body.complete || false
    })
    res.json(newTodo)
})

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

router.delete('/todos/:id', (req, res) => {
    const todo = db.todos.find(req.params.id)
    if(todo) {
        db.todos.delete(req.params.id)
    }

    res.status(200)
    res.end()
})
module.exports = router;
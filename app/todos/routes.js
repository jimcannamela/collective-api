const express = require('express');
const router = express.Router();
const db = require('../../lib/db')

router.get('/todos', (req, res) => {
    const todos = db.todos.findAll();
    res.json(todos);
})

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
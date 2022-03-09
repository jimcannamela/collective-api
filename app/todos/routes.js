const express = require('express');
const router = express.Router();
const db = require('../../lib/db')

router.get('/todos', (req, res) => {
    const todos = db.todos.findAll();
    res.json(todos);
})

module.exports = router;
module.exports = db => {
    const todos = [
        { name: "Wash the car" },
        { name: "Wash the dishes" },
        { name: "Take out the trash", complete: true }

    ]
    todos.forEach(todo => db.todos.insert(todo))
}
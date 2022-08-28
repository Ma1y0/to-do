const express = require('express')
const cors = require('cors')
const pool = require('./db')
const app = express()

//middleware
app.use(cors())
app.use(express.json())


//ROUTER//

//create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        )
        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await pool.query(
            'SELECT * FROM todo'
        )
        res.json(todos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get specific todo
app.get('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const todo = await pool.query(
            'SELECT * FROM todo WHERE todo_id = $1', 
            [id])

        res.json(todo.rows[0])
    } catch (error) {
        console.error(error)
    }
})

//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const {description} = req.body
        const {id} = req.params

        const updatedTodo = await pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2',
            [description, id])

        res.json('Todo was updated')
    } catch (error) {
        console.error(error)
    }
})

//delete a todo
app.delete('/todos/:id', async (req, res) => {
    const {id} = req.params

    const deletedTodo = pool.query(
        'DELETE FROM todo WHERE todo_id = $1',
        [id])

    res.json('todo was sucefuly deleted')
})

app.listen(5000, () => {
    console.log('Server is liteing on port 5000')
})
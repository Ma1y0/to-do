import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";

import EditTodo from "./EditTodo";


function ListTodos() {
    const [todos, setTodos] = useState([])

    async function deleteTodo(id) {
        try {
            // eslint-disable-next-line no-unused-vars
            const deletedTodo = await fetch(`http://localhost:5000/todos/${id}`, {method: 'DELETE'})
            
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error.message)
        }
    }

    async function getTodos() {
        try {

            const response = await fetch('http://localhost:5000/todos')
            const jsonData = await response.json()

            setTodos(jsonData)            
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])


    return (
        <Fragment>
            <table className="table text-center mt-5">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delelte</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td><button className="btn btn-danger" onClick={() => { deleteTodo(todo.todo_id) }}>Delete</button></td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos
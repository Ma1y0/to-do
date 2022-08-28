import { useState } from "react"
import { Fragment } from "react"

function EditTodo({ todo }) {
    const [description, setDescription] = useState(todo.description)

    async function updateDesription(e) {
        e.preventDefault()
        try {
            const body = { description }
            // eslint-disable-next-line no-unused-vars
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(body)

            })

            window.location = '/'
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <Fragment>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
            Edit
            </button>

            <div class="modal" id={`id${todo.todo_id}`} onClick={e => setDescription(todo.description)}>
            <div class="modal-dialog">
                <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Modal Heading</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={e => setDescription(todo.description)}></button>
                </div>

                <div class="modal-body">
                    <input type='text' className="form-control" value={description} onChange={e => {
                        setDescription(e.target.value)
                    }} />
                </div>

                <div class="modal-footer">
                    <button onClick={(e) => updateDesription(e) } className="btn btn-warning">Edit</button>
                    <button onClick={e => setDescription(todo.description)} type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>

        </Fragment>
    )
}

export default EditTodo
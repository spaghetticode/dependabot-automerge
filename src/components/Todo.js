import { useState } from 'react'

function Todo(props) {
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState(props.name)

  const onComplete = (event) => {
    props.toggleComplete(props.id)
  }

  const onDelete = (event) => {
    props.deleteTask(props.id)
  }

  const onNameChanged = (event) => {
    setNewName(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    props.editTask(props.id, newName)
    setEditing(false)
  }

  const viewTemplate = (
    <>
      <div className="c-cb">
        <input id="todo-0" type="checkbox" defaultChecked={props.complete} onClick={onComplete} />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">Eat</span>
        </button>
        <button type="button" className="btn btn__danger" onClick={onDelete}>
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </>
  )

  const editingTemplate = (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input id={props.id} className="todo-text" type="text" onChange={onNameChanged}/>
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  )

  return <li className="todo stack-small">{isEditing ? editingTemplate : viewTemplate}</li>
}

export default Todo

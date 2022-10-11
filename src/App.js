import React, { useState } from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import Heading from './components/Heading'
import FilterButton from './components/FilterButton'

function App(props) {
  const [tasks, setTasks] = useState(props.tasks)
  const [filteredTasks, setFilteredTasks] = useState(tasks)

  const addTask = (name) => {
    if (!name.trim().length) return

    setTasks([...tasks, {name: name, complete: false, id: `todo-${tasks.length+1}`}])
  }

  const toggleComplete = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {...task, complete: !task.complete}
      } else {
        return task
      }
    })
    setTasks(newTasks)
  }

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }

  const filterActive = () => {
    const activeTasks = tasks.filter((task) => !task.complete)
    setFilteredTasks(activeTasks)
  }

  const allTasks = () => {
    setFilteredTasks(tasks)
  }

  const filterComplete = () => {
    const completeTasks = tasks.filter((task) => task.complete)
    setFilteredTasks(completeTasks)
  }

  const editTask = (id, name) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {...task, name: name}
      } else {
        return task
      }
    })
    setTasks(newTasks)
  }

  const taskList = tasks.map((task) => (
    <Todo
      name={task.name}
      id={task.id}
      complete={task.complete}
      key={task.id}
      toggleComplete={toggleComplete}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton name="All" filter={allTasks} />
        <FilterButton name="Active" filter={filterActive}/>
        <FilterButton name="Completed" filter={filterComplete}/>
      </div>
      <Heading taskCount={taskList.length} />
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
      {taskList}
      </ul>
    </div>
  );
}

export default App;

const Heading = (props) => {
  const taskWord = props.taskCount == 1 ? 'task' : 'tasks'

  return(
    <h2 id="list-heading">
      {props.taskCount} {taskWord} remaining
    </h2>
  )
}

export default Heading

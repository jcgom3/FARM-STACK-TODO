import TodoItem from "./Todo";

export default function TodoView(props) {
    const deleteTodo = (todo) => {
      const filteredTodos = props.todoList.filter(
        (t) => t.title !== todo.title
      );
      props.updateTodoList(filteredTodos);
    };
    return (
      <div>
        <ul>
          {props.todoList.map((todo) => (
            <TodoItem todo={todo} deleteTodo={deleteTodo} key={todo.title}/>
          ))}
        </ul>
      </div>
    );
}
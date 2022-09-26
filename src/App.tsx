import {
  useRef,
  useState,
  FormEvent,
  ChangeEvent,
  MutableRefObject,
} from "react";

import { useTodo } from "./hooks/todo";

function App() {
  const [todoName, setTodoName] = useState("");
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();

  const input = useRef() as MutableRefObject<HTMLInputElement>;

  const handleDelete = (todoId: string) => deleteTodo(todoId);
  const handleComplete = (todoId: string) => toggleTodo(todoId);
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setTodoName(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoName) {
      addTodo(todoName);
      input.current.value = "";
    }
  };

  return (
    <div>
      <h1>My Todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          placeholder="Add Todo"
          ref={input}
          type="text"
          name="todo"
        />
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.isComplete ? "line-through" : "" }}
            >
              {todo.name}
            </span>
            <button onClick={(_) => handleComplete(todo.id)}>Complete</button>
            <button onClick={(_) => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import {
  useRef,
  useState,
  FormEvent,
  ChangeEvent,
  MutableRefObject,
} from "react";

type Todo = { id: number; name: string; isComplete: boolean };

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>();

  const input = useRef() as MutableRefObject<HTMLInputElement>;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      id: todos.length + 1,
      name: e.target.value,
      isComplete: false,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo) {
      setTodos((todos) => [newTodo, ...todos]);
      input.current.value = "";
    }
  };

  const handleDelete = (todoId: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== todoId));
  };

  const handleComplete = (todoId: number) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  return (
    <div>
      <h1>Todo App</h1>
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

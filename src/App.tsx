import {
  useRef,
  useState,
  FormEvent,
  ChangeEvent,
  MutableRefObject,
} from "react";

type Todo = { id: number; name: string };

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>();

  const input = useRef() as MutableRefObject<HTMLInputElement>;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ id: todos.length + 1, name: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo) {
      setTodos((todos) => [newTodo, ...todos]);
      input.current.value = "";
    }
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
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

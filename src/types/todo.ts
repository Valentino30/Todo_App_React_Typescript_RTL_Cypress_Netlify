import { ReactNode } from "react";

export type TodoType = {
  id: string;
  name: string;
  isComplete: boolean;
};

export type TodoContextType = {
  todos: TodoType[] | [];
  toggleTodo: (id: string) => void;
  addTodo: (todoName: string) => void;
  deleteTodo: (todoId: string) => void;
};

export type TodoProviderType = {
  children: ReactNode;
};

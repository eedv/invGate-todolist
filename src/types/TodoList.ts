import { Todo } from "./Todo";

export type TodoList = {
  id: number;
  name: string;
  todos: Todo[];
};

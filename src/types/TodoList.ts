import { Todo } from "./Todo";

export type TodoList = {
  id: string;
  name: string;
  todos: Todo[];
};

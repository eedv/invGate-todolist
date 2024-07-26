import { Todo, TodoList } from "../types";

export type TodoState = {
  lists: TodoList[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
};

export type TodoAction =
  | { type: "ADD_TODO"; todo: Todo }
  | {
      type: "UPDATE_TODO";
      listId: string;
      todo: Todo;
    }
  | { type: "TOGGLE_TODO"; listId: string; todoId: string }
  | { type: "DELETE_TODO"; listId: string; todoId: string }
  | { type: "ADD_LIST"; list: TodoList }
  | { type: "UPDATE_LIST"; listId: string; listName: string }
  | { type: "DELETE_LIST"; listId: string }
  | { type: "SET_LISTS"; lists: TodoList[] }
  | { type: "SET_TODOS"; listId: string; todos: Todo[] }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_ERROR"; error: string | null };

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.todo.todo_listId
            ? {
                ...list,
                todos: [...list.todos, action.todo],
              }
            : list
        ),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.listId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.id === action.todo.id ? { ...action.todo } : todo
                ),
              }
            : list
        ),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.listId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.id === action.todoId
                    ? { ...todo, completed: !todo.completed }
                    : todo
                ),
              }
            : list
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.listId
            ? {
                ...list,
                todos: list.todos.filter((todo) => todo.id !== action.todoId),
              }
            : list
        ),
      };
    case "ADD_LIST":
      return {
        ...state,
        lists: [...state.lists, action.list],
      };
    case "UPDATE_LIST":
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.listId) {
            return { ...list, name: action.listName };
          }
          return list;
        }),
      };
    case "DELETE_LIST":
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.listId),
      };
    case "SET_LISTS":
      return {
        ...state,
        lists: action.lists,
        initialized: true,
      };
    case "SET_TODOS":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.listId ? { ...list, todos: action.todos } : list
        ),
      };
    case "SET_LOADING":
      return {
        ...state,
        error: null,
        loading: action.loading,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

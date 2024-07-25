import { createContext, useReducer, ReactNode } from "react";
import { TodoList } from "./types/TodoList";

type TodoAction =
  | { type: "ADD_TODO"; listId: number; title: string }
  | { type: "TOGGLE_TODO"; listId: number; id: number }
  | { type: "DELETE_TODO"; listId: number; id: number }
  | { type: "ADD_LIST"; listName: string }
  | { type: "UPDATE_LIST"; listId: number; listName: string }
  | { type: "DELETE_LIST"; listId: number };

type TodoState = TodoList[];

const initialLists: TodoState = [];

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "ADD_TODO":
      return state.map((list) =>
        list.id === action.listId
          ? {
              ...list,
              todos: [
                ...list.todos,
                {
                  id: list.todos.length + 1,
                  title: action.title,
                  completed: false,
                },
              ],
            }
          : list
      );
    case "TOGGLE_TODO":
      return state.map((list) =>
        list.id === action.listId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === action.id
                  ? { ...todo, completed: !todo.completed }
                  : todo
              ),
            }
          : list
      );
    case "DELETE_TODO":
      return state.map((list) =>
        list.id === action.listId
          ? {
              ...list,
              todos: list.todos.filter((todo) => todo.id !== action.id),
            }
          : list
      );
    case "ADD_LIST":
      return [
        ...state,
        { id: state.length + 1, name: action.listName, todos: [] },
      ];
    case "UPDATE_LIST":
      return state.map((list) => {
        if (list.id === action.listId) {
          return { ...list, name: action.listName };
        }
        return list;
      });
    case "DELETE_LIST":
      return state.filter((list) => list.id !== action.listId);
    default:
      return state;
  }
};

type TodoContextType = {
  lists: TodoState;
  addTodo: (listId: number, text: string) => void;
  toggleTodo: (listId: number, todoId: number) => void;
  deleteTodo: (listId: number, todoId: number) => void;
  addList: (listName: string) => void;
  updateList: (listId: number, listName: string) => void;
  deleteList: (listId: number) => void;
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [lists, dispatch] = useReducer(todoReducer, initialLists);

  const addTodo = (listId: number, title: string) => {
    dispatch({ type: "ADD_TODO", listId, title });
  };

  const toggleTodo = (listId: number, id: number) => {
    dispatch({ type: "TOGGLE_TODO", listId, id });
  };

  const deleteTodo = (listId: number, id: number) => {
    dispatch({ type: "DELETE_TODO", listId, id });
  };

  const addList = (listName: string) => {
    dispatch({ type: "ADD_LIST", listName });
  };

  const updateList = (listId: number, listName: string) => {
    dispatch({ type: "UPDATE_LIST", listId, listName });
  };

  const deleteList = (listId: number) => {
    dispatch({ type: "DELETE_LIST", listId });
  };

  return (
    <TodoContext.Provider
      value={{
        lists,
        addTodo,
        toggleTodo,
        deleteTodo,
        addList,
        updateList,
        deleteList,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

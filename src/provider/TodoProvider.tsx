import { createContext, useReducer, ReactNode } from "react";
import { Todo } from "../types";
import {
  fetchLists as fetchListsAPI,
  fetchTodos as fetchTodosAPI,
  addTodo as addTodoAPI,
  updateTodo as updateTodoAPI,
  deleteTodo as deleteTodoAPI,
  addList as addListAPI,
  updateList as updateListAPI,
  deleteList as deleteListAPI,
} from "../services/todoService";
import { todoReducer, TodoState } from "./reducer";

const initialState: TodoState = {
  lists: [],
  loading: false,
  error: null,
  initialized: false,
};

type TodoContextType = {
  lists: TodoState["lists"];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  fetchLists: () => void;
  fetchTodos: (listId: string) => void;
  addTodo: (listId: string, todo: Todo) => void;
  updateTodo: (listId: string, todo: Todo) => void;
  toggleTodo: (listId: string, todo: Todo) => void;
  deleteTodo: (listId: string, todoId: string) => void;
  addList: (listName: string) => void;
  updateList: (listId: string, listName: string) => void;
  deleteList: (listId: string) => void;
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const setLoading = (loading: boolean) =>
    dispatch({ type: "SET_LOADING", loading });
  const setError = (error: string | null) =>
    dispatch({ type: "SET_ERROR", error });

  const handleRequest = async (request: () => Promise<void>) => {
    setLoading(true);
    try {
      await request();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message ? error.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  const fetchLists = () =>
    handleRequest(async () => {
      const lists = await fetchListsAPI();
      dispatch({ type: "SET_LISTS", lists });
    });

  const fetchTodos = (listId: string) =>
    handleRequest(async () => {
      const todos = await fetchTodosAPI(listId);
      dispatch({ type: "SET_TODOS", listId, todos });
    });

  const addTodo = (listId: string, todo: Todo) =>
    handleRequest(async () => {
      const newTodo = await addTodoAPI(listId, todo);
      dispatch({ type: "ADD_TODO", todo: newTodo });
    });

  const updateTodo = (listId: string, todo: Todo) =>
    handleRequest(async () => {
      const updatedTodo = await updateTodoAPI(listId, todo);
      dispatch({ type: "UPDATE_TODO", listId, todo: updatedTodo });
    });

  const toggleTodo = (listId: string, todo: Todo) =>
    handleRequest(async () => {
      const updatedTodo = await updateTodoAPI(listId, {
        ...todo,
        completed: !todo.completed,
      });
      dispatch({ type: "UPDATE_TODO", listId, todo: updatedTodo });
    });

  const deleteTodo = (listId: string, todoId: string) =>
    handleRequest(async () => {
      await deleteTodoAPI(listId, todoId);
      dispatch({ type: "DELETE_TODO", listId, todoId });
    });

  const addList = (listName: string) =>
    handleRequest(async () => {
      const list = await addListAPI(listName);
      dispatch({ type: "ADD_LIST", list });
    });

  const updateList = (listId: string, listName: string) =>
    handleRequest(async () => {
      await updateListAPI(listId, listName);
      dispatch({ type: "UPDATE_LIST", listId, listName });
    });

  const deleteList = (listId: string) =>
    handleRequest(async () => {
      await deleteListAPI(listId);
      dispatch({ type: "DELETE_LIST", listId });
    });

  return (
    <TodoContext.Provider
      value={{
        lists: state.lists,
        loading: state.loading,
        initialized: state.initialized,
        error: state.error,
        fetchLists,
        fetchTodos,
        addTodo,
        updateTodo,
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

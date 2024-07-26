import { create } from "zustand";
import { Todo } from "../types";
import {
  fetchTodos,
  updateTodo,
  deleteTodo,
  addTodo,
} from "../services/todoService"; // Asegúrate de ajustar la ruta

export type TodoState = {
  todosByListId: Record<string, Todo[]>;
  loading: boolean;
  mutating: boolean;
  error: string | null;
  initialized: boolean;
  fetchTodos: (listId: string) => Promise<void>;
  addTodo: (listId: string, todo: Todo) => void;
  updateTodo: (listId: string, todo: Todo) => void;
  toggleTodo: (listId: string, todo: Todo) => void;
  deleteTodo: (listId: string, todoId: string) => void;
};

export const useTodoStore = create<TodoState>((set) => ({
  todosByListId: {},
  loading: false,
  mutating: false,
  error: null,
  initialized: false,
  fetchTodos: async (listId: string) => {
    set({ loading: true, error: null });
    try {
      const todos = await fetchTodos(listId);
      set((state) => ({
        todosByListId: {
          ...state.todosByListId,
          [listId]: todos,
        },
        initialized: true,
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  addTodo: async (listId: string, todo: Todo) => {
    set({ mutating: true, error: null });
    try {
      const newTodo = await addTodo(listId, todo);
      set((state) => ({
        todosByListId: {
          ...state.todosByListId,
          [listId]: [...state.todosByListId[listId], newTodo],
        },
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ mutating: false });
    }
  },
  updateTodo: async (listId: string, todo: Todo) => {
    set({ mutating: true, error: null });
    try {
      const updatedTodo = await updateTodo(listId, todo);
      set((state) => ({
        todosByListId: {
          ...state.todosByListId,
          [listId]: state.todosByListId[listId].map((td) => {
            return td.id === updatedTodo.id ? updatedTodo : td;
          }),
        },
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ mutating: false });
    }
  },
  toggleTodo: async (listId: string, todo: Todo) => {
    set({ mutating: true, error: null });
    try {
      const updatedTodo = await updateTodo(listId, {
        ...todo,
        completed: !todo.completed,
      });
      set((state) => ({
        todosByListId: {
          ...state.todosByListId,
          [listId]: state.todosByListId[listId].map((td) => {
            return td.id === updatedTodo.id ? updatedTodo : td;
          }),
        },
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ mutating: false });
    }
  },
  deleteTodo: async (listId: string, todoId: string) => {
    set({ mutating: true, error: null });
    try {
      await deleteTodo(listId, todoId);
      set((state) => ({
        todosByListId: {
          ...state.todosByListId,
          [listId]: state.todosByListId[listId].filter(
            (todo) => todo.id !== todoId
          ),
        },
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ mutating: false });
    }
  },
}));

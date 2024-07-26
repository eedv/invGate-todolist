import { create } from "zustand";
import { TodoList } from "../types";
import {
  fetchLists,
  updateList,
  deleteList,
  addList,
} from "../services/todoService"; // Asegúrate de ajustar la ruta

export type TodoState = {
  lists: TodoList[];
  loading: boolean;
  mutating: boolean;
  error: string | null;
  initialized: boolean;
  fetchLists: () => Promise<void>;
  addList: (name: string) => void;
  updateList: (listId: string, listName: string) => void;
  deleteList: (listId: string) => void;
};

export const useTodoListStore = create<TodoState>((set) => ({
  lists: [],
  loading: false,
  mutating: false,
  error: null,
  initialized: false,
  fetchLists: async () => {
    set({ loading: true, error: null });
    try {
      const lists = await fetchLists();
      set({ lists, initialized: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  addList: async (name: string) => {
    set({ mutating: true, error: null });
    try {
      const newList = await addList(name);
      set((state) => ({
        lists: [...state.lists, newList],
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ mutating: false });
    }
  },
  updateList: async (listId: string, listName: string) => {
    set({ mutating: true, error: null });
    try {
      const updatedList = await updateList(listId, listName);
      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === listId ? { ...updatedList } : list
        ),
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ mutating: false });
    }
  },
  deleteList: async (listId: string) => {
    set({ mutating: true, error: null });
    try {
      await deleteList(listId);
      set((state) => ({
        lists: state.lists.filter((list) => list.id !== listId),
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ mutating: false });
    }
  },
}));

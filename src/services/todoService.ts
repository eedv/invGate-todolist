import createApiClient from "./apiClient";
import { Todo, TodoList } from "../types";

const API_BASE_URL = "https://66a3206a44aa63704580061d.mockapi.io/api/v1";
const apiClient = createApiClient(API_BASE_URL);

export const fetchLists = (): Promise<TodoList[]> => {
  return apiClient.get("/todo_lists");
};

export const fetchTodos = (listId: string): Promise<Todo[]> => {
  return apiClient.get(`/todo_lists/${listId}/todos`);
};

export const addTodo = (
  listId: string,
  title: string,
  description?: string
): Promise<Todo> => {
  return apiClient.post(`/todo_lists/${listId}/todos`, { title, description });
};

export const updateTodo = (
  listId: string,
  todoId: string,
  title: string,
  description?: string
): Promise<void> => {
  return apiClient.put(`/todo_lists/${listId}/todos/${todoId}`, {
    title,
    description,
  });
};

export const toggleTodo = (listId: string, todoId: string): Promise<void> => {
  return apiClient.put(`/todo_lists/${listId}/todos/${todoId}`, {
    completed: false,
  });
};

export const deleteTodo = (listId: string, todoId: string): Promise<void> => {
  return apiClient.delete(`/todo_lists/${listId}/todos/${todoId}`);
};

export const addList = (name: string): Promise<TodoList> => {
  return apiClient.post("/todo_lists", { name });
};

export const updateList = (listId: string, name: string): Promise<void> => {
  return apiClient.put(`/todo_lists/${listId}`, { name });
};

export const deleteList = (listId: string): Promise<void> => {
  return apiClient.delete(`/todo_lists/${listId}`);
};

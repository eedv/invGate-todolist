import { Button, Group, Stack } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { TodoItem } from "./TodoItem";
import { TodoItem as TodoItemType } from "./types/TodoItem";
import { FilterControl, FilterControlProps } from "./FilterControl";

export function TodoList() {
  const [itemList, setItemList] = useState<TodoItemType[]>([]);
  const [filter, setFilter] =
    useState<FilterControlProps["value"]>("incomplete");

  const handleAddItem = () => {
    setItemList((oldList) => [
      ...oldList,
      {
        title: `Nueva tarea ${oldList.length + 1}`,
        completed: false,
        id: oldList.length + 1,
      },
    ]);
  };

  const handleStatusChange =
    (id: number) => (e: ChangeEvent<HTMLInputElement>) => {
      setItemList((oldList) => {
        return oldList.map((item) =>
          item.id === id ? { ...item, completed: e.target.checked } : item
        );
      });
    };

  const handleFilterChange = (value: string) => {
    setFilter(value as FilterControlProps["value"]);
  };

  const filteredList = itemList
    .filter((item) => {
      return (
        (filter === "completed" && item.completed) ||
        (filter === "incomplete" && !item.completed) ||
        filter === "all"
      );
    })
    .map((item) => (
      <TodoItem
        key={item.id}
        todoItem={item}
        onChange={handleStatusChange(item.id)}
      />
    ));

  return (
    <Stack>
      <Group>
        <Button onClick={handleAddItem}>Agregar</Button>
        <FilterControl onChange={handleFilterChange} value={filter} />
      </Group>
      {filteredList}
    </Stack>
  );
}

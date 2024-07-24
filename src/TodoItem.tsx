import { Checkbox, Group, Paper, Title, Tooltip } from "@mantine/core";
import { TodoItem as TodoItemType } from "./types/TodoItem";
import { ChangeEvent } from "react";

export interface TodoItemProps {
  todoItem: TodoItemType;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function TodoItem({ todoItem, onChange }: TodoItemProps) {
  return (
    <Paper shadow="sm" p="xl" radius="lg">
      <Group wrap="nowrap">
        <Tooltip
          label={
            todoItem.completed
              ? "Marcar como incompleta"
              : "Marcar como completa"
          }
        >
          <Checkbox
            checked={todoItem.completed}
            size="md"
            onChange={onChange}
          />
        </Tooltip>

        <Title order={3} lineClamp={2}>
          {todoItem.title}
        </Title>
      </Group>
    </Paper>
  );
}

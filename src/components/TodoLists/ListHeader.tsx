import { Button, Group, Text, Title } from "@mantine/core";
import { DeleteListModal } from "./DeleteListModal";
import { UpdateListModal } from "./UpdateListModal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useTodoListStore } from "../../store/useTodoListStore";
import { useDisclosure } from "@mantine/hooks";

export function ListHeader({ listId }: { listId: string }) {
  const { list } = useTodoListStore(({ lists }) => ({
    list: lists.find((l) => l.id === listId),
  }));
  const [showDeletModal, deleteModal] = useDisclosure();
  const [showUpdateModal, updateModal] = useDisclosure();

  if (!list) return <Text>La lista seleccionada no existe</Text>;

  return (
    <Group justify="space-between" preventGrowOverflow={false}>
      <Title order={3} lineClamp={1}>
        {list?.name}
      </Title>
      <Group wrap="nowrap">
        <Button onClick={updateModal.open} leftSection={<IconEdit size={20} />}>
          Editar lista
        </Button>
        <Button
          onClick={deleteModal.open}
          color="red"
          leftSection={<IconTrash size={20} />}
        >
          Eliminar lista
        </Button>
      </Group>
      <DeleteListModal
        opened={showDeletModal}
        onClose={deleteModal.close}
        todoList={list}
      />
      <UpdateListModal
        opened={showUpdateModal}
        onClose={updateModal.close}
        todoList={list}
      />
    </Group>
  );
}

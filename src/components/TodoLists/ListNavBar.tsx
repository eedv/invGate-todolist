import { useEffect } from "react";
import {
  ActionIcon,
  AppShellSection,
  Group,
  NavLink,
  ScrollArea,
  Skeleton,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { NavLink as NavLinkRouter } from "react-router-dom";
import { useTodoContext } from "../../provider/useTodoContext";
import { CreateListModal } from "./CreateListModal";

export function ListNavBar() {
  const [showCreateModal, createModal] = useDisclosure();
  const { lists, initialized, loading, fetchLists, addList } = useTodoContext();

  useEffect(() => {
    if (!initialized && !loading) {
      fetchLists();
    }
  }, [fetchLists, initialized, loading]);

  const handleCreateList = ({ name }: { name: string }) => {
    addList(name);
    createModal.close();
  };

  const isFirstLoading = !initialized && loading;

  return (
    <>
      <AppShellSection mb="sm" p="sm">
        <Group justify="space-between">
          <Title order={4}>Mis listas</Title>
          <ActionIcon
            onClick={createModal.open}
            variant="light"
            size="lg"
            aria-label="add-list"
          >
            <IconPlus />
          </ActionIcon>
        </Group>
      </AppShellSection>
      <AppShellSection component={ScrollArea}>
        {isFirstLoading
          ? Array(8)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} h={24} mb="md" animate={true} />
              ))
          : lists.map((list) => (
              <NavLink
                key={list.id}
                component={NavLinkRouter}
                to={`lists/${list.id}`}
                label={list.name}
              />
            ))}
      </AppShellSection>
      <CreateListModal
        opened={showCreateModal}
        onClose={createModal.close}
        onCreate={handleCreateList}
      />
    </>
  );
}

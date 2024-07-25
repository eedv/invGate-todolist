import { Button, Group, Modal, TextInput } from "@mantine/core";

export function CreateListModal() {
  return (
    <Modal opened={opened} onClose={toggle} title="Crear lista">
      <TextInput label="Nombre" data-autofocus />
      <Group gap="md" justify="end" mt="md">
        <Button variant="light" onClick={toggle}>
          Cancelar
        </Button>
        <Button onClick={handleCreateList}>Crear</Button>
      </Group>
    </Modal>
  );
}

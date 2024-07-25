import { SegmentedControl, SegmentedControlProps } from "@mantine/core";

export interface FilterControlProps {
  value: "all" | "completed" | "incomplete";
  onChange: SegmentedControlProps["onChange"];
}

export function FilterControl({ value, onChange }: FilterControlProps) {
  return (
    <SegmentedControl
      value={value}
      onChange={onChange}
      color="blue"
      data={[
        { label: "Sin terminar", value: "incomplete" },
        { label: "Terminadas", value: "completed" },
        { label: "Ver todos", value: "all" },
      ]}
    />
  );
}

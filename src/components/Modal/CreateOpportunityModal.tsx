import React, { useState, useRef } from "react";
import classes from "./modal.module.css";
import { IconHeart, IconClock } from "@tabler/icons-react";
import {
  NumberInput,
  TextInput,
  NumberInputHandlers,
  Group,
  Badge,
  Radio,
  ActionIcon,
} from "@mantine/core";
import { TimeInput, DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, rem } from "@mantine/core";

export function CreateOpportunityModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  const handlersRef = useRef<NumberInputHandlers>(null);

  return (
    <>
      <Modal title="Create an Opportunity" opened={opened} onClose={close}>
        <TextInput
          label="Opportunity Name"
          withAsterisk
          placeholder="Enter name here"
        />

        <DateTimePicker
          dropdownType="modal"
          label="Date/Time"
          withAsterisk
          description="Date and start time of opportunity"
        />
        <TimeInput withAsterisk description="End time of opportunity" />
        <TextInput
          label="Location"
          withAsterisk
          placeholder="Enter address of opportunity here"
        />
        <NumberInput
          label="Number of Volunteers Needed"
          withAsterisk
          placeholder="Enter number here"
          min={1}
        />
        <TextInput
          label="Description"
          withAsterisk
          placeholder="Enter description here"
        />
        <Group mt="xs">
          <Button color="black" radius="md" style={{ flex: 1 }}>
            Submit for Approval
          </Button>
        </Group>
      </Modal>

      <Button color="grape" radius="xl" onClick={open}>
        +
      </Button>
    </>
  );
}

export default CreateOpportunityModal;

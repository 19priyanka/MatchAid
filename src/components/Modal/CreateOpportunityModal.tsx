import React, { useState, useRef, useEffect } from "react";
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
import { getSession, useSession } from 'next-auth/react';
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, rem } from "@mantine/core";
import { useRouter } from "next/router";
import axios from "axios";
import { GetServerSideProps } from "next";
import { UserType } from "../../CustomTypes/UserType";

export function CreateOpportunityModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: session } = useSession();
  const [checked, setChecked] = useState(false);
  const handlersRef = useRef<NumberInputHandlers>(null);
  const [name, setName] = useState("");
  const [time, setTime] = useState<Date | null>(null);
  const [description, setDescription] = useState("");
  const [volunteersNeeded, setVolunteersNeeded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [location, setLocation] = useState("");
  const email = session?.user?.email;

  const handleCreate = async () => {
    const response = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        time,
        description,
        volunteersNeeded,
        duration,
        location,
        email,
    })
};
fetch('/api/opportunities/postOpportunity', response)
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => console.error('Error:', error));

    close();
  };

  return (
    <>
      <Modal title="Create an Opportunity" opened={opened} onClose={close}>
        <TextInput
          label="Opportunity Name"
          withAsterisk
          placeholder="Enter name here"
          onChange={(event) => setName(event.target.value)}
        />

        <DateTimePicker
          dropdownType="modal"
          label="Date/Time"
          withAsterisk
          description="Date and start time of opportunity"
          onChange={(event)=> setTime(event)}
        />
        <NumberInput withAsterisk description="How long is the opportunity? (in hours)" 
        onChange={(event)=> setDuration(event.value)}/>
        <TextInput
          label="Location"
          withAsterisk
          placeholder="Enter address of opportunity here"
          onChange={(event) => setLocation(event.target.value)}
        />
        <NumberInput
          label="Number of Volunteers Needed"
          withAsterisk
          placeholder="Enter number here"
          min={1}
          onChange={(event) => setVolunteersNeeded(event.value)}
        />
        <TextInput
          label="Description"
          withAsterisk
          placeholder="Enter description here"
          onChange={(event) => setDescription(event.target.value)}
        />
        <Group mt="xs">
          <Button color="black" radius="md" style={{ flex: 1 }} onClick={handleCreate}>
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

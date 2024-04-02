import React, { useState, useRef } from 'react';
import classes from './modal.module.css';
import { IconHeart, IconClock } from '@tabler/icons-react';
import { NumberInput, NumberInputHandlers, Group, Badge, Radio, ActionIcon, TextInput } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, rem } from '@mantine/core';



export function VolunteerModal() {
    const [opened, { open, close }] = useDisclosure(false);
    const [checked, setChecked] = useState(false); 
    const handlersRef = useRef<NumberInputHandlers>(null);

  return (
        <>
          <Modal opened={opened} onClose={close} title="Organization #2">
          <Radio.Group label= "Reason for Volunteering" withAsterisk
                        description="Why are you interested in volunteering for this organization?">
            <Group mt= "xs">
                <Radio value= "passion" label= "This is an event I feel passionately about"/>
                <Radio value= "free" label= "I have some free time and want to give back"/>
                <Radio value= "try" label= "I want to try something new"/>
                <Group>
                <Radio value= "other" />
                    <TextInput placeholder= "Other..." />
                </Group>
            </Group>
            </Radio.Group>
            <Group>            
            <TimeInput label="Hours of Availability" withAsterisk description = "Please indicate at what time you will be arriving"
            leftSection={<IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}/>
            <TimeInput description="Please indicate at what time you will be leaving"
            leftSection={<IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}/>
            </Group>
            <Group mt="xs">
            <Button color = "black"radius="md" style={{ flex: 1 }}>
              Register to Volunteer
            </Button>
            
          </Group>
         
         </Modal>
    
          <Button color = "black" onClick={open}>Volunteer</Button>
          
        </>
  );
};

export default VolunteerModal;
import React, { useState, useRef } from 'react';
import {useSession} from 'next-auth/react';
import classes from './modal.module.css';
import { IconHeart, IconClock } from '@tabler/icons-react';
import { NumberInput, NumberInputHandlers, Group, Badge, Radio, ActionIcon, TextInput } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, rem } from '@mantine/core';
import { Opportunity } from '../../../backend/types/Opportunity';




export function VolunteerModal(eid) {
    const [opened, { open, close }] = useDisclosure(false);
    const { data: session } = useSession();
    const [checked, setChecked] = useState(false); 
    const handlersRef = useRef<NumberInputHandlers>(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [customOption, setCustomOption] = useState('');
    const [hoursOfAvailability, setHours] = useState<string | number>("");
    const email = session?.user?.email;
    const reason = selectedOption;
    const opportunityId = eid;

    const register = async (email, opportunityId, reason, hoursOfAvailability) =>{
      const response = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, 
          opportunityId,
          reason,
          hoursOfAvailability,
        }),
      };
      console.log(email);
      console.log(opportunityId);
      console.log(reason);
      console.log(hoursOfAvailability);
      fetch("/api/opportunities/signUp", response)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));
    
      close();
    };
    const handleRadioChange = (value) => {
      setSelectedOption(value);
      if (value !== 'other') {
        setCustomOption(''); // Clear custom option when other options are selected
      }
    };
  
    const handleCustomInputChange = (event) => {
      setCustomOption(event.target.value);
      setSelectedOption('other'); // Automatically select "other" option when user inputs custom answer
    };

  return (
        <>
          <Modal opened={opened} onClose={close} title={"Register to Volunteer"}>
          <Radio.Group label= "Reason for Volunteering" withAsterisk
                        description="Why are you interested in volunteering for this opportunity?"
                        value={selectedOption} onChange={handleRadioChange}>
            <Group mt= "xs">
                <Radio value= "This is an event I feel passionately about" label= "This is an event I feel passionately about"/>
                <Radio value= "I have some free time and want to give back" label= "I have some free time and want to give back"/>
                <Radio value= "I want to try something new" label= "I want to try something new"/>
                <Group>
                <Radio value= "other" label= "Other"/>
                    {/* <TextInput placeholder= "Other..." /> */}
                </Group>
            </Group>
            </Radio.Group>
            {selectedOption === 'other' && (
        <TextInput
          value={customOption}
          onChange={handleCustomInputChange}
          placeholder="Other"
        />
      )}
            <Group>            
            <NumberInput label="Hours of Availability" withAsterisk description = "Please indicate how many hours you think you’d be available to help out. It’s not mandatory to stay for the entire event time"
            value={hoursOfAvailability} onChange={setHours} 
            leftSection={<IconClock/>}/>
            </Group>
            <Group mt="xs">
            <Button onClick={() => register(email, opportunityId, reason, hoursOfAvailability)} color = "black"radius="md" style={{ flex: 1 }}>
              Register to Volunteer
            </Button>
            
          </Group>
         
         </Modal>
    
          <Button color="black"
                  mt="md"
                  radius="xl"
                  style={{ paddingInline: 25 }} 
                  onClick={open}
          >
            Volunteer
          </Button>
          
        </>
  );
};

export default VolunteerModal;
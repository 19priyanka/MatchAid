import { Menu, Button, rem } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';

function VolunteerMenu() {
  const getVolunteerList = () => {
    // fetch user list for event 
    const volunteers = ["Jane Doe", "Meridith Sloan", "John Smith", "Carter Cole"];
    return volunteers.length > 0 ? (
      <>
        {volunteers.map((volunteer) => (
          <Menu.Item key={volunteer} component="a" href="https://mantine.dev">
            {volunteer}
          </Menu.Item>
        ))}
      </>
    ) : (
      <Menu.Item>No volunteers</Menu.Item>
    );
  }
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <IconUser name="user" size={24} color="black"/>
      </Menu.Target>

      <Menu.Dropdown>
        {getVolunteerList()}
      </Menu.Dropdown>
    </Menu>
  );
}
export default VolunteerMenu;
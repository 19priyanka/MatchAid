import {
  Group,
  Stack,
  Button,
  Card,
  Image,
  Text,
  Menu,
  ActionIcon,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { UserType } from "../../CustomTypes/UserType";
import { IconTrash, IconDots, IconMail } from "@tabler/icons-react";
import { useRouter } from "next/router";

// example for the input
// const volunteerEvents = [
// {Name: "Soup Kitchen", VolCount: 4, Date: "April 14", times: "8:30am-12:00pm", Description: "This is a description of the event that's going to take place."},
// {Name: "Homeless Shelter", VolCount: 10, Date: "April 15", times: "2:30pm-9:00pm", Description: "This is a description of the event that's going to take place."},
// ];
//   <Layout>
//   <Group justify="space-evenly" style={{margin: 25}}>
//   {volunteerEvents.map((event, index) => {
//     return <VolunteerEventCard key={index} event={event} />
// })}
// </Group>
//   </Layout>

const VolunteerEventCard = ({ organization, report }) => {
  const router = useRouter();

  const deleteUser = async (email, userType) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: email,
        userType,
      }),
    };

    await fetch("/api/admin/deleteAccount", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        router.reload();
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));

    // check header to be 201 and if so refresh
  };
  return (
    <Card shadow="lg" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
          h={40}
          w={1300}
        />
      </Card.Section>

      <Stack mt="md" mb="md">
        <Text fw={500} size="md">
          {organization?.fullName}
        </Text>
      </Stack>

      <Text mt="sm" size="sm" c="dimmed">
        {organization?.email}
      </Text>

      <Group justify="flex-end">
        {report && <Text>Reported by: {report.fullName}</Text>}
        <Group gap={0} justify="flex-end">
          <Menu
            transitionProps={{ transition: "pop" }}
            withArrow
            position="bottom-end"
            withinPortal
          >
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots
                  style={{ width: rem(24), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {report && (
                <Menu.Item
                  leftSection={
                    <IconMail
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  {report.email}
                </Menu.Item>
              )}
              <Menu.Item
                leftSection={
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                color="red"
                onClick={async () => {
                  await deleteUser(organization.email, organization.userType);
                }}
              >
                Delete Account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Card>
  );
};
export default VolunteerEventCard;

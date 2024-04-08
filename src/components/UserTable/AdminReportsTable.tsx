import {
  Avatar,
  Container,
  Tabs,
  useMantineTheme,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  rem,
} from "@mantine/core";
import {
  IconUserCircle,
  IconTrash,
  IconDots,
  IconMail,
} from "@tabler/icons-react";
import cx from "clsx";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider, modals } from "@mantine/modals";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const UsersStack = (searchTerm) => {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const [reportedVolunteers, setReported] = useState([]);
  const [allReports, setAll] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/reviews")
      .then((response) => response.json())
      .then((responseData) => {
        console.log("reviews are: ", responseData);
        setReported(
          responseData.filter((event) => {
            return (event.review.revieweeType == "Volunteer");
          })
        );
        console.log(allReports);
        setAll(
          responseData
        );
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    console.log("searchTerm changed to ", searchTerm);
    setReported(
      allReports.filter((report) => {
        console.log("searchTermmmm is ", searchTerm);
        console.log("report is ", report.reviewee.fullName);
        console.log(
          "boolean is ",
          report.reviewee.fullName.includes(searchTerm.searchTerm)
        );
        return report.reviewee.fullName.includes(searchTerm.searchTerm);
      })
    );
  }, [searchTerm]);

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
  };

  const rows = reportedVolunteers.map((item) => (
    <Table.Tr key={item._id}>
      <Table.Td>
        <Group>
          <IconUserCircle style={{ width: rem(50), height: rem(50) }} />
          <div>
            <Text fz="sm" fw={500}>
              {item.reviewee.fullName}
            </Text>
            <Text c="dimmed" fz="xs">
              {item.reviewee.noOfTimesVolunteered}x Volunteer
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Group>
          <Text>Reported by: {item.reviewer.fullName}</Text>
        </Group>
      </Table.Td>
      <Table.Td>
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
              <Menu.Item
                leftSection={
                  <IconMail
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                {item.reviewee.email}
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                color="red"
                onClick={async () => {
                  await deleteUser(item.reviewee.email, item.reviewee.userType);
                }}
              >
                Delete Account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="md">
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

export default UsersStack;

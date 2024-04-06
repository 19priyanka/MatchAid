import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/shared/layout";
import SearchInput from "../components/SearchBar/SearchInput";
import { UserType } from "../CustomTypes/UserType";
import VolunteerEventCard from "../components/UserCards/VolunteerEventCard";
import { Group } from "@mantine/core";
import { getSession, signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const [tabs, settabs] = useState([]);
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user?.name);
  const [attending, setAttendance] = useState(false);
  const [currentTab, setCurrentTab] = useState(
    user == UserType.GUEST || user == UserType.VOLUNTEER ? -1 : 0
  );
  const [volunteerEvents, setVolunteerEvents] = useState<
    {
      Name: string;
      VolCount: number;
      Date: string;
      times: string;
      Description: string;
    }[]
  >([]);

  useEffect(() => {
    setUser(session?.user?.name);
    let URL = []; // this will be a string with the URL of the endpoint we want to fetch from later instead of the array of data
    switch (currentTab) {
      case 0:
        if (user == UserType.ADMIN) {
          URL = [
            {
              Name: "Soup Kitchen ADMIN TAB 0",
              VolCount: currentTab,
              Date: "April 14",
              times: "8:30am-12:00pm",
              Description:
                "This is a description of the event that's going to take place.",
            },
            {
              Name: "Homeless Shelter",
              VolCount: 10,
              Date: "April 15",
              times: "2:30pm-9:00pm",
              Description:
                "This is a description of the event that's going to take place.",
            },
          ];
        } else if (user == UserType.ORGANIZATION) {
          URL = [
            {
              Name: "Soup Kitchen ORG TAB 0",
              VolCount: currentTab,
              Date: "April 14",
              times: "8:30am-12:00pm",
              Description:
                "This is a description of the event that's going to take place.",
            },
            {
              Name: "Homeless Shelter",
              VolCount: 10,
              Date: "April 15",
              times: "2:30pm-9:00pm",
              Description:
                "This is a description of the event that's going to take place.",
            },
          ];
        }

        break;
      case 1:
        if (user == UserType.ADMIN) {
          URL = [
            {
              Name: "Soup Kitchen ADMIN TAB 1",
              VolCount: currentTab,
              Date: "April 14",
              times: "8:30am-12:00pm",
              Description:
                "This is a description of the event that's going to take place.",
            },
            {
              Name: "Homeless Shelter",
              VolCount: 10,
              Date: "April 15",
              times: "2:30pm-9:00pm",
              Description:
                "This is a description of the event that's going to take place.",
            },
          ];
        } else if (user == UserType.ORGANIZATION) {
          URL = [
            {
              Name: "Soup Kitchen ORG TAB 1",
              VolCount: currentTab,
              Date: "April 14",
              times: "8:30am-12:00pm",
              Description:
                "This is a description of the event that's going to take place.",
            },
            {
              Name: "Homeless Shelter",
              VolCount: 10,
              Date: "April 15",
              times: "2:30pm-9:00pm",
              Description:
                "This is a description of the event that's going to take place.",
            },
          ];
        }
        break;
      case 2:
        URL = [
          {
            Name: "Soup Kitchen ADMIN TAB 2",
            VolCount: currentTab,
            Date: "April 14",
            times: "8:30am-12:00pm",
            Description:
              "This is a description of the event that's going to take place.",
          },
          {
            Name: "Homeless Shelter",
            VolCount: 10,
            Date: "April 15",
            times: "2:30pm-9:00pm",
            Description:
              "This is a description of the event that's going to take place.",
          },
        ];
        break;
      default:
        URL = [
          {
            Name: "Soup Kitchen GENERAL TAB -1",
            VolCount: currentTab,
            Date: "April 14",
            times: "8:30am-12:00pm",
            Description:
              "This is a description of the event that's going to take place.",
          },
          {
            Name: "Homeless Shelter",
            VolCount: 10,
            Date: "April 15",
            times: "2:30pm-9:00pm",
            Description:
              "This is a description of the event that's going to take place.",
          },
        ];
        break;
    }

    // fetchData(URL)
    //   .then((data) => {
    //     // Update volunteerEvents with the fetched data
    setVolunteerEvents(URL); // change URL to data after connection
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
  }, [currentTab, session]); // Dependency array ensures the effect runs when selectedTab changes

  // Function to fetch data based on the selected tab
  // const fetchData = async (URL) => {
  //   // const response = await fetch(URL);
  //   // const data = await response.json();
  //   return URL;
  // };

  const renderTabs = () => {
    switch (user) {
      case UserType.ADMIN:
        return ["Pending", "Upcoming", "Past Events"];
      case UserType.ORGANIZATION:
        return ["Upcoming Events", "Past Events"];
      default:
        return [];
    }
  };

  return (
    <Layout>
      <SearchInput
        selected={currentTab}
        tabs={renderTabs()}
        setTab={setCurrentTab}
      />

      <Group justify="space-evenly" style={{ margin: 25 }}>
        {volunteerEvents.map((event, index) => {
          return <VolunteerEventCard key={index} event={event} />;
        })}
      </Group>
    </Layout>
  );
}

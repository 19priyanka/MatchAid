import type { GetServerSideProps } from "next";
import Layout from "../../components/shared/layout";
import SearchInput from "../../components/SearchBar/SearchInput";
import { UserType } from "../../CustomTypes/UserType";
import OrganizationCard from "../../components/UserCards/OrganizationCard";
import { Group } from "@mantine/core";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function homePage() {
  const tabs = ["All Organizations", "Reported Organizations"];
  const [currentTab, setCurrentTab] = useState(0);
  const [organizations, setOrganizations] = useState([]);
  const [allOrganizations, setAll] = useState([]);
  const [reportedOrganizations, setReported] = useState([]);
    
  useEffect(() => {
       
    fetch('/api/admin/reviews')
      .then(response => response.json())
      .then(responseData =>{
        console.log("reviews are: ", responseData);
        setReported( responseData.filter(event => {
          return event.review.revieweeType != 'Volunteer'; // Filter events with time greater than current time
        }));
        console.log(reportedOrganizations);

      })
      .catch(error => console.error('Error:', error));
      
      fetch('/api/admin/organizations')
      .then(response => response.json())
      .then(responseData =>{
        console.log("all organizations are: ", responseData);
        setAll(responseData);
        console.log(allOrganizations);
        setOrganizations(responseData);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  
  useEffect(() => {
    if(currentTab == 1){
      setOrganizations(reportedOrganizations);
    }
    else{
      setOrganizations(allOrganizations);
    }
  }, [currentTab]);

  const filterData = (search: string)=>{
    if(currentTab == 1){
      setOrganizations(reportedOrganizations.filter(event => {
        return event.reviewee.fullName.includes(search) ;
      }));
    }
    else{
      setOrganizations(allOrganizations.filter(event => {
        return event.fullName.includes(search) ; 
      }));
    }
  }

  return (
    <Layout>
      <SearchInput searchBy={filterData} selected={currentTab} setTab={setCurrentTab} tabs={tabs} />
      {currentTab == 1? (
        <Group justify="space-evenly" style={{ margin: 25 }}>
        {organizations.length > 0 ? (
          organizations.map((reported, index) => {
          return <OrganizationCard key={index} organization={reported.reviewee} report={reported.reviewer} />;
        })) : (
          <div>No organizations found</div>
        )}
      </Group>
      ):(
        <Group justify="space-evenly" style={{ margin: 25 }}>
        {organizations.length > 0 ? (
          organizations.map((organization, index) => (
            <OrganizationCard key={index} organization={organization} report={null} />
          ))
        ) : (
          <div>No organizations found</div>
        )}
      </Group>
      )}
      
    </Layout>
  );
}

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (
    !(session?.user?.email && session?.user?.name) ||
    session?.user?.name !== UserType.ADMIN
  ) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export { getServerSideProps };

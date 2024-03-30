import type { NextPage } from "next";
import { useState } from "react";
import Layout from "../components/shared/layout"
import SearchInput from "../components/SearchBar/SearchInput"
import { UserType } from "../CustomTypes/UserType";
import OrganizationCard from "../components/shared/OrganizationCard";
import { Group } from "@mantine/core";

export default function homePage(){
    const tabs = ["All Organizations", "Reported Organizations"];
    const organizations = [
                            {Name: "Soup Kitchen", Description: "This is a description of the event that's going to take place."},
                            {Name: "Homeless Shelter", Description: "This is a description of the event that's going to take place."},
                            ];
   
      
    return (
    <Layout>
        <SearchInput selected={0} tabs={tabs}/>
        
        <Group justify="space-evenly" style={{margin: 25}}>
            {organizations.map((organization, index) => {
                return <OrganizationCard key={index} organization={organization} />
            })}
        </Group>
        
    </Layout>
    )
}
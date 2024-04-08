import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/layout";
import SearchInput from "../../components/SearchBar/SearchInput";
import { UserType } from "../../CustomTypes/UserType";
import  UsersStack  from "../../components/UserTable/AdminUserTable";
import  UsersStackReports  from "../../components/UserTable/AdminReportsTable";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import axios from "axios";
import {Container} from "@mantine/core";

function AdminViewReports(){
    const [isMobileView, setIsMobileView] = useState(false);  
    const [user, setUser] = useState(UserType.ADMIN);
    const [currentTab, setCurrentTab] = useState(user == UserType.GUEST || user == UserType.VOLUNTEER ? -1:0); 
    const { data: session } = useSession();
    const [volunteers, setVolunteers] = useState([]);
    const [allVolunteers, setAll] = useState([]);
    const [reportedVolunteers, setReported] = useState([]);
    const [search, setSearch] = useState('');
    const searchBy=(searchTerm )=>{
      console.log("search starts at ",search);
      setSearch(searchTerm);
      console.log("set search in view to ",search);
      console.log("searchTerm is ", searchTerm)
    };

    var type = 0;
    
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  // useEffect(() => {
  //   switch(currentTab){
  //       case 0:
  //           type = 0;
  //           break;
  //       case 1:
  //           type = 1;
  //           break;
  //   }
  // }, [currentTab]);

    const renderTabs = () => {
            return   ["Volunteers", "New Reports"];
      };

    const tableType = ()=> {
        switch(currentTab){
            case 0:
                return <UsersStack searchTerm={search}/>;
            case 1:
                return <UsersStackReports searchTerm={search}/>;
        }
    };
    return(
        <div>
        <div >
            <main>
                <Layout>    
                <Container
                >
                <SearchInput selected={currentTab} searchBy={searchBy} tabs={renderTabs()} setTab={setCurrentTab}/>
                {tableType()}
                </Container>
                </Layout>
            </main>
        </div>
        </div>

    );
}

export default AdminViewReports;
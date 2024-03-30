import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  AppShell,
  Group,
} from "@mantine/core";
import classes from "./Profile.module.css";
import Image from "next/image";
import organizationProfileIcon from "../../../ organizationProfileIcon.png";
import volunteerProfileIcon from "../../../volunteerProfileIcon.png";
import Layout from "../../components/shared/layout";
import { UserType } from "../../CustomTypes/UserType";


export default function Profile() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState('organization' as UserType); //Probably will replace this with singleton when we have user authentication working and can pull user type from there
  
  useEffect(() => {
    setProfileData({
      ...profileData,
      accountType: accountType(),
    });
  }, [user]);

  const accountType = () => {
    switch (user) {
      case UserType.ADMIN:
        return    'Admin';
      case UserType.ORGANIZATION:
        return   'Organization';
     default:
        return  'Volunteer';
    
    }
  };

  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    phoneNumber: "123-456-7890",
    password: "password",
    accountType: accountType(),
  });

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const handleChange = (e, field) => {
    setProfileData({ ...profileData, [field]: e.target.value });
  };

  const handleEditInfo = () => {
    setIsEditMode(true);
  };

  const handleSaveInfo = () => {
    setIsEditMode(false);
  };

  return (
    <Layout>
          
      <Container
        size={isMobileView ? "xs" : "sm"}
        style={{ display: "flex", justifyContent: "center" }}
      >
              
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          style={{ width: "100%", maxWidth: 500 }}
        >
                  
          <Group
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              src={
                profileData.accountType === "Organization"
                  ? organizationProfileIcon
                  : volunteerProfileIcon
              }
              alt="logo"
              width={60}
              height={60}
            />
            <Title ta="center" className={classes.title}>
              {profileData.fullName}
            </Title>

            <Title
              order={4}
              style={{ color: "gray", fontStyle: "italic", fontSize: 16 }}
            >
              {profileData.accountType}
            </Title>
          </Group>
                  
          <TextInput
            label="Full Name"
            placeholder="Your name"
            value={profileData.fullName}
            onChange={(e) => handleChange(e, "fullName")}
            required
            disabled={!isEditMode}
            mt="md"
          />
                  
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={profileData.email}
            onChange={(e) => handleChange(e, "email")}
            required
            disabled={!isEditMode}
            mt="md"
          />
                  
          <TextInput
            label="Phone Number"
            placeholder="123-456-7890"
            value={profileData.phoneNumber}
            onChange={(e) => handleChange(e, "phoneNumber")}
            required
            disabled={!isEditMode}
            mt="md"
          />
                  
          <PasswordInput
            label="Password"
            value={profileData.password}
            onChange={(e) => handleChange(e, "password")}
            required
            mt="md"
            disabled={!isEditMode}
          />
                  
          <Button
            fullWidth
            mt="xl"
            m={20}
            onClick={isEditMode ? handleSaveInfo : handleEditInfo}
            size="md"
            style={{
              justifyContent: "center",
              backgroundColor: "black",
              borderRadius: 10,
              width: "90%",
              fontSize: "18px",
              alignSelf: "center",
            }}
          >
                      {isEditMode ? "Save Info" : "Edit Info"}
                    
          </Button>
                
        </Paper>
            
      </Container>
    </Layout>
  );
}

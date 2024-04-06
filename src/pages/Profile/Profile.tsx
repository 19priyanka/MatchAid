import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  AppShell,
  Drawer,
  Group,
} from "@mantine/core";
import { getSession } from "next-auth/react";
import classes from "./Profile.module.css";
import Image from "next/image";
import organizationProfileIcon from "../../../ organizationProfileIcon.png";
import volunteerProfileIcon from "../../../volunteerProfileIcon.png";
import Layout from "../../components/shared/layout";
import { UserType } from "../../CustomTypes/UserType";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";

export default function Profile() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    accountType: "",
  });

  useEffect(() => {
    const retrieveProfileData = async () => {
      if (session?.user?.email) {
        const response = await axios.post("/api/profile", {
          email: session?.user?.email,
        });
        setProfileData({
          fullName: response.data.fullName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber
            ? response.data.phoneNumber
            : "",

          accountType: response.data.userType,
        });
      }
    };
    retrieveProfileData();
  }, [session]);

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
  const handleSaveInfo = async () => {
    setIsEditMode(false);

    const response = await axios.post("/api/profile/edit", {
      fullName: profileData.fullName,
      email: profileData.email,
      phoneNumber: profileData.phoneNumber,
    });
    if (response.status !== 200) {
      console.error("Error signing up");
      return;
    }
  };

  return (
    <Layout>
          
      <Container
        size={isMobileView ? "xs" : "xl"}
        style={{ display: "flex", justifyContent: "center" }}
      >
              
        <Paper
          withBorder
          shadow="md"
          p={20}
          radius="md"
          style={{ width: "100%", maxWidth: 500 }}
        >
                  
          <Group
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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

            <Title style={{ color: "gray", fontStyle: "italic", fontSize: 16 }}>
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
          />
                  
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={profileData.email}
            onChange={(e) => handleChange(e, "email")}
            required
            disabled={true}
          />
              
          {profileData.phoneNumber ? (
            <TextInput
              label="Phone Number"
              placeholder="123-456-7890"
              value={profileData.phoneNumber}
              onChange={(e) => handleChange(e, "phoneNumber")}
              disabled={!isEditMode}
            />
          ) : (
            <TextInput
              label="Add Your Phone Number"
              placeholder="123-456-7890"
              onChange={(e) => handleChange(e, "phoneNumber")}
              disabled={!isEditMode}
            />
          )}
                  
          <Drawer opened={opened} onClose={close} title="Change Your Password">
            <PasswordInput
              mt="lg"
              label="Current Password"
              placeholder="Your current password"
              required
              style={{ width: "88%", borderRadius: 15 }}
            />
            <PasswordInput
              mt="lg"
              label="New Password"
              placeholder="Your new password"
              required
              style={{ width: "88%", borderRadius: 15 }}
            />
            <PasswordInput
              mt="lg"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              required
              style={{ width: "88%", borderRadius: 15 }}
            />
            <Button
              fullWidth
              mt="xl"
              m={20}
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
              Save Password
            </Button>
          </Drawer>
          <Button
            onClick={open}
            fullWidth
            size="xs"
            variant="outline"
            justify="start"
            style={{
              width: "100%",
              color: "black",
              border: "black",
              justifyItems: "start",
              fontStyle: "italic",
              fontSize: "15px",
            }}
          >
            Change My Password
          </Button>
                  
          <Button
            fullWidth
            mt="lg"
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

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (
    !(session?.user?.email && session?.user?.name) ||
    session?.user?.name === UserType.GUEST
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

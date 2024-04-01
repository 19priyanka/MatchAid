import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Select,
  AppShell,
} from "@mantine/core";
import classes from "./Signup.module.css";
import logo from "../../../logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const handleLogin = () => {
    router.push("/Login/Login");
  };

  return (
    <>
      <AppShell>
        <AppShell.Header>
          <Group>
            <Image src={logo} alt="logo" width={50} height={50} />
          </Group>
        </AppShell.Header>
      </AppShell>

      <Container
        size={420}
      
        style={{ display: "flex",  marginTop: isMobileView? "22%" : "5%" ,justifyContent: "center" }}
      >
        <Group
          style={{
            flexDirection: "column",
            alignItems: "center",
           
          }}
        >
          <Paper
            withBorder
            shadow="md"
            p={30}
            radius="lg"
            style={{
              width: isMobileView ? "100%" : 550,
              height: isMobileView ? "100%" : 710,
            }}
          >
            <Group
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image src={logo} alt="logo" width={90} height={90} />
              <Title
                ta="center"
                className={classes.title}
               
              >
                Create an account
              </Title>
            </Group>
           
              <Group style={{ flexDirection: "column", alignItems: "start"}} ml={40}>
                <TextInput
                  label="Full Name"
                  placeholder="Your name"
                  required
                  style={{ width: "88%", borderRadius: 15 }}
                  mt="lg"
                />
                <TextInput
                  label="Email"
                  placeholder="you@mantine.dev"
                  required
                  style={{  width: "88%", borderRadius: 15 }}
              
                />
                <TextInput
                  label="Phone Number"
                  placeholder="123-456-7890"
                  required
                  style={{  width: "88%", borderRadius: 15 }}
                
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  required
                  
                  style={{  width: "88%", borderRadius: 15 }}
                />

                <Select
               mt="sm"
                  comboboxProps={{ withinPortal: true }}
                  data={["Volunteer", "Organization"]}
                  placeholder="Pick one"
                  label="Type of Account"
                  classNames={classes}
                  required
                />
              </Group>
          

            <Group style={{ justifyContent: "center" }}>
              <Button
               
                mb="md"
                size="md"
                style={{
                  backgroundColor: "black",
                  borderRadius: 10,
                  width: "65%",
                  fontSize: "18px",
                  alignSelf: "center",
                  marginTop:"7%",
                }}
              >
                Sign Up
              </Button>
            </Group>

            <Text c="dimmed" size="sm" ta="center" mt={5}>
              Already have an account yet?{" "}
              <Anchor size="sm" component="button" onClick={handleLogin}>
                Login
              </Anchor>
            </Text>
          </Paper>
        </Group>
      </Container>
    </>
  );
}
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
import { getSession, signIn } from "next-auth/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { UserType } from "../../CustomTypes/UserType";

export default function Login() {
  const router = useRouter();
  const [isMobileView, setIsMobileView] = useState(false);
  const [userType, setUserType] = useState<string | null>(UserType.VOLUNTEER);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignUp = async () => {
    const response = await axios.post("/api/login/signup", {
      fullName,
      email,
      phoneNumber,
      userType,
      password,
    });
    if (response.status !== 200) {
      console.error("Error signing up");
      return;
    }

    await signIn("credentials", {
      username: email,
      password,
      redirect: false,
    });

    router.push("/");
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
         
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
              <TextInput
                label="Email"
                placeholder="you@mantine.dev"
                required
                style={{ width: "88%", borderRadius: 15 }}
         
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextInput
                label="Phone Number"
                placeholder="123-456-7890"
                required
                style={{ width: "88%", borderRadius: 15 }}
         
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
        
                value={password}
                style={{ width: "88%", borderRadius: 15 }}
                onChange={(event) => setPassword(event.target.value)}
              />

              <Select
                mt="sm"
                comboboxProps={{ withinPortal: true }}
                data={["Volunteer", "Organization"]}
                placeholder="Pick one"
                label="Type of Account"
                classNames={classes}
                required
                value={userType}
                onChange={setUserType}
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
            
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Group>

            <Text c="dimmed" size="sm" ta="center" >
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

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (
    session?.user?.email &&
    session?.user?.name &&
    session?.user?.name !== UserType.GUEST
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export { getServerSideProps };

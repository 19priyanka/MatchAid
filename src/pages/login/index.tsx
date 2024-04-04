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
  AppShell,
  Button,
} from "@mantine/core";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import classes from "./Login.module.css";
import logo from "../../../logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ArrowRight } from "tabler-icons-react";
import { UserType } from "../../CustomTypes/UserType";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    router.push("/");
  };

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const handleSignUp = () => {
    router.push("/Signup");
  };

  const handleGuestSignIn = async () => {
    await signIn("credentials", {
      username: UserType.GUEST,
      password: UserType.GUEST,
      redirect: false,
    });

    router.push("/");
  };

  return (
    <>
      <AppShell>
        <AppShell.Header>
          <Group>
            <Image src={logo} alt="logo" width={70} height={70} />
          </Group>
        </AppShell.Header>
      </AppShell>

      <Container
        size={420}
        my={40}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Group
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <Image src={logo} alt="logo" width={150} height={150} />
          <Title
            ta="center"
            className={classes.title}
            style={{ marginBottom: 10, marginTop: "2%" }}
          >
            Match Aid
          </Title>
          <Title
            ta="center"
            className={classes.title}
            style={{ marginBottom: 10 }}
          >
            Welcome back
          </Title>
          <Paper
            withBorder
            shadow="md"
            p={30}
            radius="lg"
            style={{
              width: isMobileView ? "100%" : 660,
              height: isMobileView ? "auto" : 351,
            }}
          >
            <Group style={{ flexDirection: "column", alignItems: "center" }}>
              <TextInput
                label="Email"
                placeholder="you@mantine.dev"
                required
                onChange={(event) => setUsername(event.target.value)}
                style={{ width: "75%", marginTop: 30, borderRadius: 15 }}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                onChange={(event) => setPassword(event.target.value)}
                style={{ width: "75%", borderRadius: 15 }}
              />
            </Group>
            <Group m={15} ml={75}>
              <Checkbox label="Keep me signed in" />
            </Group>
          </Paper>
          <Button
            mt="xl"
            size="md"
            style={{
              backgroundColor: "black",
              borderRadius: 10,
              width: isMobileView ? "100%" : "40%",
              fontSize: isMobileView ? "13px" : "18px",
            }}
            onClick={handleSignIn}
          >
            Log in
          </Button>
          <p className="font-semibold">Or</p>
          <button
            className="group flex w-full md:w-[40%] cursor-pointer items-center justify-center rounded-xl bg-indigo-700 px-6 py-2 text-white transition"
            onClick={handleGuestSignIn}
          >
            <span className="group flex w-full items-center justify-center rounded py-0.5 text-center font-semibold text-[13px] md:text-[18px]">
              Continue as Guest
            </span>
            <ArrowRight className="flex-0 ml-4 h-6 w-6 my-auto" />
          </button>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{" "}
            <Anchor size="sm" component="button" onClick={handleSignUp}>
              Sign Up
            </Anchor>
          </Text>
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

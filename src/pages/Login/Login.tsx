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
  Button
} from "@mantine/core";
import classes from "./Login.module.css";
import logo from '../../../logo.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleSignUp = () => {
    router.push('/Signup/Signup');
  };
  const handleLogin = () => {
    router.push("/homePage");
  };


  return (
    <>
<AppShell>
    <AppShell.Header>
       <Group>
        <Image src={logo} alt="logo"  width={70}
      height={70} />
        </Group>
      </AppShell.Header>
      </AppShell>
      
    <Container
      size={420}
      my={40}
      style={{ display: "flex", justifyContent: "center" }}
    >
      
      <Group style={{ flexDirection: "column", alignItems: "center", marginTop:'10%' }}>
      <Image src={logo} alt="logo"  width={150}  height={150} />
      <Title ta="center" className={classes.title} style={{marginBottom: 10, marginTop:'2%'}}>
          Match Aid
        </Title>
        <Title ta="center" className={classes.title} style={{marginBottom: 10}}>
          Welcome back
        </Title>

        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="lg"
          style={{ 
            width: isMobileView ? '100%' : 660, 
            height: isMobileView ? 'auto' : 351 
          }}
        >
          <Group style={{ flexDirection: "column", alignItems: "center" }}>
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              style={{ width: "75%", marginTop: 30, borderRadius: 15 }}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
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
            width: "30%",
            fontSize: isMobileView ? '13px' : "18px",
          }}
          onClick={handleLogin}
        >
          Log in
        </Button>

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

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
    AppShell
  } from "@mantine/core";
  import classes from "./Signup.module.css";
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
  
    const handleLogin = () => {
      router.push('/Login/Login');
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
       
        <Group style={{ flexDirection: "column", alignItems: "center", marginTop: '20%' }}>
        <Paper
            withBorder
            shadow="md"
            p={30}
            radius="lg"
            style={{ 
                width: isMobileView ? '100%' : 664, 
                height: isMobileView ? '100%' : 981 
              }}
          >
        <Group style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
        <Image src={logo} alt="logo"  width={100}  height={100} />
        <Title ta="center" className={classes.title} style={{marginBottom: 10, marginTop:'2%'}}>
            Create an account
          </Title>
          </Group>
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
          
  
          <Button
            mt="xl"
            size="md"
            style={{
              backgroundColor: "black",
              borderRadius: 10,
              width: "30%",
              fontSize: "18px",
            }}
          >
            Log in
          </Button>
  
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
  
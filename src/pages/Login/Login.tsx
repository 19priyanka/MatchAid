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
} from "@mantine/core";
import classes from "./Login.module.css";

export default function Login() {
  return (
    <Container
      size={420}
      my={40}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Group style={{ flexDirection: "column", alignItems: "center" }}>
        <Title ta="center" className={classes.title}>
          Welcome back
        </Title>

        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="lg"
          style={{ width: 660, height: 351 }}
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
            fontSize: "18px",
          }}
        >
          Log in
        </Button>

        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            Sign Up
          </Anchor>
        </Text>
      </Group>
    </Container>
  );
}

import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(LoginInputType: { username: $username, password: $password }) {
      name {
        first
        last
      }
      uuid
      picture
      role
      isOnline
      gender
      email
      job
      token {
        accessToken
        expiresIn
      }
    }
  }
`;
const LOCAL_ADDRESS = "localhost";
const PORT = "3001";
const client = new ApolloClient({
  link: new HttpLink({ uri: `http://${LOCAL_ADDRESS}:${PORT}/graphql` }),
  cache: new InMemoryCache(),
});

function LoginForm({
  onLogin,
}: {
  onLogin: (uuid: string, token: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await client.query({
        query: LOGIN,
        variables: { username: "username", password: "password" },
      });
      console.log({
        uuid: data.login.uuid,
        token: data.login.token.accessToken,
      });
      if (data.login.uuid && data.login.token.accessToken) {
        onLogin(data.login.uuid, data.login.token.accessToken);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    color: "white",
  },
});

export default LoginForm;

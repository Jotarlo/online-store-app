import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  SafeAreaView,
  Button,
  AsyncStorage,
} from "react-native";

import md5 from "md5";

const bgImg = require("../../../assets/bg/mobile_bg_2.jpg");

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: "",
    password: "",
    url: "http://192.168.1.66:3000/login",
  };

  async onLogin() {
    const u = this.state.username;
    const p = md5(this.state.password);
    fetch(this.state.url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: u,
        password: p,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          Alert.alert("App Message", "Invalid data.");
        } else {
          this.state.username = "";
          this.state.password = "";
          AsyncStorage.setItem("session", JSON.stringify(data));
          this.props.navigation.push("Home");
        }
      })

      .catch((err) => {
        Alert.alert("App Message", "Invalid data.");
      });
    //Alert.alert("Credentials", `username: ${username} - password: ${password}`);
  }

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={bgImg} style={styles.backgroundApp}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleText}>Hi, Welcome To</Text>
          <Text style={styles.titleText}>My App</Text>
          <TextInput
            value={this.state.username}
            keyboardType="default"
            onChangeText={(username) => this.setState({ username })}
            placeholder="username"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={"password"}
            secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this.onLogin.bind(this)}
          >
            <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundApp: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  button: {
    alignItems: "center",
    backgroundColor: "powderblue",
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#fff",
    marginVertical: 10,
  },
});

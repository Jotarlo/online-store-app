import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, Alert, Button, AsyncStorage } from "react-native";

export default class SessionNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoggedIn: false,
    name: "",
  };

  async componentDidMount() {
    let session = await AsyncStorage.getItem("session");

    if (session) {
      this.setState({
        isLoggedIn: true,
        name: JSON.parse(session).data.username,
      });
    }
  }

  signOut = () => {
    Alert.alert("Sign out", "Do you want to sign out?", [
      {
        text: "Yes",
        onPress: () => {
          AsyncStorage.removeItem("session");
          this.setState({
            isLoggedIn: false,
            name: "",
          });
        },
      },
      {
        text: "No",
      },
    ]);
  };

  render() {
    if (this.state.isLoggedIn) {
      return <Text onPress={this.signOut}>In session {this.state.name}</Text>;
    } else {
      return (
        <Button
          title="Go to Login"
          onPress={() => this.props.navigation.push("Login")}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    alignItems: "center",
    marginBottom: 50,
    zIndex: 1,
  },
});

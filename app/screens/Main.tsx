import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";

import SessionNavbar from "./security/SessionNavbar";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      products: [],
      url:
        'http://192.168.1.66:3000/product?filter={"include":[{"relation":"brand"},{"relation":"category"},{"relation":"images"}]}',
    };
  }

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = () => {
    this.setState({ loading: true });
    fetch(this.state.url)
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          products: data,
          loading: false,
        });
      })
      .catch((err) => {
        //console.log(err);
        Alert.alert("Error", "Error loading products.");
      });
  };

  render() {
    const { navigation } = this.props;
    if (this.state.loading) {
      return (
        <View style={styles.dataViewLoading}>
          <Text>Loading products... please wait.</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.productsView}>
          <SessionNavbar navigation={navigation}></SessionNavbar>
          <Text style={{ color: "orange", fontSize: 25 }}>Products List</Text>
          <FlatList
            style={styles.flatList}
            data={this.state.products}
            renderItem={({ item }) => (
              <View style={styles.productViewContent}>
                <TouchableHighlight
                  onPress={() => {
                    Alert.alert("Image Tapped", `Product: ${item.name}`);
                  }}
                >
                  <Image
                    source={{
                      width: 200,
                      height: 150,
                      uri: `http://192.168.1.66:3000/files/2/${item.images[0].id}`,
                    }}
                  />
                </TouchableHighlight>
                <Text style={styles.productName}>{item.name}</Text>
                <Text numberOfLines={1}>{item.description}</Text>
                <Text>Marca: {item.brand.name}</Text>
              </View>
            )}
          ></FlatList>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  productViewContent: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    color: "#ff0000",
  },
  productsView: {
    alignItems: "center",
    alignContent: "center",
    flex: 1,
  },
  dataViewLoading: {
    alignItems: "center",
    alignContent: "center",
    flex: 1,
  },
  button: {
    alignSelf: "center",
    alignContent: "flex-start",
  },
  itemTitle: {
    padding: 10,
    fontSize: 25,
    height: 44,
    fontWeight: "bold",
  },
  flatList: {
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
  img: {
    width: 100,
    height: 100,
  },
  separator: {
    height: 4,
    backgroundColor: "black",
    width: Dimensions.get("window").width / 2,
  },
});

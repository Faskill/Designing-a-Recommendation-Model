import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Picker,
  Button,
  Image,
  FlatList
} from "react-native";
import config from "./config.json";
import axios from "axios";

import { Logs } from 'expo';

Logs.enableExpoCliLogging();

class App extends Component {
  state = {
    selectedUser: 0,
    step: 0,
    recommendations: 1
  };

  goToStep0 = async () => {
    this.setState({ step: 0, recommendations: 1 });
  };

  goToStep1 = async () => {

    await axios.get(config.API_URL).then(res => {
      res.json()})
    //const rec = await axios.get(config.API_URL);
    // const options = {method: "GET"};
    // var rec;

    // fetch(config.API_URL,options)
    // .then(data => {rec = data.recommendations;});

    
    this.setState({ step: 1});
  };


  render() {
    if (!config.API_URL) {
      return (
        <View style={styles.container}>
          <Image
            style={{ resizeMode: "center", width: 450, height: 150 }}
            source={require("./assets/icon-flat.png")}
          />
          <Text style={{ color: "red", margin: 20 }}>
            L'app n'est pas configurée correctement. Mettez à jour le fichier
            config.json comme indiqué dans le README.
          </Text>
        </View>
      );
    }
    if (this.state.step === 1) {
      return (
        <View style={styles.container}>
          <Image
            style={{ resizeMode: "center", width: 450, height: 150 }}
            source={require("./assets/icon-flat.png")}
          />
          <Text style={{ fontSize: 24, padding: 20, textAlign: "center" }}>
            Vos recommendations
          </Text>
          <FlatList
            style={{ maxHeight: 200 }}
            data={this.state.recommendations.map(key => ({
              key: key.toString()
            }))}
            renderItem={({ item }) => <Text>Article n°{item.key}</Text>}
          />
          <Button title="Se déconnecter" onPress={this.goToStep0} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Image
          style={{ resizeMode: "center", width: 450, height: 150 }}
          source={require("./assets/icon-flat.png")}
        />
        <Text style={{ fontSize: 18, padding: 20, textAlign: "center" }}>
          Choisissez votre profil afin de recevoir des recommendations de
          lecture personnalisées : {this.state.recommendations.toString()}
          Quel est mon état : {this.state.step}
        </Text>
        <Picker
          style={{ height: 200, width: "80%", margin: 30 }}
          selectedValue={this.state.selectedUser}
          onValueChange={value => this.setState({ selectedUser: value })}
        >
          {[...Array(10000).keys()].map(e => (
            <Picker.Item key={e} label={`User ${e}`} value={e} />
          ))}
        </Picker>
        <Button title="Se connecter" onPress={this.goToStep1} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;

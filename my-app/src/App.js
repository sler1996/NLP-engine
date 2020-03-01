import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View, TextInput} from "react-native";
import queryString from 'query-string';

const Link = props => (
  <Text
    {...props}
    accessibilityRole="link"
    style={StyleSheet.compose(
      styles.link,
      props.style
    )}
  />
);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {url: '', n: 100, article: ''};
  }

  handleSubmit = event =>{
    event.preventDefault();
    const that = this
    const url = 'http://localhost:5000/article'
    const data = {url:this.state.url, n:this.state.n}
    fetch(url, { 
      method: 'POST', 
      body: queryString.stringify(data),
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'
      }, 
      })
    .then(res => res.json())
            .catch(error => console.error('Error:', error))
    .then(function(response){
      that.setState({article: response.article})
    }); 
  }

  render() {
    return (
      <View style={styles.app}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require('./images/logo.png')}
            style = {{height: 100, width: 300, resizeMode : 'stretch',}}
          />
          <Text style={styles.title}>Word Embedding from any Internet Articles!</Text>
        </View>
        <TextInput
            style={{height: 40}}
            placeholder="Enter URL here! (ie https://en.wikipedia.org/malaysia)"
            onChangeText={(text) => this.setState({url: text})}
            value={this.state.url}
          />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput
            style={{height: 40, width: 500}}
            onChangeText={(text) => this.setState({n: text})}
            placeholder="Number of Top Vocabularies to Extract (ie 100)"
          />
          <Button 
            onPress={this.handleSubmit} 
            title="Submit"
          />
        </View>
        {/* <View>
            <Text>
               {this.state.text}
            </Text>
        </View> */}
        <View>
          <Text style={styles.small_text}> 
            {this.state.article}
          </Text>
        </View>
        <Text style={styles.text}>
          Extracted Article from {" "}
          <Link href={this.state.text}>
            this link
          </Link>{" "}
        </Text>
        <Button onPress={() => {}} title="Example button" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  small_text: {
    lineHeight: "1.5em",
    fontSize: "0.625rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  code: {
    fontFamily: "monospace, monospace"
  }
});

export default App;

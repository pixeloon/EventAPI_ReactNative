// https://www.eventbriteapi.com/v3/users/me/?token=SESXYS4X3FJ5LHZRWGKQ

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';

const API_KEY = 'Bearer AAMCLULR3SCYDKR5HLNF';
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const ds =  new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2});

module.exports = React.createClass({
  getInitialState(){
    return ({
      dataSource: ds.cloneWithRows([
        {
          name: {
            text: 'Event 1'
          },
          url: 'www.eventone.com'
        }
      ]),
      eventType: '',
      city: ''
    })
  },
  componentDidMount() {
    this.searchEvents('hackathon', 'San Francisco');
  },

  searchEvents(category,city) {
    const FETCH_URL = ROOT_URL + '?q=' + category + '&venue.city=' + city + '/'

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Authorization': API_KEY
      }
    })
    .then((response) => response.json())
    .then((responseJSON) => {;
      this.setState({dataSource: ds.cloneWithRows(responseJSON.events)})
    });

  },
  renderRow(rowData){
    const defaultImg  ='http://cliparts.co/cliparts/8cG/6bK/8cG6bKR6i.jpg';
    let img = rowData.logo != null ? rowData.logo.url : defaultImg;
    return (
      <View style={styles.row}>
      <Image 
      style={styles.rowLogo}
      source={{uri: img}}/>
      <View style= {styles.rowDetails}>
        
        <Text>
          {rowData.name.text.length > 30 ?
            rowData.name.text.substring(0,30) + '...' :
            rowData.name.text
          }
        </Text>
      </View>
        <TouchableOpacity
        onPress={() => this.detail(rowData)}
        >
          <Text style={styles.link}>
            more data
          </Text>
          
        </TouchableOpacity>
      </View>
      )

  },

  detail(rowData) {
    this.props.navigator.push({
    name: 'eventDetail',
    title: rowData.name.text,
    description: rowData.description.text,
    url: rowData.url,
    img:rowData.logo.url
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Event Expert
        </Text>
      
        <View style={styles.form}>
          <TextInput
          style={styles.input}
          placeholder='kind of event ...'
          onChangeText={(text) => this.setState({eventType: text})}
          />
          <TextInput
          style={styles.input}
          placeholder='city...'
          onChangeText={(text) => this.setState({city: text})}
          />
          <TouchableOpacity
          onPress={() => this.searchEvents(this.state.eventType, this.state.city)}
          style={styles.buttonContainer}
          >
            <Text style={styles.button}>
              Search
            </Text>
          </TouchableOpacity>
            
        </View>
      <ListView 
      style = {styles.list}
      dataSource={this.state.dataSource}
      renderRow={(rowData) => this.renderRow(rowData)}/>

      </View>
      )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    flex: 1,
    marginTop: 40,
    textAlign: 'center',
    fontSize: 20
  },
  form: {
    flex: 4
  },
  list: {
    flex: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  rowLogo: {
    flex: 1,
    width: 50,
    height: 50,
    borderColor: '#000',
    borderWidth: 1

  },
  rowDetails: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    textAlign: 'center'
  },
    buttonContainer: {
    flex: 1,
    padding: 5
  },
  button: {
    flex: 1,
    borderColor: '#0000FF',
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    color: '#0000FF'
  },
  link: {
    color: '#0000FF'
  }
})
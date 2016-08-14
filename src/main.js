// https://www.eventbriteapi.com/v3/users/me/?token=SESXYS4X3FJ5LHZRWGKQ

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListView
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
      ])
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
    });

  },
  renderRow(rowData){
    return (
      <View>
        <Text>
          {rowData.name.text}
        </Text>
        <Text>
          {rowData.url}
        </Text>
      </View>
      )

  },

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>
        Event Expert
      </Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    marginTop: 40
  },
  list: {
    flex: 1
  }
})
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert, Image} from 'react-native';



export default function App() {

const [keyword, setKeyword] = useState('');
const [repositories, setRepositories] = useState([]);

const getRepositories = () => {
  fetch(`www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
  .then(response => response.json())
  .then(responseData => {
    setRepositories(responseData.items)})
  .catch(error => {
    Alert.alert('Error', error);
  });

}

const listSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%"
      }}
    />
  );
};  
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
          <View>
            <Text
              style={{fontSize: 18, fontWeight: "bold"}}>
                {item.strMeal}
              </Text>
            <Image 
              style={{width: 100}}
              source={{uri: 'item.strMealThumb'}}/>  
          </View>} 
      data={repositories} 
      ItemSeparatorComponent={listSeparator} />
      
      <TextInput
      style={{fontSize:18, width:200}}
      placeholder='keyword'
      onChangeText={text => setKeyword(text)}
      />
      <Button title="Find" onPress={getRepositories}/>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

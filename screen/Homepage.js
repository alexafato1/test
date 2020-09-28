import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Dimensions,TextInput, Alert,Button} from 'react-native';
import { List, ListItem } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeModules } from 'react-native'
import { auth,db } from './firebase';
import firebase from "firebase";
import Icon from 'react-native-vector-icons/FontAwesome';





const {width} = Dimensions.get("screen");



function Homepage({ navigation }) {


  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const pressHandler = () => {
    console.log(title,text)
   
    setText('')
    setTitle('')
  }

  

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      posts: doc.data()
     
  })));
  
    console.log(posts.map(({post}) => {post.text}))})
}, [ ]);
    return (
        
        <View style={styles.container}>
     <Image
      
       style={{width: width/3, height : width/3 }}
       source={require('../img/logo.png')}
       onPress={() => Alert.alert('Simple Button pressed')}
    /> 
   
        
       
          <View>
        <TextInput
      style={{ padding:10,  borderColor: 'gray', borderBottomWidth: 1 }}  
      onChangeText={setTitle}
      placeholder='title'
      value={title}
    />
     <TextInput
      style={{ padding:10,  borderColor: 'gray',  borderBottomWidth: 1 }}
      placeholder='text'
      onChangeText={setText}
      value={text} 
    />
      <Button
       title="ADD" 
       onPress={pressHandler}
      />

       </View>
          <List>
          {posts.map(( post , i)=> (
               <ListItem 
               key={i}
               
               onPress={() => navigation.navigate('Details', {
                title: post.posts.title,
                text: post.posts.text,
              })}>
               <Text>{post.posts.title}</Text>
              </ListItem>
           ))}
           </List>
       
     
     
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    button: {
      color: 'blue',
      fontWeight: '700',
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: "solid",
      borderWidth: 1,
      borderColor:'purple',
      borderRadius: 10
       
    },
  });

export default Homepage

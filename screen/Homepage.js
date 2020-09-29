import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, Dimensions,TextInput, Alert, ScrollView} from 'react-native';
import { ListItem } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { auth,db } from './firebase';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';


const {width} = Dimensions.get("screen");



function Homepage({ navigation }) {
  

  
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      let { statusReminders } = await Permissions.askAsync(Permissions.REMINDERS)
      let { statusCalendar } = await Permissions.askAsync(Permissions.CALENDAR)   
      if (statusReminders === 'granted' && statusCalendar === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
      else{
        console.log('РАЗРЕШЕНИЯ НЕТ')
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  async function getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
    return defaultCalendars[0].source;
  }

  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };



  const AddReminder = () => {
    if(image===null){
      image==='https://cdn.pixabay.com/photo/2017/05/13/23/05/img-src-x-2310895_960_720.png'
    }
    
    if(title.trim()){
    db.collection('posts').add({
      title:title,
      text: text,
      image: image
      
    })
    setText('')
    setTitle('')
    setImage(null)
  } else {
    Alert.alert('текс не может быть пустым')
  }
  }

  const DelReminder = (id) => {
    
    db.collection('posts').doc(id).delete()
       
    }
  
    useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      posts: doc.data()
      
     
  })));
  
    })
}, [ ]);
    return (
        
        <View style={styles.container}>
              <View
        style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
       </View>
  
          <View  style={{flexDirection: "row" , justifyContent: 'space-around'}}>
       <Button type='clear' title="" onPress={createCalendar}
               icon={
                  <Icon
                    name="clock-o"
                    size={width/3}
                    color="black"
                  />
                }></Button>
      
    
     <Button type='clear' title="" onPress={pickImage}  
               icon={
                  <Icon
                    name="photo"
                    size={width/3}
                    color="black"
                  />
                }></Button>

     </View>

     <View>        
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
       onPress={AddReminder}
      />

       </View>

          <ScrollView>
          {posts.map(( post )=> (
               <ListItem  style={{ justifyContent: "space-between" }}
                key={post.id}
                onPress={() => navigation.navigate('Details', {
                title: post.posts.title,
                text: post.posts.text,
                image: post.posts.image
              })}>
               <Text >{post.posts.title} </Text>
               <Button type="clear" title='' onPress={DelReminder.bind(null,post.id)}
                icon={
                  <Icon
                    name="times"
                    size={20}
                    color="black"
                  />
                }></Button>
              </ListItem>
           ))}
        
           
           </ScrollView>
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

import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Right, Left, Body } from 'native-base';



function DetailsScreen({ route, navigation }) {
   const {title} = route.params;
   const {text} = route.params;
   const {image} = route.params;

    return (
    
      <Container>
      <Header />
      <Content>
        <Card style={{flex: 0}}>
          <CardItem>
           
              <Thumbnail source={require('../img/logo.png')} />
              <Body>
                <Text>{title}</Text>
                
                <Text>
                {text}
              </Text>
              <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
              </Body>
          
          
          </CardItem>
          
           
          
      
          <CardItem>
            <Right>
             
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
    )
}

export default DetailsScreen

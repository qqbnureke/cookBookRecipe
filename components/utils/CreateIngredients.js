import React from 'react';
import {View, Text,StyleSheet,TouchableOpacity,
   FlatList, KeyboardAvoidingView
 } from 'react-native';
import {TextInput,} from 'react-native-paper';
import {ListItem} from 'react-native-elements'

export default class CreateIngredients extends React.Component {
  constructor(){
    super()
    this.state = {
      title: '',
      ingredients: [],
    }
  }

  handleButton=()=>{
    this.state.title &&(
    this.setState(prevState=>({
      ingredients: [...prevState.ingredients, this.state.title],
      title: ''
    })))
    this.props.onAdded(this.state.ingredients);
  }

  render(){
    return (
      <View>
          <View style={styles.container}>
          <TextInput
            style={styles.textInputStyle}
            label="ingredient"
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
            <TouchableOpacity
                onPress={this.handleButton}
                style={styles.btnAdd}
            >
              <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
          </View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data = {this.state.ingredients}
            renderItem = {({item})=>(
              <Text style={styles.items}>{'\u2022'} {item}</Text>
            )}
          />
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  btnAdd:{
    marginTop: 20,
    backgroundColor: '#3C54B8',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addText:{
    fontSize: 18,
    color: 'white'
  },
  textInputStyle:{
    width: 270,
    marginLeft: 8,
    marginRight: 8,
  },
  items:{
    marginLeft:8,
    fontSize: 15,
  },
})

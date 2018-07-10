import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';
import  CreateRecipeForm  from './components/CreateRecipeForm';
import RecipesDetails from './components/RecipesDetails';
import RecipesList from './components/RecipesList';
import LoginPage from './components/LoginPage';
import Register from './components/Register';

const AppStackNavigator = createStackNavigator({

  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      header: null
    }
  },
  RegisterPage: {
    screen: Register,
    navigationOptions: {
      title: 'Register', 
    }
  },
  RecipeList: {
    screen: RecipesList,
  },
  NewRecipeForm: {
     screen: CreateRecipeForm,
   },
  Details: {
    screen: RecipesDetails,
  },

});

const client = new ApolloClient({
  //uri: "https://api.graph.cool/file/v1/cjj6obv0i01j10166a63u7okj"
  uri: "https://api.graph.cool/simple/v1/cjj6obv0i01j10166a63u7okj"
});

export default class App extends React.Component {
  render() {
    return  (
      <ApolloProvider client={client}>
        <AppStackNavigator initialRouteName='LoginPage' />
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight
  },
});

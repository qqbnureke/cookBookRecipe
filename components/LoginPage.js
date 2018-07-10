import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Constants } from 'expo';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    const isEmpty = this.state.email && this.state.password;
    return (
      <Mutation mutation={LoginMutation}>
        {(signinUser, { data, loading, error }) => (
          <View style={styles.container}>
            <TextInput
              style={styles.inputContainerStyle}
              label="EMAIL"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
            <TextInput
              secureTextEntry
              label="PASSWORD"
              style={styles.inputContainerStyle}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
            <TouchableOpacity
              disabled={loading}
              style={styles.btnSave}
              onPress={()=>{
                isEmpty
                  ? signinUser({
                      variables: {
                        email: this.state.email,
                        password: this.state.password,
                      },
                    })
                      .then(json => {
                        this.setState({
                          email: '',
                          password: '',
                        })
                        this.props.navigation.navigate('RecipeList');

                      })
                      .catch((status, err) => {
                        alert('no such user');
                      })
                  : alert('fill all fields');
              }}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.addText}>Login</Text>
              )}
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => {
                this.props.navigation.navigate('RegisterPage');
              }}>
              {' '}
              Register{' '}
            </Text>
          </View>
        )}
      </Mutation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
  },
  btnSave: {
    marginTop: 20,
    backgroundColor: '#3C54B8',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainerStyle: {
    marginLeft: 8,
    marginRight: 8,
    width: 200,
  },
  addText: {
    fontSize: 18,
    color: 'white',
  },
  registerTextStyle: {
    marginTop: 10,
    marginLeft: 50,
    color: '#5F5FFF',
    fontSize: 18,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});

const LoginMutation = gql`
  mutation signin($email: String!, $password: String!){
    signinUser(email:{email:$email,password:$password}){
      token
      user{
        id
        email
      }
    }
  }
`;

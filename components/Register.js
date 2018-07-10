import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Constants } from 'expo';
import { TextInput } from 'react-native-paper';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

export default class Register extends React.Component {
  state = {
    email: '',
    password: '',
    repeatedPassword: '',
  };
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'Register';
    let headerTitleStyle = styles.headerTitleColor;
    let headerStyle = styles.headerStylee;
    return { headerTitle, headerTitleStyle, headerStyle };
  };



  render() {
    const isEmpty =
      this.state.email && this.state.password && this.state.repeatedPassword;
    const isMatchPassword = this.state.password === this.state.repeatedPassword;

    return (
      <View style={styles.container}>
        <TextInput
          label="EMAIL"
          style={styles.inputContainerStyle}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          secureTextEntry
          label="PASSWORD"
          value={this.state.password}
          style={styles.inputContainerStyle}
          onChangeText={password => this.setState({ password })}
        />
        <TextInput
          secureTextEntry
          label="REPEAT PASSWORD"
          style={styles.inputContainerStyle}
          value={this.state.repeatedPassword}
          onChangeText={repeatedPassword => this.setState({ repeatedPassword })}
        />

        <Mutation mutation={CREATE_USER}>
          {(createRecipe, { data, loading, error }) => (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                disabled={loading}
                onPress={() => {
                  isMatchPassword
                    ? isEmpty
                      ? createRecipe({
                          variables: {
                            authProvider: {
                              email: {
                                email: this.state.email,
                                password: this.state.password,
                              },
                            },
                          },
                        }) && this.props.navigation.goBack()
                      : alert('Fill all fields')
                    : alert('passwords does not much');
                }}
                style={styles.btnSave}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.addText}>Register</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Mutation>
      </View>
    );
  }
}

const CREATE_USER = gql`
  mutation createUser($authProvider: AuthProviderSignupData!) {
    createUser(authProvider: $authProvider) {
      id
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStylee: {
    backgroundColor: 'rgb(226,81,65)',
    borderBottomColor: 'white',
  },
  headerTitleColor: {
    color: 'white',
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Seperator from './utils/Seperator';

const GET_ALL_RECIPES = gql`
  query GetAllRecipes {
    allRecipes {
      id
      title
      imageUri
      ingredients
      description
      instructions
    }
  }
`;

export default class RecipesList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'Main';
    let headerTitleStyle = styles.headerTitleColor;
    let headerStyle = styles.headerStylee;
    let headerLeft = null;
    let headerRight = (
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require('./../assets/star.png')}
            style={styles.headerImageStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            params.onSave();
          }}>
          <Image
            source={require('./../assets/plus-xxl.png')}
            style={styles.headerImageStylee}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            params.onSignout();
          }}>
          <Image
            source={require('./../assets/logout-xxl.png')}
            style={styles.headerImageStylee}
          />
        </TouchableOpacity>
      </View>
    );
    return {
      headerTitle,
      headerTitleStyle,
      headerStyle,
      headerRight,
      headerLeft,
    };
  };

  _onSave = () => {
    this.props.navigation.navigate('NewRecipeForm');
  };

  _onSignout = () => {
    this.props.navigation.navigate('LoginPage');
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onSave: this._onSave.bind(this),
      onSignout: this._onSignout.bind(this),
    });
  }

  renderItem = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Details', { details: item });
        }}>
        <View style={styles.containerText}>
          <Text style={styles.textConst}>{item.title} </Text>
        </View>
        <Text style={styles.textDescription}>{item.description} </Text>
        <Seperator />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <ScrollView>
        <Query query={GET_ALL_RECIPES}>
          {({ loading, data, error, refetch }) =>
            loading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                refreshing={data.networkStatus === 4}
                keyExtractor={item => item.id}
                extraData={this.state}
                data={data ? data.allRecipes : []}
                renderItem={this.renderItem}
                onRefresh={() => refetch()}
              />
            )
          }
        </Query>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    marginBottom: 4,
    marginRight: 5,
    marginLeft: 5,
    borderWidth: 1,
  },
  containerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCreateNew: {
    fontSize: 15,
    color: 'white',
  },
  btnContainer: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'darkviolet',
  },
  textAdd: {
    fontSize: 40,
    color: 'white',
  },
  textConst: {
    fontSize: 20,
    margin: 2,
    fontWeight: 'bold',
  },
  textDescription: {
    fontSize: 18,
    marginLeft: 4,
  },
  headerStyle: {
    margin: 5,
    flexDirection: 'row',
  },
  headerImageStyle: {
    width: 30,
    height: 30,
    margin: 15,
  },
  headerImageStylee: {
    width: 25,
    height: 25,
    margin: 20,
  },
  headerButton: {
    backgroundColor: 'rgb(226,81,65)',
  },
  headerStylee: {
    backgroundColor: 'rgb(226,81,65)',
    borderBottomColor: 'white',
  },
  headerTitleColor: {
    color: 'white',
  },
});

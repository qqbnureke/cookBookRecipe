import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Share } from 'react-native';

export default class RecipeDetails extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'Recipe Detail';
    let headerTitleStyle = styles.headerTitleColor;
    let headerTintColor = 'white';
    let headerStyle = styles.headerStyle;
    let headerRight = (
      <View style={styles.headerStylee}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            params.onShare();
          }}>
          <Image
            source={require('./../assets/sharethis-xxl.png')}
            style={styles.headerImageStylee}
          />
        </TouchableOpacity>
      </View>
    );
    return {
      headerTitle,
      headerTitleStyle,
      headerStyle,
      headerTintColor,
      headerRight,
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({ onShare: this._onShare.bind(this) });
  }

  _onShare() {
    const details = this.props.navigation.getParam('details');
    Share.share({
      message:
        details.title +
        '\n' +
        details.description +
        '\nIngridients:\n' +
        details.ingredients +
        '\nInstructions:\n' +
        details.instructions +
        '\n',
    });
  }

  render() {
    const details = this.props.navigation.getParam('details');
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textVar}>
              {details.title} {'\n'}
            </Text>
          </View>

          <Text style={styles.textConst}>
            {details.description} {'\n'}
          </Text>

          <Image source={{ uri: details.imageUri }} style={styles.imageStyle} />

          <Text style={styles.textList}>Ingredients:</Text>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={details.ingredients}
            renderItem={({ item }) => (
              <Text style={styles.textList}>
                {'\u2022'} {item}
              </Text>
            )}
          />

          <Text style={styles.textList}>{'\n'}Instructions:</Text>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={details.instructions}
            renderItem={({ item, index }) => (
              <Text style={styles.textList}>
                {index + 1}. {item}
              </Text>
            )}
          />

          <View style={styles.textContainer}>
            <Text style={styles.lastText}>Bon Appetit!</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    flexDirection: 'column',
  },
  textConst: {
    fontSize: 15,
    color: '#5F5F3D',
  },
  textVar: {
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textList: {
    fontSize: 18,
  },
  lastText: {
    fontSize: 18,
  },
  headerTitleColor: {
    color: 'white',
  },
  headerStyle: {
    backgroundColor: 'rgb(226,81,65)',
    borderBottomColor: 'white',
  },
  headerStylee: {
    marginRight: 5,
    flexDirection: 'row',
  },
  headerImageStylee: {
    width: 25,
    height: 25,
    margin: 20,
  },
  headerButton: {
    backgroundColor: 'rgb(226,81,65)',
  },
  imageStyle: {
    width: 300,
    height: 200,
  },
});

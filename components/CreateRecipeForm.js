import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ImagePicker } from 'expo';
import Toast, { DURATION } from 'react-native-easy-toast';
import CreateIngredients from './utils/CreateIngredients';
import CreateInstructions from './utils/CreateInstructions';

const FILE_UPLOAD_URL =
  'https://api.graph.cool/file/v1/cjj6obv0i01j10166a63u7okj';

export default class CreateRecipeForm extends React.Component {
  state = {
    title: '',
    description: '',
    ingredients: [],
    instructions: [],
    pictureURL: '',
    imageUri: '',
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'New Recipe';
    let headerTitleStyle = styles.headerTitleColor;
    headerTintColor = 'white';
    let headerStyle = styles.headerStyle;
    return { headerTitle, headerTitleStyle, headerStyle, headerTintColor };
  };

  handleButtonIngredients = items => {
    this.setState({ ingredients: items });
  };
  handleButtonInstructions = items => {
    this.setState({ instructions: items });
  };

  onChangePicture = value => {
    this.setState(prevState => ({
      pictureURL: value,
    }));
  };

  handleButtonUploadImage = async () => {
    const photo = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!photo.cancelled) {
      this.onChangePicture(photo.uri);
      console.disableYellowBox = true;
    }
    let formData = new FormData();
    formData.append('data', {
      uri: photo.uri,
      name: 'image.png',
      type: 'multipart/form-data',
    });

    try {
      const res = await fetch(FILE_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });
      const resJson = await res.json();
      this.onChangePicture(resJson.url);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  render() {
    const isEmpty =
      this.state.title &&
      this.state.description &&
      this.state.ingredients.length &&
      this.state.instructions.length &&
      this.state.pictureURL;
    return (
      <ScrollView>
        <TextInput
          style={styles.inputContainerStyle}
          label="Title"
          value={this.state.title}
          onChangeText={title => this.setState({ title })}
        />
        <TextInput
          style={styles.inputContainerStyle}
          label="Description"
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
        />

        <CreateIngredients onAdded={this.handleButtonIngredients} />
        <CreateInstructions onAdded={this.handleButtonInstructions} />

        <View style={styles.container}>
          <Button
            title="Pick an image from camera roll"
            onPress={this.handleButtonUploadImage}
          />
          {this.state.pictureURL ? (
            <Image
              source={{ uri: this.state.pictureURL }}
              style={styles.imageStyle}
            />
          ) : null}
        </View>

        <Mutation mutation={CREATE_RECIPE}>
          {(createRecipe, { data, loading, error }) => (
            <View style={styles.container}>
              <TouchableOpacity
                disabled={loading}
                onPress={() => {
                  isEmpty
                    ? createRecipe({
                        variables: {
                          description: this.state.description,
                          imageUri: this.state.pictureURL,
                          ingredients: this.state.ingredients,
                          instructions: this.state.instructions,
                          title: this.state.title,
                        },
                      }) && this.props.navigation.goBack()
                    : alert('Fill all fields');
                }}
                style={styles.btnSave}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.addText}>Create</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Mutation>
      </ScrollView>
    );
  }
}

const CREATE_RECIPE = gql`
  mutation addRecipe(
    $description: String!,
    $imageUri: String!,
    $ingredients: [String!]!,
    $instructions: [String!]!,
    $title: String!
  ){
    createRecipe(
      description: $description,
      imageUri: $imageUri,
    	ingredients: $ingredients,
      instructions: $instructions,
      title: $title,
    ){
      description
      imageUri
      ingredients
      instructions
      title
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textStyle: {
    fontSize: 25,
    fontStyle: 'italic',
  },
  inputContainerStyle: {
    marginLeft: 8,
    marginRight: 8,
  },
  btnAdd: {
    backgroundColor: '#3C54B8',
    alignItems: 'center',
    width: 330,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
  },
  inContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btnSave: {
    marginTop: 20,
    backgroundColor: '#3C54B8',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    fontSize: 18,
    color: 'white',
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
/*
<View style={styles.container}>
<Button title="Pick an image from camera roll" onPress={this.pickImage} />
{this.state.pictureURL ? (
  <Image source={{ uri: this.state.pictureURL }} style={{ width: 300, height: 200 }} />
) : null}
</View>
*/

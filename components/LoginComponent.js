import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button  } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { baseUrl } from '../shared/baseUrl';
import { Asset } from 'expo-asset';
import * as ImageManipulator from "expo-image-manipulator";

class LoginTab extends Component {

	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			remember: false
		}
	}

	componentDidMount() {
		SecureStore.getItemAsync('userinfo')
			.then((userdata) => {
				let userinfo = JSON.parse(userdata);
				if (userinfo) {
					this.setState({
						username: userinfo.username,
						password: userinfo.password,
						remember: true
					})
				}
			})
	}

	static navigationOptions = {
		title: 'Login'
	};

	handleLogin() {
		console.log(JSON.stringify(this.state));
		if (this.state.remember) {
			SecureStore.setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password }))
			.catch((error) => console.log('could not save userinfo', error));
		}
		else {
			SecureStore.deleteItemAsync('userinfo')
			.catch((error) => console.log('could not delete the userinfo'));
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Input placeholder='username' 
						leftIcon={ <Icon style={{marginRight: 7}} type= 'font-awesome' name= 'user-o' color= 'black' size={20} /> }
						onChangeText={(username) => this.setState({username})} value={this.state.username}
						containerStyle={styles.formInput} />
				<Input placeholder='password' 
						leftIcon={ <Icon style={{marginRight: 5}} type= 'font-awesome' name= 'key' color= 'black' size={20} /> } 
						onChangeText={(password) => this.setState({password})} value={this.state.password}
						containerStyle={styles.formInput} />
				<CheckBox title='Remember Me' checked={this.state.remember} center
						onPress={() => this.setState({remember: !this.state.remember})} 
						containerStyle={styles.formCheckBox} />
				<View style={styles.formButton}>
					<Button onPress={() => this.handleLogin()} title='  Login' buttonStyle={{backgroundcolor: '#512DA8'}} 
							icon={<Icon name='sign-in' size={22} type='font-awesome' color='white' />} />
				</View>
				<View style={styles.formButton}>
					<Button onPress={() => this.props.navigation.navigate('Register')} 
							type='clear' title=' Register'  
							icon={<Icon name='user-plus' size={20} type='font-awesome' color='#1E88E5' />} />
				</View>
			</View>
		);
	}
}

class RegisterTab extends Component {

	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			firstname: '',
			lastname: '',
			email: '',
			remember: false,
			imageUrl: baseUrl + 'images/logo.png',
			uploadImage: 'Upload Image:'
		}
	}

	static navigationOptions = {
		title: 'Register'
	};



	getImageFromCamera = async () => {
		console.log('pressed on camera');
		const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
		const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
			let capturedImage = await ImagePicker.launchCameraAsync({
				allowsEditing: true,
				aspect: [4,3]
			});	

			if (!capturedImage.cancelled) {
				this.processImage(capturedImage.uri);
			}
		}
	}

	getImageFromGallery = async () => {
		console.log('pressed on camera');
		const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
		const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
			let SelectedImage = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [4,3]
			});	

			if (!SelectedImage.cancelled) {
				this.processImage(SelectedImage.uri);
			}
		}
	}

	processImage = async(imageUri) => {
		let processedImage = await ImageManipulator.manipulateAsync (
			imageUri, 
			[
				{resize: {width: 400}}
			],
			{format: ImageManipulator.SaveFormat.PNG}
		);
		this.setState({imageUrl: processedImage.uri});
		this.setState({uploadImage: 'Change Image?'});
	} 

	handleRegister() {
		console.log(JSON.stringify(this.state));
		if (this.state.remember) {
			SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
			.catch((error) => console.log('could not save userinfo', error));
		}
		else {
			SecureStore.deleteItemAsync('userinfo')
			.catch((error) => console.log('could not delete the userinfo'));
		}
	}

	render() {
		return (
			<ScrollView>

			<View style={styles.imageContainer}> 
				<Image source={{ uri: this.state.imageUrl}} LoadingIndicatorSource={require('./images/logo.png')} 
						style={styles.image} />
				<View>
					<Text style={{marginLeft: 10}}> {this.state.uploadImage} </Text>
					<View style={{margin: 10, flex: 1, flexDirection: 'row'}}>
						<Button title='Open Camera' onPress={this.getImageFromCamera} />
						<View style={{marginLeft: 10}}>
							<Button title='Open Gallery' onPress={this.getImageFromGallery} /> 
						</View>
					</View>
				</View>
			</View>

			<View style={styles.container}>
				<Input placeholder='username' 
						leftIcon={ <Icon style={{marginRight: 7}} type= 'font-awesome' name= 'user-o' color= 'black' size={20} /> }
						onChangeText={(username) => this.setState({username})} value={this.state.username}
						containerStyle={styles.formInput} />
				<Input placeholder='password' 
						leftIcon={ <Icon style={{marginRight: 5}} type= 'font-awesome' name= 'key' color= 'black' size={20} /> } 
						onChangeText={(password) => this.setState({password})} value={this.state.password}
						containerStyle={styles.formInput} />
				<Input placeholder='firstname' 
						leftIcon={ <Icon style={{marginRight: 5}} type= 'font-awesome' name= 'user-o' color= 'black' size={20} /> } 
						onChangeText={(firstname) => this.setState({firstname})} value={this.state.firstname}
						containerStyle={styles.formInput} />
				<Input placeholder='lastname' 
						leftIcon={ <Icon style={{marginRight: 5}} type= 'font-awesome' name= 'user-o' color= 'black' size={20} /> } 
						onChangeText={(lastname) => this.setState({lastname})} value={this.state.lastname}
						containerStyle={styles.formInput} />
				<Input placeholder='email' 
						leftIcon={ <Icon style={{marginRight: 5}} type= 'font-awesome' name= 'envelope-o' color= 'black' size={20} /> } 
						onChangeText={(email) => this.setState({email})} value={this.state.email}
						containerStyle={styles.formInput} />		
				<CheckBox title='Remember Me' checked={this.state.remember} center
						onPress={() => this.setState({remember: !this.state.remember})} 
						containerStyle={styles.formCheckBox} />
				<View style={styles.formButton}>
					<Button onPress={() => this.handleRegister()} title=' Register' buttonStyle={{backgroundcolor: '#512DA8'}} 
							icon={<Icon name='user-plus' size={20} type='font-awesome' color='white' />} />
				</View>
			</View>
			</ScrollView>
		);
	}

}

const tabNavigator = createBottomTabNavigator();

function Login () {
	return(
        <NavigationContainer independent={true}>
            <tabNavigator.Navigator initialRouteName='Login'
            		tabBarOptions={{
                    activeBackgroundColor: '#9575CD',
                    inactiveBackgroundColor: '#D1C4E9',
                    activeTintColor: 'white',
                    inactiveTintColor: 'gray'}}>

                <tabNavigator.Screen name='Login' component={LoginTab}
	                options={{
	                    title: 'Login',
	                    tabBarIcon:({ tintColor }) => (
	                        <Icon name='sign-in' type='font-awesome'            
	                        	size={22} iconStyle={{ color: tintColor }} />
	                    )
	                }} />

                <tabNavigator.Screen name='Register' component={RegisterTab}
                    options={{
                        title: 'Register',
                        tabBarIcon:({ tintColor }) => (
                            <Icon name='user-plus' type='font-awesome'            
                              size={22} iconStyle={{ color: tintColor }} />
                        )
                    }}/>
            </tabNavigator.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		margin: 20
	},
	imageContainer: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 20,
		marginLeft: 20
	},
	image: {
		margin: 10,
		width: 80,
		height: 60
	},
	formInput: {
		margin: 0
	},
	formCheckBox: {
		marginBottom: 10,
		backgroundColor: null
	},
	formButton: {
		margin: 10
	}
})

export default Login; 
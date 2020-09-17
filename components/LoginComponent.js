import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {

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
				<Input placeholder='Password' 
						leftIcon={ <Icon style={{marginRight: 5}} type= 'font-awesome' name= 'key' color= 'black' size={20} /> } 
						onChangeText={(password) => this.setState({password})} value={this.state.password}
						containerStyle={styles.formInput} />
				<CheckBox title='Remember Me' checked={this.state.remember} center
						onPress={() => this.setState({remember: !this.state.remember})} 
						containerStyle={styles.formCheckBox} />
				<View style={styles.formButton}>
					<Button onPress={() => this.handleLogin()} title='Login' color='#512DA8' />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		margin: 20
	},
	formInput: {
		margin: 0
	},
	formCheckBox: {
		marginBottom: 10,
		backgroundColor: null
	},
	formButton: {
		margin: 20
	}
})

export default Login; 
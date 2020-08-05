import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import ContactUs from './ContactComponent';
import AboutUs from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Constants from 'expo-constants';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';

const MenuNavigator = createAppContainer(createStackNavigator({
	
	Menu: { screen: Menu },
	Dishdetail: { screen: Dishdetail }
}, {
	initialRouteName: 'Menu', 
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#511DA8'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#fff'
		}
	}
}))

const HomeNavigator = createAppContainer(createStackNavigator({
	
	Home: { screen: Home },
}, {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#512DA8'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#fff'
		}
	}
}))

const ContactUsNavigator = createAppContainer(createStackNavigator({
	
	ContactUs: { screen: ContactUs },
}, {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#512DA8'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#512DA8'
		}
	}
}))

const AboutUsNavigator = createAppContainer(createStackNavigator({
	
	AboutUs: { screen: AboutUs },
}, {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#512DA8'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#512DA8'
		}
	}
}))

const MainNavigator = createAppContainer(createDrawerNavigator({

	Home: {
		screen: HomeNavigator,
		navigationOptions: {
			title: 'Home',
			drawerLabel: 'Home'
		}
	},
	AboutUs: {
		screen: AboutUsNavigator,
		navigationOptions: {
			title: 'About Us',
			drawerLabel: 'About Us'
		}
	},
	Menu: {
		screen: MenuNavigator,
		navigationOptions: {
			title: 'Menu',
			drawerLabel: 'Menu'
		}
	},
	ContactUs: {
		screen: ContactUsNavigator,
		navigationOptions: {
			title: 'Contact Us',
			drawerLabel: 'Contact Us'
		}
	}
}, {
	drawerBackgroundColor: '#D1C4E9'
}))

class Main extends Component {

	render() {
		return(
			<View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}> 
				<MainNavigator />
			</View>
		);
	}
}

export default Main;
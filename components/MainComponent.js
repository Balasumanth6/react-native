import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
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

const MainNavigator = createAppContainer(createDrawerNavigator({

	Home: {
		screen: HomeNavigator,
		navigationOptions: {
			title: 'Home',
			drawerLabel: 'Home'
		}
	},
	Menu: {
		screen: MenuNavigator,
		navigationOptions: {
			title: 'Menu',
			drawerLabel: 'Menu'
		}
	}
}, {
	drawerBackgroundColor: '#fff'
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
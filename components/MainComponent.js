import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import ContactUs from './ContactComponent';
import AboutUs from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform, Image, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Constants from 'expo-constants';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';

const mapDispatchToProps = dispatch => ({

	fetchDishes: () => dispatch(fetchDishes()),
	fetchComments: () => dispatch(fetchComments()),
	fetchPromos: () => dispatch(fetchPromos()),
	fetchLeaders: () => dispatch(fetchLeaders())
});

const MenuNavigator = createAppContainer(createStackNavigator({
	
	Menu: { screen: Menu, 
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
		}) },
	Dishdetail: { screen: Dishdetail }
}, {
	initialRouteName: 'Menu', 
	defaultNavigationOptions: ({navigation}) => ({
		headerStyle: {
			backgroundColor: '#511DA8'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#fff'
		}
	})
}))

const HomeNavigator = createAppContainer(createStackNavigator({
	
	Home: { screen: Home },
}, {
	defaultNavigationOptions: ({ navigation }) => ({
		headerStyle: {
			backgroundColor: '#512DA8'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#fff'
		},
		headerLeft: () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
	}) 
}))

const ContactUsNavigator = createAppContainer(createStackNavigator({
	
	ContactUs: { screen: ContactUs },
}, {
	defaultNavigationOptions: ({ navigation }) => ({
		headerStyle: {
			backgroundColor: '#512DA8'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#512DA8'
		},
		headerLeft: () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
	})
}))

const AboutUsNavigator = createAppContainer(createStackNavigator({
	
	AboutUs: { screen: AboutUs },
}, {
	defaultNavigationOptions: ({ navigation }) => ({
		headerStyle: {
			backgroundColor: '#512DA8'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#512DA8'
		},
		headerLeft: () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
	})
}))

const ReservationNavigator = createAppContainer(createStackNavigator({
	
	Reservation: { screen: Reservation },
}, {
	defaultNavigationOptions: ({ navigation }) => ({
		headerStyle: {
			backgroundColor: '#512DA8'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#fff'
		},
		headerLeft: () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
	})
}))

const FavoritesNavigator = createAppContainer(createStackNavigator({
	
	Favorites: { screen: Favorites },
}, {
	defaultNavigationOptions: ({ navigation }) => ({
		headerStyle: {
			backgroundColor: '#512DA8'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#fff'
		},
		headerLeft: () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
	})
}))

const LoginNavigator = createAppContainer(createStackNavigator({
	
	Login: { screen: Login },
}, {
	defaultNavigationOptions: ({ navigation }) => ({
		headerStyle: {
			backgroundColor: '#512DA8'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#fff'
		},
		headerLeft: () => <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
	})
}))

const CustomDrawerContentComponent = (props) => (
	<ScrollView>
		<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }} >
			<View style={styles.drawerHeader} >
				<View style={{flex: 1}}>
					<Image source={require('./images/logo.png')} style={styles.drawerImage} />
				</View>
				<View style={{flex: 2}}>
					<Text style={styles.drawerHeaderText} >Ristorante Con Fusion</Text>
				</View> 
			</View>
			<DrawerItems {...props} />
		</SafeAreaView>
	</ScrollView>
);

const MainNavigator = createAppContainer(createDrawerNavigator({

	Login: {
		screen: LoginNavigator,
		navigationOptions: {
			title: 'Login',
			drawerLabel: 'Login',
			drawerIcon: ({ tintColor }) => (
				<Icon name='home' type='font-awesome' size={24} color={tintColor} />
			)
		}
	},
	Home: {
		screen: HomeNavigator,
		navigationOptions: {
			title: 'Home',
			drawerLabel: 'Home',
			drawerIcon: ({ tintColor }) => (
				<Icon name='home' type='font-awesome' size={24} color={tintColor} />
			)
		}
	},
	AboutUs: {
		screen: AboutUsNavigator,
		navigationOptions: {
			title: 'About Us',
			drawerLabel: 'About Us',
			drawerIcon: ({ tintColor }) => (
				<Icon name='info-circle' type='font-awesome' size={24} color={tintColor} />
			)
		}
	},
	Menu: {
		screen: MenuNavigator,
		navigationOptions: {
			title: 'Menu',
			drawerLabel: 'Menu',
			drawerIcon: ({ tintColor }) => (
				<Icon name='list' type='font-awesome' size={24} color={tintColor} />
			)
		}
	},
	ContactUs: {
		screen: ContactUsNavigator,
		navigationOptions: {
			title: 'Contact Us',
			drawerLabel: 'Contact Us',
			drawerIcon: ({ tintColor }) => (
				<Icon name='address-card' type='font-awesome' size={22} color={tintColor} />
			)
		}
	},
	Favorites: {
		screen: FavoritesNavigator,
		navigationOptions: {
			title: 'My Favorites',
			drawerLabel: 'My Favorites',
			drawerIcon: ({ tintColor }) => (
				<Icon name='heart' type='font-awesome' size={24} color={tintColor} />
			)
		}
	},
	Reservation: {
		screen: ReservationNavigator,
		navigationOptions: {
			title: 'Reserve Table',
			drawerLabel: 'Reserve Table',
			drawerIcon: ({ tintColor }) => (
				<Icon name='cutlery' type='font-awesome' size={24} color={tintColor} />
			)
		}
	}
}, {
	initialRouteName: 'Home',
	drawerBackgroundColor: '#D1C4E9',
	contentComponent: CustomDrawerContentComponent
}))

class Main extends Component {

	componentDidMount() {
		this.props.fetchDishes();
		this.props.fetchComments();
		this.props.fetchPromos();
		this.props.fetchLeaders();
	}

	render() {
		return(
			<View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}> 
				<MainNavigator />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	drawerHeader: {
		backgroundColor: '#512DA8',
		height: 120,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row'
	},
	drawerHeaderText: {
		color: 'white',
		fontSize: 18	,
		fontWeight: 'bold',
		margin: 16
	},
	drawerImage: {
		margin: 22,
		width: 68,
		height: 50
	}
})

export default connect(null, mapDispatchToProps)(Main);
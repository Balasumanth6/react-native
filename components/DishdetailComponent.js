import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button, StyleSheet, TextInput } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		favorites: state.favorites
	}
}

const mapDispatchToProps = dispatch => ({
	postFavorite: (dishId) => dispatch(postFavorite(dishId)),
	postComment: (dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author))
})

function RenderDish(props) {

	const dish = props.dish;

	if (dish != null) {
		return(
			<Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
				<Card featuredTitle={dish.name} image={{uri: baseUrl + dish.image}} >
					<Text style={{margin: 10}}> 
						{dish.description + '.'}
					</Text>
					<View style={styles.icons} >
						<Icon style={{flex: 1}} raised reverse name={ props.favorite ? 'heart' : 'heart-o'} 
							type='font-awesome' color='#f50' 
							onPress={() => props.favorite ? console.log('Already favorite') : props.onPress() } />
						<Icon style={{flex: 1}} raised reverse name={'pencil'} 
							type='font-awesome' color='#512DA8' 
							onPress={() => props.newComment() } />
					</View>
				</Card>
			</Animatable.View>
		);	
	}

	else{
		return(<View> </View>);
	}
}

function RenderComments(props) {

	const comments = props.comments

	const RenderCommentItem = ({ item, index }) => {
		return (
			<View key={index} style={{margin:10}}>
				<Rating style={{}} imageSize={15} readonly startingValue={item.rating} />
				<Text style={{fontSize: 14}}>{item.comment}</Text>
				<Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
			</View>
		);	
	}

	return(
		<Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
			<Card title='Comments'>
				<FlatList data={comments} renderItem={RenderCommentItem} keyExtractor={item => item.id.toString()} />
			</Card>
		</Animatable.View>
	);
}

class Dishdetail extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			author: ' ',
			comment: ' ',
			rating: 0
		}
	}

	markFavorite(dishId) {
		this.props.postFavorite(dishId)
	}

	newComment() {
		this.setState({ showModal: !this.state.showModal })
	}

	handleComment(dishId) {
		this.props.postComment(dishId, this.state.rating, this.state.comment, this.state.author);
		this.newComment();
	}

	resetForm() {
		this.setState({
			author: ' ',
			comment: ' ',
			rating: 0
		});
	}

	static navigationOptions = {
		title: 'Dishdetail'
	}

	render() {

		const dishId = this.props.navigation.getParam('dishId','');

		return(
			<ScrollView>

				<RenderDish dish={this.props.dishes.dishes[+dishId]} 
					favorite={this.props.favorites.some(el => el === dishId)}
					onPress={() => this.markFavorite(dishId)}
					newComment={() => this.newComment()} />
				<RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
				<View >
				<Modal animationType={'slide'} transparent={false} visible={this.state.showModal}
						onDismiss={() => {
							this.newComment();
							this.resetForm()
						}} onRequestClose={() => {
							this.newComment();
							this.resetForm()
						}} >
					<View style={styles.modal}>

						<Rating startingValue={this.state.rating} showRating style={{marginBottom: 30}}
							onFinishRating={(rating) => this.setState({rating: rating})} />

						<Input placeholder='Author' 
							onChangeText={(value) => this.setState({author: value})}
							leftIcon={ <Icon style={{marginRight: 5}} type= 'font-awesome' name= 'user-o' color= 'grey' size={20} /> } />

						<Input placeholder='Comment'
							onChangeText={(value) => this.setState({comment: value})}
							leftIcon={ <Icon style={{marginRight: 5}} type= 'font-awesome' name= 'comment-o' color= 'grey' size={20} /> } />

						<Button onPress={() => {
							this.handleComment(dishId);
							this.resetForm()
						}} color='#512DA8' title='Submit' />

						<Text />

						<Button onPress={() => {
							this.newComment();
							this.resetForm()
						}} color='#6A6B6C' title='Cancel' />

					</View>
				</Modal>
				</View>

			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	icons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	modal: {
		justifyContent: 'center',
		margin: 20
	},
	modalText: {
		fontSize: 18,
		margin: 10
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);


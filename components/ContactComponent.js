import React, {Component} from 'react';
import { View, Text, ScrollView, Button, Icon } from 'react-native';
import { Card, Title } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class ContactUs extends Component {

	static navigationOptions = {
		title: 'ContactUs'
	}

	sendMail() {
		MailComposer.composeAsync({
			recipients: ['confusion@food.net'],
			subject: 'Enquiry',
			body: 'To whom so ever it may concern'
		})
	}

	render() {
		return(
			<ScrollView>
				<Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
					<Card title={'Contact Information'}>
						<Text style={{margin: 10}}> 121, Clear Water Bay Road </Text>
						<Text style={{margin: 10}}> Clear Water Bay, Kowloon </Text>
						<Text style={{margin: 10}}> HONG KONG </Text>
						<Text style={{margin: 10}}> Tel: +852 1234 5678 </Text>
						<Text style={{margin: 10}}> Fax: +852 8765 4321 </Text>
						<Text style={{margin: 10}}> Email:confusion@food.net  </Text>
						<View style={{marginTop: 15}}>
						<Button title='Send Email' color="#512DA8"
								icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
								onPress={() => this.sendMail()} />
						</View>
					</Card>
				</Animatable.View>
			</ScrollView>
		);
	}
}

export default ContactUs;
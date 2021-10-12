import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Linking, Platform, Image, Alert } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { Title, Card } from 'react-native-paper';
import axios from 'axios';

import { AuthContext } from "./context";
import { Loading } from './Loading';

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);
  
export const Profile = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		setTimeout(() => {
		setIsLoading(false);
		}, 1500);
	}, []);

	if (isLoading) {
		return <Loading />;
	}

    return (
        <ScreenContainer>
            {/* <Text>Profile Screen</Text>
            <Button title="Sign Out" color="red" onPress={() => signOut()} /> */}

            <ScrollView>
				<View style={{alignItems:"center",margin:20}}>
					<Image
						style={{width:140,height:140,borderRadius:140/2}}
						source={require(`../assets/avatar-01.png`)}
					/>
					<Title style={styles.profileTitle}>Name</Title>
					<Text style={styles.profileClinicID}>Username</Text>
				</View>
				<View style={styles.container}>
					
					<Card
						style={styles.mycard}
						onPress={()=>{
							Linking.openURL(`mailto:email@email.com`)
							.then((res) => {console.log(res)})
							.catch((err) => {console.log(err)})
						}}
					>
						<View style={styles.cardContent}>
							<Icon name="envelope-o" type='font-awesome' size={29} color="#2979FF" />
							<Text style={styles.mytext}>email@email.com</Text>
						</View>
					</Card>
				</View>
				<View style={styles.buttonView}>
					{/* <Button
						title=" Reset Password"
						onPress={() => navigation.push("Reset Password")}
						icon={ <Icon name='lock' type='font-awesome' size={24} color= 'white' />}
					/>
					<Button
						title=" Sign Out"
						color="red"
						onPress={() => confirmSignOut()}
						icon={ <Icon name='sign-out' type='font-awesome' size={24} color= 'white' /> }
						buttonStyle={{ backgroundColor: "red" }}
						style={{marginLeft: 10}}
					/> */}

                    <Button 
                    title="Sign Out"
                    color="red"
                    onPress={() => signOut()}
                    icon={ <Icon name='sign-out' type='font-awesome' size={24} color= 'white' /> }
					buttonStyle={{ backgroundColor: "red" }}
                    />
				</View>
			</ScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 5,
		marginRight: 5
	},
	mycard:{
        margin:3
    },
	cardContent:{
		flexDirection:"row",
		padding:8
	},
	mytext:{
		fontSize:18,
		marginTop:3,
		marginBottom:3,
		marginLeft:15
	},
	mytextMobile:{
		fontSize:18,
		marginTop:10,
		marginBottom:3,
		marginLeft:24
	},
	buttonView:{
		flexDirection:"row",
		justifyContent:"space-around",
		padding:10,
		margin:20
	},
	profileTitle:{
		fontSize:25
	},
	profileClinicID:{
		fontSize:18
	},
	mycard:{
		margin:3
	},
	mytext:{
		fontSize:18,
		marginTop:3,
		marginBottom:3,
		marginLeft:15,
		marginRight:15
	},
	mytextMobile:{
		fontSize:18,
		marginTop:10,
		marginBottom:3,
		marginLeft:24
	}
});
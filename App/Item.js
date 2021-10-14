import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Title, Card } from 'react-native-paper';
import { Icon, Button } from 'react-native-elements';
import axios from 'axios';

import { baseURL } from './baseURL';
import { AuthContext } from "./context";
 
export default function Item (props) {

    const { username, password, userJWT } = useContext(AuthContext);
    const { title, description, date, _id, completion } = props.route.params.item;

    const markAsCompleted = () => {
		if(!username || !password || !_id) {
			alert("All the fields are required!");
		} else {
			const updateDetails = {
				username: username,
				password: password,
				_id: _id
			};
			axios.post(`${baseURL}/todos/update`, updateDetails, { headers: { "x-auth-token": userJWT } })
			.then((res) => {
				Alert.alert("Activity marked as completed!");
                props.navigation.push("To Do List");
			})
			.catch((err) => {
				Alert.alert("Error",`${err.response.data.msg}`);
			});
		}
	};

    const deleteNote = () => {
		if(!username || !password || !_id) {
			alert("All the fields are required!");
		} else {
			const deleteDetails = {
				username: username,
				password: password,
				_id: _id
			};
			axios.post(`${baseURL}/todos/delete`, deleteDetails, { headers: { "x-auth-token": userJWT } })
			.then((res) => {
				Alert.alert("Successfully deleted!");
                props.navigation.push("To Do List");
			})
			.catch((err) => {
				Alert.alert("Error",`${err.response.data.msg}`);
			});
		}
	};

    if(completion > 0) {
        return (
            <ScrollView>
                <View>
                    <Card style={styles.titleCard}>
                        <View style={styles.notificationCardContent}>
                            <Text>Date : {date}</Text>
                            <Title>{title}</Title>
                        </View>
                    </Card>
                    <Card style={styles.detailCard}>
                        <View style={styles.notificationCardContent}>
                            <Text style={styles.cardTextDetails}>{description}</Text>
                        </View>
                    </Card>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title=" Delete"
                        color="red"
                        onPress={() => deleteNote()}
                        icon={ <Icon name='trash' type='font-awesome' size={24} color= 'white' /> }
                        buttonStyle={{ backgroundColor: "red" }}
                        style={{marginLeft: 10}}
                    />
                </View>
            </ScrollView>
        );
    } else {
        return (
            <ScrollView>
                <View>
                    <Card style={styles.titleCard}>
                        <View style={styles.notificationCardContent}>
                            <Text>Date : {date}</Text>
                            <Title>{title}</Title>
                        </View>
                    </Card>
                    <Card style={styles.detailCard}>
                        <View style={styles.notificationCardContent}>
                            <Text style={styles.cardTextDetails}>{description}</Text>
                        </View>
                    </Card>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title=" Mark As Completed"
                        color="green"
                        buttonStyle={{ backgroundColor: "green" }}
                        onPress={() => markAsCompleted()}
                        icon={ <Icon name='check' type='font-awesome' size={24} color= 'white' />}
                    />
                    <Button
                        title=" Delete"
                        color="red"
                        onPress={() => deleteNote()}
                        icon={ <Icon name='trash' type='font-awesome' size={24} color= 'white' /> }
                        buttonStyle={{ backgroundColor: "red" }}
                        style={{marginLeft: 10}}
                    />
                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
	titleCard:{
        padding:3,
        paddingTop:5,
		paddingBottom:5,
        marginTop:5,
        marginLeft:5,
        marginRight:5,
		backgroundColor:"white"
    },
    detailCard:{
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        marginBottom:20,
		backgroundColor:"#dbd9d9"
	},
	notificationCardContent:{
		padding:3
    },
    buttonView:{
		flexDirection:"row",
		justifyContent:"space-around",
		padding:10,
		margin:20
	},
    cardTextDetails:{
		fontSize:16,
		marginTop:10,
		marginBottom:10,
		marginLeft: 5,
        marginRight: 5,
        fontSize:17
	},
});
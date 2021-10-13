import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image, Text, KeyboardAvoidingView, Alert, TextInput } from "react-native";
import { Icon, Input, Button } from 'react-native-elements';
import axios from 'axios';

import { baseURL } from './baseURL';
import { AuthContext } from "./context";
import { Loading } from './Loading';

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);
  
export const Home = ({ navigation }) => {

	const { username, password, userJWT } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [enableShift, setEnableShift] = useState(false);

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	var date = dd + '-' + mm + '-' + yyyy;

	const resetfields = () => {
		setTitle();
		setDescription();
	}

	const validate = useCallback(() => {
		if(!username || !password || !userJWT || !title || !description || !date) {
			alert("All the fields are required!");
		} else {
			const todo = {
				username: username,
				title: title,
				description: description,
				date: date
			};
			axios.post(`${baseURL}/todos/create`, todo, { headers: { "x-auth-token": userJWT } })
			.then((res) => {
				Alert.alert("Todo created!");
				setTitle();
				setDescription();
			})
			.catch((err) => {
				Alert.alert("Error",`Todo is not created! ${err.response.data.msg}`);
			});
		}
	},[username, password, userJWT, title, description, date]);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	if (isLoading) {
		return <Loading />;
	}

    return(
        <ScreenContainer>
            <ScrollView>
				<KeyboardAvoidingView behavior="position" enabled={enableShift}>
					<View style={styles.logoView}>
						{/* <Image style={styles.stretch} source={require('../../assets/splash.png')} /> */}
						<Text style={styles.text}>Add ToDo Notes</Text>
					</View>
					<View style={styles.container}>
						<Input
							placeholder=" Note Title"
							leftIcon={{ type: 'font-awesome', name: 'address-book-o' }}
							onChangeText={(title) => setTitle(title)}
							value={title}
							containerStyle={styles.formInput}
							onFocus={() => {setEnableShift(false)}}
						/>
						<Input
							placeholder=" Note Description"
							leftIcon={{ type: 'font-awesome', name: 'sticky-note' }}
							onChangeText={(description) => setDescription(description)}
							value={description}
                            multiline={true}
                            numberOfLines={5}
							containerStyle={styles.formInput}
							onFocus={() => {setEnableShift(false)}}
						/>
                        <View style={styles.buttonView}>
                            <Button
                                title=" Add Todo"
                                onPress={() => validate()}
                                icon={ <Icon name='plus' type='font-awesome' size={24} color= 'white' />}
                            />
                            <Button
                                title=" Reset"
                                color="red"
                                onPress={() => resetfields()}
                                icon={ <Icon name='undo' type='font-awesome' size={24} color= 'white' /> }
                                buttonStyle={{ backgroundColor: "red" }}
                                style={{marginLeft: 10}}
                            />
                        </View>
					</View>
				</KeyboardAvoidingView>
            </ScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		marginLeft: 10,
		marginRight: 10,
		marginTop:20
	},
	logoView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
    formInput: {
    },
    buttonView:{
		flexDirection:"row",
		justifyContent:"space-around",
		padding:10,
		margin:20
	},
	formCheckbox: {
        margin: 10,
        backgroundColor: null
	},
	stretch: {
		width: 300,
		height: 100
	},
	text: {
		flex: 1,
		color: '#2979FF',
		fontSize: 25,
		fontWeight: 'bold'
	}
});
import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image, Text, KeyboardAvoidingView, Alert, TextInput } from "react-native";
import { Icon, Input, Button } from 'react-native-elements';
import axios from 'axios';

import { Loading } from './Loading';

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);
  
export const Home = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [enableShift, setEnableShift] = useState(false);

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

	React.useEffect(() => {
		setTimeout(() => {
		setIsLoading(false);
		}, 1500);
	}, []);

	if (isLoading) {
		return <Loading />;
	}

    return(
        <ScreenContainer>
            {/* <Text>Master List Screen</Text>
            <Button
                title="React Native by Example"
                onPress={() => navigation.push("Details", { name: "React Native by Example " })}
            />
            <Button
                title="React Native School"
                onPress={() => navigation.push("Details", { name: "React Native School" })}
            /> */}

            <ScrollView>
				<KeyboardAvoidingView behavior="position" enabled={enableShift}>
					<View style={styles.logoView}>
						{/* <Image style={styles.stretch} source={require('../../assets/splash.png')} /> */}
						<Text style={styles.text}>Add To Do Notes</Text>
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
                                onPress={() => navigation.push("Details", { name: "React Native by Example " })}
                                icon={ <Icon name='plus' type='font-awesome' size={24} color= 'white' />}
                            />
                            <Button
                                title=" Reset"
                                color="red"
                                onPress={() => navigation.push("Details", { name: "React Native School" })}
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
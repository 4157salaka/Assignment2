import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ScreenContainer = ({ children }) => (
  	<View style={styles.container}>{children}</View>
);

export const Splash = () => (
	<ScreenContainer>
		<Text style={styles.loadingText} >ToDoNotes</Text>
		<Image style={styles.stretch} source={require('../assets/splash.png')} />
	</ScreenContainer>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	loadingText: {
		color: '#2979FF',
		fontSize: 30,
		fontWeight: 'bold'
	},
	stretch: {
		width: 300,
		height: 300
	}
});
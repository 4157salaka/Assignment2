import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';

import { Loading } from './Loading';

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

const listItem = ((item,navigation) => {
	return(
		<Card
			style={styles.notificationCard}
			onPress={() => {
				navigation.push("Item",{item});
			}}
		>
			<View style={styles.notificationCardContent}>
				<Text>ID : {item.id}</Text>
				<Text style={styles.cardTextNotifications}>{item.title}</Text>
			</View>
		</Card>
	);
})
  
export default function List ({ navigation }) {

    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = useState('');
    const [list, setList] = useState();

    const pullDownRefresh = () => {

		axios.get(`https://jsonplaceholder.typicode.com/posts`)
		.then((response) => {
			setIsLoading(false);
			setList(response.data);
            setError('');
		})
		.catch((err) => {
			setIsLoading(false);
			setList();
			setError(`Error - ${err}! Reload the App. If it doesn't work, you need to Sign In again!`);
		});
	}

	useEffect(() => {
		pullDownRefresh();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

    if (error) {
		return (
			<ScrollView>
				<Text>{error}</Text>
			</ScrollView>
		);
	}

    return(
        // <ScreenContainer>
        //     <Text>List Screen</Text>
        //     <Button title="Item" onPress={() => navigation.push("Item")} />
        //     <Button
        //         title="React Native School"
        //         onPress={() => {
        //             navigation.navigate("Home", {
        //                 screen: "Details",
        //                 params: { name: "React Native School" }
        //             });
        //         }}
        //     />
        // </ScreenContainer>

        <FlatList
			data={list}
			renderItem={({item}) => {return listItem(item,navigation)}}
			keyExtractor={(item)=>`${item.id}`}
			onRefresh={() => pullDownRefresh()}
			refreshing={isLoading}
		/>
    );
};

const styles = StyleSheet.create({
	cardTextNotifications:{
		margin:3,
		marginLeft: 5,
		marginRight: 5,
		paddingTop:5,
		paddingBottom:5,
		fontWeight:"bold",
		color:"#55585c"
	},
	notificationCard:{
		marginTop:10,
		marginLeft:10,
		marginRight:10,
		padding:15,
		backgroundColor:"white"
	},
	notificationCardContent:{
		padding:3
	}
});
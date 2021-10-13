import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Title, Card } from 'react-native-paper';
 
export default function Item (props) {

    const { title, description, date } = props.route.params.item;

    return (
        <ScrollView>
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
        </ScrollView>
    );
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
    cardTextDetails:{
		fontSize:16,
		marginTop:10,
		marginBottom:10,
		marginLeft: 5,
        marginRight: 5,
        fontSize:17
	},
});
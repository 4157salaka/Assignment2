import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Title, Card } from 'react-native-paper';

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);
  
export default function Item (props) {

    const { userId, id, title, body } = props.route.params.item;

    return (
        <ScrollView>
            <Card style={styles.titleCard}>
                <View style={styles.notificationCardContent}>
                    <Text>ID : {id}</Text>
                    <View style={{flexDirection:"row"}}>
                        <Icon name='eye' type='font-awesome' size={24} color= 'grey' />
                        <Text style={{marginTop:5}}> : {userId}</Text>
                    </View>
                    <Title>{title}</Title>
                </View>
            </Card>
            <Card style={styles.detailCard}>
                <View style={styles.notificationCardContent}>
                    <Text style={styles.cardTextDetails}>{body}</Text>
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
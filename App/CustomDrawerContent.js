import React from "react";
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

import { AuthContext } from "./context";

export function CustomDrawerContent(props) {
    const { signOut } = React.useContext(AuthContext);
	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    {/* <Image source={require('../assets/splash.png')} style={styles.drawerImage} /> */}
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>ToDoNotes</Text>
                </View>
            </View>
			<DrawerItemList {...props} />
            <Button
				title=" Sign Out"
				color="red"
				onPress={() => signOut()}
				icon={ <Icon name='sign-out' type='font-awesome' size={24} color= 'white' /> }
                buttonStyle={{ backgroundColor: "red" }}
                style={styles.signOutBtn}
			/>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: '#2979FF',
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        width: 150,
        height: 150
    },
    signOutBtn: {
        marginTop: 20,
        marginBottom: 20,
        marginRight: 50,
        marginLeft: 50
    }
});
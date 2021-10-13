import React, { useState, useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

import { AuthContext } from "./context";
import { SignIn } from "./SignIn";
import { CreateAccount } from "./CreateAccount";
import List from "./List";
import { Home } from "./Home";
import { Details } from "./Details";
import Item from "./Item";
import { Profile } from "./Profile";
import { Splash } from "./Splash";
import { CustomDrawerContent } from './CustomDrawerContent';

// Stack Navigation from SignIn screen
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
	<AuthStack.Navigator>
		<AuthStack.Screen
			name="SignIn"
			component={SignIn}
			options={{ title: "Sign In" }}
		/>
		<AuthStack.Screen
			name="CreateAccount"
			component={CreateAccount}
			options={{ title: "Create Account" }}
		/>
	</AuthStack.Navigator>
);

// Stack Navigation from Home screen
const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation }) => (
	<HomeStack.Navigator>
		<HomeStack.Screen
			name="Home"
			component={Home}
			options={{ headerLeft: () => (
				<Icon
					name="menu"
					size={24}
					color= 'grey'
					onPress={ () => navigation.toggleDrawer() }
					style={{ marginLeft: 15 }}
				/>
            ) }}
		/>
		<HomeStack.Screen
			name="Details"
			component={Details}
			options={({ route }) => ({
				title: route.params.name
			})}
		/>
	</HomeStack.Navigator>
);

// Stack Navigation from List screen
const ToDoList = createStackNavigator();
const ToDoListScreen = ({ navigation }) => (
	<ToDoList.Navigator>
		<ToDoList.Screen
			name="To Do List"
			component={List}
			options={{ headerLeft: () => (
				<Icon
					name="menu"
					size={24}
					color= 'grey'
					onPress={ () => navigation.toggleDrawer() }
					style={{ marginLeft: 15 }}
				/>
            ) }}
		/>
		<ToDoList.Screen name="Item" component={Item} />
	</ToDoList.Navigator>
);

// Stack Navigation from Profile screen
const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({ navigation }) => (
	<ProfileStack.Navigator>
		<ProfileStack.Screen
			name="Profile"
			component={Profile}
			options={{ headerLeft: () => (
				<Icon
					name="menu"
					size={24}
					color= 'grey'
					onPress={ () => navigation.toggleDrawer() }
					style={{ marginLeft: 15 }}
				/>
            ) }}
		/>
	</ProfileStack.Navigator>
);

// Tab Navigation for Home & Search screens
const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
	<Tabs.Navigator initialRouteName="Home"
	screenOptions={({ route }) => ({
		tabBarIcon: ({ focused, color, size }) => {
			let iconName;
			if (route.name === 'Home') {
				iconName = focused ? 'home' : 'home';
			} else if (route.name === 'List') {
				iconName = focused ? 'list-ul' : 'list-ul';
			}
			return <Icon name={iconName} size={size} color={color} type='font-awesome' />;
		}
	})}
	tabBarOptions={{
		activeTintColor: '#2979FF',
		inactiveTintColor: 'gray',
	}}
	>
		<Tabs.Screen name="Home" component={HomeStackScreen} />
		<Tabs.Screen name="List" component={ToDoListScreen} />
	</Tabs.Navigator>
);

// Drawer Navigation bar
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
	<Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
		<Drawer.Screen name="Home"
			component={TabsScreen}
			options={ () => ({
				drawerIcon: ({ focused, color, size }) => {
					let iconName;
					iconName = focused ? 'home' : 'home';
					return <Icon name={iconName} size={size} color={color} type='font-awesome' />;
				}
			})}
		/>
		<Drawer.Screen name="Profile"
			component={ProfileStackScreen}
			options={ () => ({
				drawerIcon: ({ focused, color, size }) => {
					let iconName;
					iconName = focused ? 'user' : 'user';
					return <Icon name={iconName} size={size} color={color} type='font-awesome' />;
				}
			})}
		/>
	</Drawer.Navigator>
);

// Render Authentication & Drawer at the initial app deployment
const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
	<RootStack.Navigator headerMode="none">
		{userToken ? (
		<RootStack.Screen
			name="App"
			component={DrawerScreen}
			options={{
				animationEnabled: false
			}}
		/>
		) : (
		<RootStack.Screen
			name="Auth"
			component={AuthStackScreen}
			options={{
				animationEnabled: false
			}}
		/>
		)}
	</RootStack.Navigator>
);

export default () => {
	
	const [isLoading, setIsLoading] = useState(true);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [userJWT, setUserJWT] = useState();

	const loadDetails = async () => {
		try {
			let username = await SecureStore.getItemAsync("appUsername");
			let password = await SecureStore.getItemAsync("appPassword");
			let userJWT = await SecureStore.getItemAsync("userJWT");

			if (username && password && userJWT) {
				setUsername(username);
				setPassword(password);
				setUserJWT(userJWT);
			}
		} catch (err) {
			alert (err);
		}
	}

	// Authentication process
	const authContext = useMemo(() => {
		return {
			signIn: (userJWT,username,password) => {
				setIsLoading(false);
				setUsername(username);
				setPassword(password);
				setUserJWT(userJWT);
			},
			signOut: () => {
				setIsLoading(false);
				setUsername();
				setPassword();
				setUserJWT();
			},
			saveDetails: async (userJWT,username,password) => {
				try {
					await SecureStore.setItemAsync("appUsername", String(username));
					await SecureStore.setItemAsync("appPassword", String(password));
					await SecureStore.setItemAsync("userJWT", String(userJWT));
				} catch (err) {
					alert (err);
				}
			},
			removeDetails: async () => {
				try {
					await SecureStore.deleteItemAsync("appUsername");
					await SecureStore.deleteItemAsync("appPassword");
					await SecureStore.deleteItemAsync("userJWT");
				} catch (err) {
					alert (err);
				}
			},
			username,
			password,
			userJWT
		};
	}, [username,password,userJWT]);

	// Splash screen
	useEffect(() => {
		loadDetails();
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	if (isLoading) {
		return <Splash />;
	}

	// Render initial route deployment
	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				<RootStackScreen username={username} password={password} userJWT={userJWT} />
			</NavigationContainer>
		</AuthContext.Provider>
	);
};
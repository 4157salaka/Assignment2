import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from 'react-native-elements';

import { AuthContext } from "./context";
import { SignIn } from "./SignIn";
import { CreateAccount } from "./CreateAccount";
import { Search } from "./Search";
import { Home } from "./Home";
import { Details } from "./Details";
import { Search2 } from "./Search2";
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

// Stack Navigation from Search screen
const SearchStack = createStackNavigator();
const SearchStackScreen = ({ navigation }) => (
	<SearchStack.Navigator>
		<SearchStack.Screen
			name="Search"
			component={Search}
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
		<SearchStack.Screen name="Search2" component={Search2} />
	</SearchStack.Navigator>
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
			} else if (route.name === 'Search') {
				iconName = focused ? 'search' : 'search';
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
		<Tabs.Screen name="Search" component={SearchStackScreen} />
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
	const [isLoading, setIsLoading] = React.useState(true);
	const [userToken, setUserToken] = React.useState(null);

	// Authentication process
	const authContext = React.useMemo(() => {
		return {
			signIn: () => {
				setIsLoading(false);
				setUserToken("asdf");
			},
			signUp: () => {
				setIsLoading(false);
				setUserToken("asdf");
			},
			signOut: () => {
				setIsLoading(false);
				setUserToken(null);
			}
		};
	}, []);

	// Splash screen
	React.useEffect(() => {
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
				<RootStackScreen userToken={userToken} />
			</NavigationContainer>
		</AuthContext.Provider>
	);
};
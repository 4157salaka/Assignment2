import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { Loading } from './Loading';

import { AuthContext } from "./context";

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);
  
export const SignIn = ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		setTimeout(() => {
		setIsLoading(false);
		}, 1500);
	}, []);

	if (isLoading) {
		return <Loading />;
	}

    return (
        <ScreenContainer>
            <Text>Sign In Screen</Text>
            <Button title="Sign In" onPress={() => signIn()} />
            <Button
                title="Create Account"
                onPress={() => navigation.push("CreateAccount")}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { AuthContext } from "./context";
import { Loading } from './Loading';

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);
  
export const Profile = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext);
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
            <Text>Profile Screen</Text>
            <Button title="Sign Out" color="red" onPress={() => signOut()} />
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
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { Loading } from './Loading';

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);
  
export const Home = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);

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
            <Text>Master List Screen</Text>
            <Button
                title="React Native by Example"
                onPress={() => navigation.push("Details", { name: "React Native by Example " })}
            />
            <Button
                title="React Native School"
                onPress={() => navigation.push("Details", { name: "React Native School" })}
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
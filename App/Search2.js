import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Loading } from './Loading';

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);
  
export const Search2 = () => {
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
            <Text>Search2 Screen</Text>
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
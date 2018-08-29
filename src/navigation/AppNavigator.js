import React from "react";
import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import {Text} from "react-native";
import ContainerSample from "../containers/ContainerSample";

export default (AppNavigator = createStackNavigator(
	{
		MainScreen: {
			screen: ContainerSample,
			navigationOptions: ({navigation}) => ({
				title: "sample",
				header: null
			})
		}
	},
	{
		cardStyle: {backgroundColor: "transparent"}
	}
));

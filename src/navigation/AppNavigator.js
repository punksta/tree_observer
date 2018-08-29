import React from "react";
import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import {Text} from "react-native";
import TreeObserverScreen from "../containers/TreeObserverScreen";

export default (AppNavigator = createStackNavigator(
	{
		TreeObserverScreen: {
			screen: TreeObserverScreen,
			navigationOptions: ({navigation}) => ({
				title: "sample",
				header: null,
				params: {}
			})
		}
	},
	{
		cardStyle: {backgroundColor: "transparent"}
	}
));

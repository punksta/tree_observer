import React from "react";
import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import {Text} from "react-native";
import TreeObserverScreen from "../containers/TreeObserverScreen";

export default (AppNavigator = createStackNavigator(
	{
		TreeObserverScreen: {
			screen: TreeObserverScreen,
			navigationOptions: ({navigation}) => ({
				title: navigation?.state?.params?.title || "Root"
			})
		}
	},
	{
		cardStyle: {backgroundColor: "transparent"},
		initialRouteParams: {
			currentPath: []
		}
	}
));

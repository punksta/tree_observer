import {NavigationActions} from "react-navigation";

import {Provider, connect} from "react-redux";
import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import {BackHandler, ImageBackground} from "react-native";

import {PersistGate} from "redux-persist/integration/react";

import configureStore from "./configureStore";
import {createNavigationService} from "./navigation/NavigationService";

const navigationService = createNavigationService();

const {store, persistor} = configureStore(navigationService);

class NavigatorHolder extends React.Component {
	setNavigator = navRef => {
		navigationService.setRootNavigator(navRef);
	};

	render() {
		return (
			<AppNavigator
				onNavigationStateChange={(...args) =>
					navigationService.onChangeNavigationState(...args)
				}
				ref={this.setNavigator}
				{...this.props}
			/>
		);
	}
}

export default class Root extends React.Component {
	render() {
		return (
			<ImageBackground
				style={{
					flex: 1
				}}
				// source={}
			>
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<NavigatorHolder />
					</PersistGate>
				</Provider>
			</ImageBackground>
		);
	}
}

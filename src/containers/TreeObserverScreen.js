import * as React from "react";
import ComponentSample from "../components/ComponentSample";
import TreeList from "../components/TreeList";
import {Button, View, TextInput} from "react-native";

class ContainerSample extends React.Component {
	_inputValue = "empty";

	_onButtonPressed = () => {
		this.props.addElement(this._inputValue);
	};

	_onChangeText = input => {
		this._inputValue = input;
	};

	onItemPress = itemId => {};

	render() {
		return (
			<View
				style={{
					flex: 1
				}}
			>
				<TreeList
					//onPress={onItemPress}
					tree={this.props.currentTree}
					style={{flex: 1}}
				/>
				<TextInput
					placeholder={"New item"}
					autocomplete="off"
					spellCheck={false}
					autoGrow
					multiline
					autoCorrect={false}
					onChangeText={this._onChangeText}
					underlineColorAndroid="transparent"
				/>
				<Button title={"ADD"} onPress={this._onButtonPressed} />
			</View>
		);
	}
}

import {compose, onlyUpdateForKeys} from "recompose";

import {connect} from "react-redux";

const hoc = compose(
	connect(
		(state, ownProps) => {
			// const {currentPath}  = ownProps?.navigation?.state?.params
			// todo: read current subtree usung currentPath and getSubTree function

			return {
				currentTree: state.treeSate.tree.get("0")
			};
		},
		dispatch => {
			return {
				addElement: title => dispatch({type: "ADD_ELEMENT", title}),
				onItemPress: itemId => {
					const {currentPath} = ownProps?.navigation?.state?.params;
					const newPath = [...currentPath, itemId];
					dispatch({type: "ON_NAVIGATE_DEEPER_CLICK", newPath});
				}
			};
		}
	)
);

export default hoc(ContainerSample);

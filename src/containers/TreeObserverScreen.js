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

	onItemPress = item => {
		this.props.onItemPress(item);
	};

	render() {
		return (
			<View style={{flex: 1, backgroundColor: "#f8f8f8"}}>
				<TreeList
					onItemPress={this.onItemPress}
					tree={this.props.tree}
					style={{flex: 1}}
				/>
				<View>
					<TextInput
						style={{borderTopWidth: 1, borderTopColor: "black", padding: 16}}
						placeholder={"New item"}
						autocomplete="off"
						spellCheck={false}
						autoGrow
						multiline
						autoCorrect={false}
						onChangeText={this._onChangeText}
						underlineColorAndroid="transparent"
					/>
					<View style={{justifyContent: "center", padding: 8}}>
						<Button title={"ADD"} onPress={this._onButtonPressed} />
					</View>
				</View>
			</View>
		);
	}
}

import {compose, onlyUpdateForKeys} from "recompose";

import {connect} from "react-redux";

import {getSubTree} from "../model/Tree";

const hoc = compose(
	connect(
		(state, ownProps) => {
			const currentPath = ownProps.navigation.state.params.currentPath;
			return {
				tree: getSubTree(state.treeSate.tree, currentPath)
			};
		},
		(dispatch, ownProps) => {
			const currentPath = ownProps.navigation.state.params.currentPath;

			return {
				addElement: title =>
					dispatch({type: "ADD_ELEMENT", title, currentPath}),

				onItemPress: item => {
					const {currentPath} = ownProps?.navigation?.state?.params;
					const newPath = [...currentPath, item.get("key")];
					dispatch({
						type: "ON_NAVIGATE_DEEPER_CLICK",
						newPath,
						title: item.get("title")
					});
				}
			};
		}
	)
);

export default hoc(ContainerSample);

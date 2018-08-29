import * as React from "react";
import {
	Text,
	View,
	VirtualizedList,
	StyleSheet,
	TouchableOpacity
} from "react-native";

import {pure, onlyUpdateForKeys} from "recompose";
import {List} from "immutable";
import {getTreeSize, getSubTreeByIndex} from "../model/Tree";

const renderNode_ = ({item, onPress}) => (
	<TouchableOpacity
		onPress={onPress.bind(null, item)}
		style={{
			paddingHorizontal: 16,
			paddingVertical: 16,
			borderBottomColor: "black",
			borderBottomWidth: StyleSheet.hairlineWidth
		}}
	>
		<Text
			style={{
				fontSize: 16
			}}
		>
			{item.get("title")}
		</Text>
	</TouchableOpacity>
);
const RenderNode = onlyUpdateForKeys(["item"])(renderNode_);

const getItem = (t, index) => {
	return getSubTreeByIndex(t, index);
};

const getItemCount = t => {
	return getTreeSize(t);
};

const TreeList = ({tree, onItemPress, ...rest}) => (
	<VirtualizedList
		{...rest}
		keyExtractor={(item, index) => item.get("key")}
		data={tree}
		getItem={getItem}
		getItemCount={getItemCount}
		renderItem={({item, index}) => (
			<RenderNode item={item} onPress={onItemPress} />
		)}
	/>
);

export default onlyUpdateForKeys(["tree"])(TreeList);

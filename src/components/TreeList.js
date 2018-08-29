import * as React from "react";
import {Text, View, VirtualizedList} from "react-native";

import {pure, onlyUpdateForKeys} from "recompose";
import {List} from "immutable";

const renderNode_ = ({item}) => <Text>{item.get("title")}</Text>;
const RenderNode = onlyUpdateForKeys(["item"])(renderNode_);

const getItem = (t, index) => {
	return t.get("nodes").get(index.toString());
};

const getItemCount = t => {
	return t.get("nodes").size;
};

const TreeList = ({tree, ...rest}) => (
	<VirtualizedList
		{...rest}
		keyExtractor={(item, index) => `${item.title}-${index}`} // todo: read real id from tree
		data={tree}
		getItem={getItem}
		getItemCount={getItemCount}
		renderItem={({item}) => <RenderNode item={item} />}
	/>
);

export default onlyUpdateForKeys(["tree"])(TreeList);

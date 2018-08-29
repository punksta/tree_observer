//@flow

import {createTree, addElement} from "../model/Tree";
import type {Tree} from "../model/Tree";
import type {Actions} from "../actions";

type State = {
	tree: Tree
};

const initialState = {
	tree: createTree()
};

export default (state: State = initialState, action: Actions) => {
	switch (action.type) {
		case "ADD_ELEMENT":
			return {
				...state,
				tree: addElement(state.tree, action.currentPath)(action.title)
			};
		default:
			return state;
	}
};

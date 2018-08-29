// @flow

type MetaId = string;
import {OrderedMap, Record} from "immutable";

// optimized immutable tree with multikey support
export type Tree = Record<{
	title: string,
	nodes: OrderedMap<MetaId, Tree>,
	key: string
}>;

const TreeRecord = Record({title: "", nodes: OrderedMap(), key: ""});

const getSubTreeMetaPath = (tree: Tree, path: Array<string>): Array<string> => {
	return path.length === 0 ? [] : flatten(path.map(p => ["nodes", p]));
};

export const createTree: () => Tree = (rootId = "0", rootTitle = "root") =>
	new TreeRecord({key: rootId, title: rootTitle, nodes: OrderedMap()});

export const addElement = (
	tree: Tree,
	currentPath: Array<string> = []
): (string => Tree) => (title: string) => {
	const subTreeMetaPath = getSubTreeMetaPath(tree, currentPath);
	const subTree: Tree = tree.getIn(subTreeMetaPath);
	const nodes = subTree.get("nodes");

	const newItemKey =
		nodes.size > 0
			? (Number.parseInt(nodes.last().get("key")) + 1).toString()
			: "0";
	return (tree.setIn(
		[...subTreeMetaPath, "nodes", newItemKey],
		new TreeRecord({title, nodes: OrderedMap(), key: newItemKey})
	): Tree);
};

export const getSubTree = (
	tree: Tree,
	searchPath: Array<string> = []
): Tree => {
	const subTreeMetaPath = getSubTreeMetaPath(tree, searchPath);
	return tree.getIn(subTreeMetaPath);
};

export const getTreeSize = (tree: Tree): number => {
	return tree.get("nodes").size;
};

const KEY_SEQUANCE_CACHE_KEY = "__KEYS__";

export const getTreeKeySeq = (tree: Tree) => {
	const nodes = tree.get("nodes");

	if (nodes[KEY_SEQUANCE_CACHE_KEY]) {
		return nodes[KEY_SEQUANCE_CACHE_KEY];
	} else {
		const keySeq = nodes.keySeq();
		nodes[KEY_SEQUANCE_CACHE_KEY] = keySeq;
		return keySeq;
	}
};

export const getSubTreeByIndex = (tree: Tree, index: number): Tree => {
	const keyArray = getTreeKeySeq(tree);
	return tree.getIn(["nodes", keyArray.get(index)]);
};

function flatten(arr) {
	return arr.reduce((acc, e) => acc.concat(e), []);
}

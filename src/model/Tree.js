type MetaId = string;
import {Map, Record} from "immutable";

export const TreeNode = Record({title: "", nodes: Map()});

// optimized immutable tree with multikey support
export type Tree = Map<MetaId, TreeNode>;

function flatten(arr) {
	return arr.reduce((acc, e) => acc.concat(e), []);
}

const injectMetaIdIntoPath = (path: Array<string>) => {
	return flatten(path.map(p => [p, "nodes"]));
};

export const createTree = (rootId = "0", rootTitle = "root") =>
	Map({[rootId]: new TreeNode({title: rootTitle, nodes: Map()})});

export const addElement = (tree: Tree, currentPath: Array<string> = ["0"]) => (
	title: string
): Tree => {
	const metaPath = injectMetaIdIntoPath(currentPath);
	const nodes = tree.getIn(metaPath);

	return tree.setIn(
		[...metaPath, nodes.size.toString()],
		new TreeNode({title, nodes: Map()})
	);
};

export const getSubTree = (
	tree: Tree,
	currentPath: Array<string> = ["0"]
): Tree => {
	const metaPath = injectMetaIdIntoPath(currentPath);
	return tree.getIn(metaPath);
};

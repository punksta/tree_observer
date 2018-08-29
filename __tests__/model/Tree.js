import {
	createTree,
	getSubTree,
	getSubTreeByIndex,
	addElement,
	getTreeKeySeq
} from "../../src/model/Tree";

describe("Tree", () => {
	it("createTree", () => {
		const tree = createTree("0", "root");
		expect(tree.get("title")).toEqual("root");
	});

	it("addElement", () => {
		const tree = createTree("root", "Root title");

		const newTree = addElement(tree)("child");

		expect(newTree.getIn(["nodes", "0", "title"])).toEqual("child");
	});

	it("addElement deep", () => {
		const tree = createTree("root", "Root title");

		const newTree = addElement(tree)("child");
		const newTree2 = addElement(newTree, ["0"])("child2");

		expect(newTree2.getIn(["nodes", "0", "nodes", "0", "title"])).toEqual(
			"child2"
		);
	});

	it("addElement multiset", () => {
		const tree = createTree("root", "Root title");

		const newTree = addElement(tree)("child");
		const newTree2 = addElement(newTree)("child2");

		expect(newTree2.getIn(["nodes", "0", "title"])).toEqual("child");
		expect(newTree2.getIn(["nodes", "1", "title"])).toEqual("child2");
	});

	it("getTreeKeySeq", () => {
		const tree = addElement(createTree("root", "Root title"))("test");
		const keys1 = getTreeKeySeq(tree);
		expect(keys1.toJS()).toEqual(["0"]);
	});

	it("getTreeKeySeq should cache result", () => {
		const tree = createTree("root", "Root title");

		const keys1 = getTreeKeySeq(tree);
		const keys2 = getTreeKeySeq(tree);

		expect(keys1 === keys2).toEqual(true);
	});

	it("getTreeKeySeq should cached result", () => {
		const tree = createTree("root", "Root title");

		const keys1 = getTreeKeySeq(tree);
		const keys2 = getTreeKeySeq(tree);

		expect(keys1 === keys2).toEqual(true);
	});

	it("getSubTreeByIndex", () => {
		const tree = addElement(
			addElement(createTree("root", "Root title"))("test")
		)("test2");
		const item = getSubTreeByIndex(tree, 1);
		expect(item.get("title")).toEqual("test2");
	});

	it("getSubTree", () => {
		const tree = createTree("root", "Root title");
		const newTree = addElement(tree)("test");
		const newTree2 = addElement(newTree, ["0"])("test2");
		const item = getSubTree(newTree2, ["0", "0"]);
		expect(item.get("title")).toEqual("test2");
	});
});

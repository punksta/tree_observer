import {createTree, addElement} from "../../src/model/Tree";

describe("Tree", () => {
	it("createTree", () => {
		const tree = createTree("0", "root");
		expect(tree.get("0").get("title")).toEqual("root");
	});

	it("addElement", () => {
		const tree = createTree("root", "Root title");

		const newTree = addElement(tree, ["root"])("child");

		expect(newTree.getIn(["root", "nodes", "0", "title"])).toEqual("child");
	});

	it("addElement deep", () => {
		const tree = createTree("root", "Root title");

		const newTree = addElement(tree, ["root"])("child");
		const newTree2 = addElement(newTree, ["root", "0"])("child2");

		expect(
			newTree2.getIn(["root", "nodes", "0", "nodes", "0", "title"])
		).toEqual("child2");
	});

	it("addElement multiset", () => {
		const tree = createTree("root", "Root title");

		const newTree = addElement(tree, ["root"])("child");
		const newTree2 = addElement(newTree, ["root"])("child2");

		expect(newTree2.getIn(["root", "nodes", "0", "title"])).toEqual("child");
		expect(newTree2.getIn(["root", "nodes", "1", "title"])).toEqual("child2");
	});
});

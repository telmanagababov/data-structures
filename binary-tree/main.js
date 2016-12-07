const DEFAULT_INPUT_VALUES = [11, 7, 15, 5, 9, 13, 20, 3, 6, 8, 10, 12, 14, 18, 25],
	DEFAULT_SEARCH_VALUES = [5, 15, 25, 75, 30, 8, 90];
let binaryTree = new BinaryTree(),
	insertInput = null,
	searchInput = null,
	searchResult = null,
	inOrderTraverseInput = null,
	preOrderTraverseInput = null,
	postOrderTraverseInput = null,
	minInput = null,
	maxInput = null,
	removeInput = null,
	heightInput = null,
	treeContainer = null,
	searchIndex = 0,
	removeIndex = 0,
	valueIndex = 0;

function onInsert() {
	if(isNaN(insertInput.value) === false) {
		binaryTree.insert(parseInt(insertInput.value));
		valueIndex ++;
		update();
	}
}

function onSearch() {
	searchResult.value = binaryTree.search(parseInt(searchInput.value)) ? 'FOUND' : 'NOT_FOUND';
	searchIndex = Math.floor(DEFAULT_SEARCH_VALUES.length * Math.random());
	reset();
}

function onRemove() {
	binaryTree.remove(parseInt(removeInput.value));
	removeIndex = Math.floor(renderInOrderTraverse().split(",").length * Math.random());
	update();
}

function update() {
	reset();
	render();
}

function reset() {
	removeInput.value = renderInOrderTraverse().split(",")[removeIndex];
	searchInput.value = DEFAULT_SEARCH_VALUES[searchIndex];
	insertInput.value = DEFAULT_INPUT_VALUES[valueIndex];
}

function render() {
	inOrderTraverseInput.value = renderInOrderTraverse();
	preOrderTraverseInput.value = renderPreOrderTraverse();
	postOrderTraverseInput.value = renderPostOrderTraverse();
	minInput.value = binaryTree.min();
	maxInput.value = binaryTree.max();
	heightInput.value = binaryTree.height();
	treeContainer.innerHTML = binaryTree.render();
}

function renderInOrderTraverse() {
	let toRender = [];
	binaryTree.inOrderTraverse(function(key) {
		toRender.push(key);
	});
	return toRender.join();
}

function renderPreOrderTraverse() {
	let toRender = [];
	binaryTree.preOrderTraverse(function(key) {
		toRender.push(key);
	});
	return toRender.join();
}

function renderPostOrderTraverse() {
	let toRender = [];
	binaryTree.postOrderTraverse(function(key) {
		toRender.push(key);
	});
	return toRender.join();
}

window.onload = () => {
	treeContainer = document.querySelector("#tree-container");
	document.querySelector("#control-insert").onclick = onInsert;
	insertInput = document.querySelector("#input-insert");
	document.querySelector("#control-search").onclick = onSearch;
	searchInput = document.querySelector("#input-search");
	searchResult = document.querySelector("#input-search-result");
	inOrderTraverseInput = document.querySelector("#input-in-order-traverse");
	preOrderTraverseInput = document.querySelector("#input-pre-order-traverse");
	postOrderTraverseInput = document.querySelector("#input-post-order-traverse");
	minInput = document.querySelector("#input-min");
	maxInput = document.querySelector("#input-max");
	document.querySelector("#control-remove").onclick = onRemove;
	removeInput = document.querySelector("#input-remove");
	heightInput = document.querySelector("#input-height");
	reset();
};
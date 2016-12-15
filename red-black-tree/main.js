const INPUT_MAX_VALUE = 100;
let redBlackTree = new RedBlackTree(),
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
	randomValue = Math.floor(Math.random() * INPUT_MAX_VALUE),
	searchValue = Math.floor(Math.random() * INPUT_MAX_VALUE),
	removeIndex = 0;

function onInsert() {
	if(isNaN(insertInput.value) === false) {
		redBlackTree.insert(parseInt(insertInput.value));
		randomValue = Math.floor(Math.random() * INPUT_MAX_VALUE);
		update();
	}
}

function onSearch() {
	searchResult.value = redBlackTree.search(parseInt(searchInput.value)) ? 'FOUND' : 'NOT_FOUND';
	searchValue = Math.floor(Math.random() * INPUT_MAX_VALUE);
	reset();
}

function onRemove() {
	redBlackTree.remove(parseInt(removeInput.value));
	removeIndex = Math.floor(renderInOrderTraverse().split(",").length * Math.random());
	update();
}

function update() {
	reset();
	render();
}

function reset() {
	removeInput.value = renderInOrderTraverse().split(",")[removeIndex];
	searchInput.value = searchValue;
	insertInput.value = randomValue;
}

function render() {
	inOrderTraverseInput.value = renderInOrderTraverse();
	preOrderTraverseInput.value = renderPreOrderTraverse();
	postOrderTraverseInput.value = renderPostOrderTraverse();
	minInput.value = redBlackTree.min();
	maxInput.value = redBlackTree.max();
	heightInput.value = redBlackTree.height();
	treeContainer.innerHTML = redBlackTree.render();
}

function renderInOrderTraverse() {
	let toRender = [];
	redBlackTree.inOrderTraverse(function(key) {
		toRender.push(key);
	});
	return toRender.join();
}

function renderPreOrderTraverse() {
	let toRender = [];
	redBlackTree.preOrderTraverse(function(key) {
		toRender.push(key);
	});
	return toRender.join();
}

function renderPostOrderTraverse() {
	let toRender = [];
	redBlackTree.postOrderTraverse(function(key) {
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
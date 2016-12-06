let stack = new Stack();
let sizeInfo = null,
	emptyInfo = null,
	peekInfo = null,
	itemsContainer = null;

function onPush() {
	let value = Math.floor(Math.random() * 100);
	stack.push(value);
	update();
}

function onPop() {
	stack.pop();
	update();
}

function onClear() {
	stack.clear();
	update();
}

function update() {
	sizeInfo.value = stack.getSize();
	emptyInfo.value = stack.isEmpty();
	peekInfo.value = stack.peek();
	itemsContainer.innerHTML = getItemsInfo();
}

function getItemsInfo() {
	let values = [];
	while (stack.isEmpty() === false) {
		values.unshift(stack.pop());
	}
	values.forEach(item => stack.push(item));
	return values.map(item => "<p class=\"btn btn-primary\">" + item + "</p>").join();
}

window.onload = () => {
	sizeInfo = document.querySelector("#info-size");
	emptyInfo = document.querySelector("#info-empty");
	peekInfo = document.querySelector("#info-peek");
	itemsContainer = document.querySelector("#items-container");
	document.querySelector("#control-push").onclick = onPush;
	document.querySelector("#control-pop").onclick = onPop;
	document.querySelector("#control-clear").onclick = onClear;
};
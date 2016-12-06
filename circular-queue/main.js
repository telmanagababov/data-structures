let queue = new CircularQueue();
let sizeInfo = null,
	emptyInfo = null,
	frontInfo = null,
	itemsContainer = null;

function onEnqueue() {
	let value = Math.floor(Math.random() * 100);
	queue.enqueue(value);
	update();
}

function onDequeue() {
	queue.dequeue();
	update();
}

function onForward() {
	queue.forward();
	update();
}

function onBackward() {
	queue.backward();
	update();
}

function onClear() {
	queue.clear();
	update();
}

function update() {
	sizeInfo.value = queue.getSize();
	emptyInfo.value = queue.isEmpty();
	frontInfo.value = queue.front();
	itemsContainer.innerHTML = getItemsInfo();
}

function getItemsInfo() {
	let values = [];
	while (queue.isEmpty() === false) {
		values.push(queue.dequeue());
	}
	values.forEach(item => queue.enqueue(item));
	return values.map(item => "<p class=\"btn btn-primary\">" + item + "</p>").join();
}

window.onload = () => {
	sizeInfo = document.querySelector("#info-size");
	emptyInfo = document.querySelector("#info-empty");
	frontInfo = document.querySelector("#info-front");
	itemsContainer = document.querySelector("#items-container");
	document.querySelector("#control-enqueue").onclick = onEnqueue;
	document.querySelector("#control-dequeue").onclick = onDequeue;
	document.querySelector("#control-backward").onclick = onBackward;
	document.querySelector("#control-forward").onclick = onForward;
	document.querySelector("#control-clear").onclick = onClear;
};
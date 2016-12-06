const VALUE_MAX = 100,
	PRIORITY_MAX = 3;

let queue = new PriorityQueue();
let sizeInfo = null,
	emptyInfo = null,
	frontInfo = null,
	itemsContainer = null;

function onEnqueue() {
	let value = Math.floor(Math.random() * VALUE_MAX),
		priority = Math.floor(Math.random() * PRIORITY_MAX);
	let element = new PriorityElement(value, priority);
	queue.enqueue(element);
	update();
}

function onDequeue() {
	queue.dequeue();
	update();
}

function onClear() {
	queue.clear();
	update();
}

function update() {
	sizeInfo.value = queue.getSize();
	emptyInfo.value = queue.isEmpty();
	frontInfo.value = queue.front() ? queue.front().value : null;
	itemsContainer.innerHTML = getItemsInfo();
}

function getItemsInfo() {
	let info = "",
		values = [];
	while (queue.isEmpty() === false) {
		values.push(queue.dequeue());
	}
	values.forEach(item => queue.enqueue(item));
	for (let i = 0; i < PRIORITY_MAX; i++) {
		let itemsRow = values.filter(item => item.priority === i);
		if (itemsRow.length > 0) {
			info += i + ": " + itemsRow.map(item => "<p class=\"btn btn-primary\">" + item.value + "</p>").join() + "<br>";
		}
	}
	return info;
}

window.onload = () => {
	sizeInfo = document.querySelector("#info-size");
	emptyInfo = document.querySelector("#info-empty");
	frontInfo = document.querySelector("#info-front");
	itemsContainer = document.querySelector("#items-container");
	document.querySelector("#control-enqueue").onclick = onEnqueue;
	document.querySelector("#control-dequeue").onclick = onDequeue;
	document.querySelector("#control-clear").onclick = onClear;
};
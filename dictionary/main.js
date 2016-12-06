const MAX_VALUE = 100,
	MAX_KEY = 10,
	KEY_TEMPLATE = "key_";
let dictionary = new Dictionary();
let sizeInfo = null,
	emptyInfo = null,
	statusInfo = null,
	itemsContainer = null;

function onSet() {
	let key = KEY_TEMPLATE + Math.floor(Math.random() * MAX_KEY),
		value = Math.floor(Math.random() * MAX_VALUE);
	dictionary.set(key, value);
	update(true);
}

function onRemove() {
	let keysDictionary = dictionary.getKeys(),
		keyIndex = Math.floor(Math.random() * keysDictionary.length),
		key = keysDictionary[keyIndex];
	let status = dictionary.remove(key);
	update(status);
}

function onClear() {
	dictionary.clear();
	update(true);
}

function update(status) {
	sizeInfo.value = dictionary.getSize();
	emptyInfo.value = dictionary.getSize() === 0;
	statusInfo.value = status;
	itemsContainer.innerHTML = getItemsInfo();
}

function getItemsInfo() {
	let keys = dictionary.getKeys();
	return keys.map(key => "<div class='value'>" +
			"<p>" + key + "</p>" +
			"<p class=\"btn btn-primary\">" + dictionary.get(key) + "</p>" +
		"</div>").join("");
}

window.onload = () => {
	sizeInfo = document.querySelector("#info-size");
	emptyInfo = document.querySelector("#info-empty");
	statusInfo = document.querySelector("#info-status");
	itemsContainer = document.querySelector("#items-container");
	document.querySelector("#control-set").onclick = onSet;
	document.querySelector("#control-remove").onclick = onRemove;
	document.querySelector("#control-clear").onclick = onClear;
};
function Dictionary() {

	let items = {};

	function set(key, value) {
		items[key] = value;
	}

	function remove(key) {
		let result = false;
		if (has(key) === true) {
			delete items[key];
			result = true;
		}
		return result;
	}

	function has(key) {
		return items.hasOwnProperty(key);
	}

	function get(key) {
		return items[key];
	}

	function clear() {
		items = {};
	}

	function getSize() {
		return getValues().length;
	}

	function getKeys() {
		return Object.keys(items);
	}

	function getValues() {
		return Object.keys(items).map(key => items[key]);
	}

	return {
		set: set,
		remove: remove,
		has: has,
		get: get,
		clear: clear,
		getSize: getSize,
		getKeys: getKeys,
		getValues: getValues
	}
}
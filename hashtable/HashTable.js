function HashTable() {

	let table = [];

	function put(key, value) {
		let position = getHash(key);
		table[position] = value;
	}

	function remove(key) {
		let position = getHash(key);
		table[position] = undefined;
	}

	function get(key) {
		let position = getHash(key);
		return table[position];
	}

	function clear() {
		table = [];
	}

	function getHash(key) {
		let hash = 5381;
		for (let i = 0; i < key.length; i++) {
			hash = hash * 33 + key.charCodeAt(i);
		}
		return hash % 1013;
	}

	return {
		put: put,
		remove: remove,
		get: get,
		getHash: getHash,
		clear: clear
	}
}
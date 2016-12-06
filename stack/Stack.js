function Stack() {

	let data = [];

	function push(value) {
		data.push(value);
	}

	function pop() {
		return data.pop();
	}

	function peek() {
		return data[data.length - 1];
	}

	function getSize() {
		return data.length;
	}

	function isEmpty() {
		return data.length === 0;
	}

	function clear() {
		data = [];
	}

	return {
		push: push,
		pop: pop,
		peek: peek,
		getSize: getSize,
		isEmpty: isEmpty,
		clear: clear
	}
}
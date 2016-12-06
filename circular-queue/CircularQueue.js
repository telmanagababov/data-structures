function CircularQueue() {

	let data = [];

	function enqueue(value) {
		data.push(value);
	}

	function dequeue() {
		return data.shift();
	}

	function forward() {
		if (data.length > 0) {
			data.unshift(data.pop());
		}
	}

	function backward() {
		if (data.length > 0) {
			data.push(data.shift());
		}
	}

	function clear() {
		data = [];
	}

	function front() {
		return data[0];
	}

	function isEmpty() {
		return data.length === 0;
	}

	function getSize() {
		return data.length;
	}

	return {
		enqueue: enqueue,
		dequeue: dequeue,
		forward: forward,
		backward: backward,
		clear: clear,
		front: front,
		isEmpty: isEmpty,
		getSize: getSize
	}
}
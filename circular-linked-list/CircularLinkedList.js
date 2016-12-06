function CircularLinkedList() {

	let size = 0,
		head = null;

	function append(element) {
		insert(size, element);
	}

	function insert(position, element) {
		let node = new Node(element);
		let index = 0,
			previous = null,
			current = head;
		if (position === 0) {
			node.next = head;
			head = node;
			if (size > 0) {
				let tail = getLastItem();
				tail.next = head;
			}
		} else {
			while (index < position) {
				previous = current;
				current = current.next;
				index++;
			}
			if (position === size) {
				node.next = head;
			} else {
				node.next = current
			}
			previous.next = node;
		}
		size++;
	}

	function remove(element) {
		let index = indexOf(element);
		removeAt(index, element);
	}

	function removeAt(position) {
		let index = 0,
			previous = null,
			current = head;
		if (position === 0) {
			if (size > 1) {
				head = head.next;
			} else {
				head = null;
			}
		} else {
			while (index < position) {
				previous = current;
				current = current.next;
				index++;
			}
			if (position === size) {
				previous.next = head;
			} else {
				previous.next = current;
			}
		}
		size--;
		return current.element;
	}

	function indexOf(element) {
		let index = -1,
			current = head;
		while (index < size && current.element !== element) {
			current = current.next;
			index++;
		}
		return index;
	}

	function isEmpty() {
		return head === null;
	}

	function getSize() {
		return size;
	}

	function getHead() {
		return head;
	}

	function toString() {
		let values = [],
			current = head;
		while (current !== null) {
			values.push(current.element);
			current = current.next;
		}
		return values.join();
	}

	function getLastItem() {
		let current = head;
		while (current.next !== null && current.next !== head) {
			current = current.next;
		}
		return current;
	}

	return {
		append: append,
		insert: insert,
		remove: remove,
		removeAt: removeAt,
		indexOf: indexOf,
		isEmpty: isEmpty,
		getSize: getSize,
		getHead: getHead,
		toString: toString
	}
}
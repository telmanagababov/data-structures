function BinaryTree() {

	let root = null;

	function insert(key) {
		let node = new Node(key);
		if(isDefined(root) === false) {
			root = node;
		} else {
			insertNode(root, node);
		}
	}

	function insertNode(parentNode, node) {
		if(node.key > parentNode.key) {
			if(isDefined(parentNode.right)) {
				insertNode(parentNode.right, node);
			} else {
				parentNode.right = node;
			}
		} else {
			if(isDefined(parentNode.left)) {
				insertNode(parentNode.left, node);
			} else {
				parentNode.left = node;
			}
		}
	}
	
	function inOrderTraverse(callback) {
		inOrderTraverseNode(root, callback);
	}

	function inOrderTraverseNode(node, callback) {
		if(isDefined(node) === true) {
			inOrderTraverseNode(node.left, callback);
			callback(node.key);
			inOrderTraverseNode(node.right, callback);
		}
	}

	function preOrderTraverse(callback) {
		preOrderTraverseNode(root, callback);
	}

	function preOrderTraverseNode(node, callback) {
		if(isDefined(node) === true) {
			callback(node.key);
			preOrderTraverseNode(node.left, callback);
			preOrderTraverseNode(node.right, callback);
		}
	}

	function postOrderTraverse(callback) {
		postOrderTraverseNode(root, callback);
	}

	function postOrderTraverseNode(node, callback) {
		if(isDefined(node) === true) {
			postOrderTraverseNode(node.left, callback);
			postOrderTraverseNode(node.right, callback);
			callback(node.key);
		}
	}

	function min() {
		let node = minNode(root);
		return node ? node.key : node;
	}

	function minNode(node) {
		if(isDefined(node) === false) {
			return null;
		} else if(isDefined(node.left) === true) {
			return minNode(node.left);
		} else {
			return node;
		}
	}

	function max() {
		let node = maxNode(root);
		return node ? node.key : node;
	}

	function maxNode(node) {
		if(isDefined(node) === false) {
			return null;
		} else if(isDefined(node.right) === true) {
			return maxNode(node.right);
		} else {
			return node;
		}
	}

	function height() {
		return heightNode(root);
	}

	function heightNode(node) {
		if(isDefined(node) === false) {
			return 0;
		} else {
			return 1 + Math.max(heightNode(node.left), heightNode(node.right));
		}
	}

	function search(key) {
		return searchNode(root, key);
	}

	function searchNode(node, key) {
		if(isDefined(node) === false) {
			return false;
		} else if(key === node.key) {
			return true;
		} else if(key > node.key) {
			return searchNode(node.right, key);
		} else if(key < node.key) {
			return searchNode(node.left, key);
		}
	}

	function remove(key) {
		root = removeNode(root, key);
	}

	function removeNode(node, key) {
		if(isDefined(node) === false) {
			return null;
		} else if(key < node.key) {
			node.left = removeNode(node.left, key);
			return node;
		} else if(key > node.key) {
			node.right = removeNode(node.right, key);
			return node;
		} else if(isDefined(node.left) === false && isDefined(node.right) === false) {
			node = null;
			return node;
		} else if(isDefined(node.left) === false) {
			node = node.right;
			return node;
		} else if(isDefined(node.right) === false) {
			node = node.left;
			return node;
		} else {
			let newParentNode = minNode(node.right);
			node.key = newParentNode.key;
			node.right = removeNode(node.right, newParentNode.key);
			return node;
		}
	}

	function isDefined(value) {
		return value !== null && value !== undefined;
	}

	function render() {
		let renderTraverseNode = function(node, level, data) {
			if(isDefined(node) === true) {
				if(isDefined(data[level]) === false) {
					data[level] = [];
				}
				data[level].push(node.render());
				data = renderTraverseNode(node.left, level + 1, data);
				data = renderTraverseNode(node.right, level + 1, data);
			}
			return data;
		};
		return '<div class="tree">' +
				renderTraverseNode(root, 0, []).map(level => level.join("") + "<br>").join("") +
			'</div>';
	}

	return {
		insert: insert,
		inOrderTraverse: inOrderTraverse,
		preOrderTraverse: preOrderTraverse,
		postOrderTraverse: postOrderTraverse,
		min: min,
		max: max,
		height: height,
		search: search,
		remove: remove,
		render: render
	}
}
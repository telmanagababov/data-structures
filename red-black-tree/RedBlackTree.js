function RedBlackTree() {

	let root = null;

	function insert(key) {
		let node = new Node(key);
		if(isValidNode(root) === false) {
			root = node;
		} else {
			insertNode(root, node);
		}
		fixupInsertion(node);
	}

	function insertNode(parentNode, node) {
		if(node.key > parentNode.key) {
			if(isValidNode(parentNode.right) === true) {
				insertNode(parentNode.right, node);
			} else {
				parentNode.right = node;
				node.parent = parentNode;
			}
		} else {
			if(isValidNode(parentNode.left) === true) {
				insertNode(parentNode.left, node);
			} else {
				parentNode.left = node;
				node.parent = parentNode;
			}
		}
	}

	function fixupInsertion(node){
		while(isValidNode(node.parent) && isValidNode(node.parent.parent) && node.parent.red === true) {
			let uncle = null;
			if(isLeftChild(node.parent) === true) {
				uncle = node.parent.parent.right;
				if(uncle.red === true) {
					uncle.red = false;
					node.parent.red = false;
					node.parent.parent.red = true;
					node = node.parent.parent
				} else {
					if(isRightChild(node) === true) {
						node = node.parent;
						rotateLeft(node);
					}
					node.parent.red = false;
					node.parent.parent.red = true;
					rotateRight(node.parent.parent);
				}
			} else if(isRightChild(node.parent) === true) {
				uncle = node.parent.parent.left;
				if (uncle.red === true) {
					uncle.red = false;
					node.parent.red = false;
					node.parent.parent.red = true;
					node = node.parent.parent
				} else {
					if(isLeftChild(node) === true) {
						node = node.parent;
						rotateRight(node);
					}
					node.parent.red = false;
					node.parent.parent.red = true;
					rotateLeft(node.parent.parent);
				}
			}
		}
		root.red = false;
	}
	
	function inOrderTraverse(callback) {
		inOrderTraverseNode(root, callback);
	}

	function inOrderTraverseNode(node, callback) {
		if(isValidNode(node) === true) {
			inOrderTraverseNode(node.left, callback);
			callback(node.key);
			inOrderTraverseNode(node.right, callback);
		}
	}

	function preOrderTraverse(callback) {
		preOrderTraverseNode(root, callback);
	}

	function preOrderTraverseNode(node, callback) {
		if(isValidNode(node) === true) {
			callback(node.key);
			preOrderTraverseNode(node.left, callback);
			preOrderTraverseNode(node.right, callback);
		}
	}

	function postOrderTraverse(callback) {
		postOrderTraverseNode(root, callback);
	}

	function postOrderTraverseNode(node, callback) {
		if(isValidNode(node) === true) {
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
		if(isValidNode(node) === false) {
			return null;
		} else if(isValidNode(node.left) === true) {
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
		if(isValidNode(node) === false) {
			return null;
		} else if(isValidNode(node.right) === true) {
			return maxNode(node.right);
		} else {
			return node;
		}
	}

	function height() {
		return heightNode(root);
	}

	function heightNode(node) {
		if(isValidNode(node) === false) {
			return 0;
		} else {
			return 1 + Math.max(heightNode(node.left), heightNode(node.right));
		}
	}

	function search(key) {
		return searchNode(root, key) !== null;
	}

	function searchNode(node, key) {
		if(isValidNode(node) === false) {
			return null;
		} else if(key === node.key) {
			return node;
		} else if(key > node.key) {
			return searchNode(node.right, key);
		} else if(key < node.key) {
			return searchNode(node.left, key);
		}
	}

	function remove(key) {
		// root = removeNode(root, key);
		let node = searchNode(root, key);
		if(isValidNode(node) === true) {
			let rootNode = null,
				replaceNode = null;
			if (isValidNode(node.left) === false || isValidNode(node.right) === false) {
				rootNode = node;
			} else {
				rootNode = treeSuccessor(node);
			}
			if (isValidNode(rootNode.left) === true) {
				replaceNode = rootNode.left;
			} else {
				replaceNode = rootNode.right;
			}
			replaceNode.parent = rootNode.parent;
			if (isValidNode(rootNode.parent) === false) {
				root = replaceNode;
			} else if (isLeftChild(rootNode) === true) {
				rootNode.parent.left = replaceNode;
			} else {
				rootNode.parent.right = replaceNode;
			}
			if (rootNode !== node) {
				node.key = rootNode.key;
			}
			if (rootNode.red === false) {
				deleteFixup(replaceNode);
			}
		}
	}

	function treeSuccessor (node) {
		if (isValidNode(node) === true && isValidNode(node.right) === true) {
			return treeMinimum(node.right);
		}
		let successor = node.parent;
		while (isValidNode(successor) === true && node === successor) {
			node = successor;
			successor = node.parent;
		}
		return successor;
	}

	function treeMinimum (node) {
		while (isValidNode(node) === true && isValidNode(node.left) === true) {
			node = node.left;
		}
		return node;
	}

	function removeNode(node, key) {
		let rootNode = null;
		if(isValidNode(node) === false) {
			node = null;
		} else if(key < node.key) {
			node.left = removeNode(node.left, key);
			rootNode = node.left;
		} else if(key > node.key) {
			node.right = removeNode(node.right, key);
			rootNode = node.right;
		} else if(isValidNode(node.left) === false && isValidNode(node.right) === false) {
			node = null;
		} else if(isValidNode(node.left) === false) {
			rootNode = node.right;
			node = node.right;
		} else if(isValidNode(node.right) === false) {
			rootNode = node.left;
			node = node.left;
		} else {
			let newParentNode = minNode(node.right);
			node.key = newParentNode.key;
			node.right = removeNode(node.right, newParentNode.key);
			rootNode = node.right;
		}
		if(isValidNode(rootNode) === true) {
			node.parent = rootNode.parent;
		}
		return node;
	}

	function rotateLeft(node) {
		let childNode = node.right;
		node.right = childNode.left;
		if(isValidNode(childNode.left) === true) {
			childNode.left.parent = node;
		}
		childNode.parent = node.parent;
		if(isValidNode(node.parent) === false) {
			root = childNode;
		} else if(isLeftChild(node) === true) {
			node.parent.left = childNode;
		} else {
			node.parent.right = childNode;
		}
		childNode.left = node;
		node.parent = childNode;
	}

	function deleteFixup(node) {
		while (node !== root && node.red === false) {
			let updateNode;
			if (isLeftChild(node) === true) {
				updateNode = node.parent.right;
				if(updateNode.red === true) {
					updateNode.red = false;
					node.parent.red = true;
					rotateLeft(node.parent);
				}
				if (updateNode.left.red === false && updateNode.right.red === false) {
					updateNode.red = true;
					node = node.parent;
				} else {
					if (updateNode.right.red === false) {
						updateNode.left.red = false;
						updateNode.left.red = true;
						rotateRight(updateNode);
						updateNode = node.parent.right;
					}
					updateNode.red = node.parent.red;
					node.parent.red = false;
					updateNode.right.red = false;
					rotateLeft(node.parent);
					node = root;
				}
			} else {
				updateNode = node.parent.left;
				if (updateNode.red === true) {
					updateNode.red = false;
					node.parent.red = true;
					rotateRight(node.parent);
				}
				if (updateNode.right.red === false && updateNode.left.red === false) {
					updateNode.red = true;
					node = node.parent;
				} else {
					if (updateNode.left.red === false) {
						updateNode.right.red = false;
						updateNode.red = true;
						rotateLeft(updateNode);
						updateNode = node.parent.left;
					}
					updateNode.red = node.parent.red;
					node.parent.red = false;
					updateNode.left.red = false;
					rotateRight(node.parent);
					node = root;
				}
			}
		}
		node.red = false;
	}

	function rotateRight(node) {
		let childNode = node.left;
		node.left = childNode.right;
		if(isValidNode(childNode.right) === true) {
			childNode.right.parent = node;
		}
		childNode.parent = node.parent;
		if(isValidNode(node.parent) === false) {
			root = childNode;
		} else if(isLeftChild(node) === true) {
			node.parent.left = childNode;
		} else {
			node.parent.right = childNode;
		}
		childNode.right = node;
		node.parent = childNode;
	}

	function isLeftChild(node) {
		return node === node.parent.left;
	}

	function isRightChild(node) {
		return node === node.parent.right;
	}

	function isValidNode(node) {
		return isDefined(node) === true && node instanceof Node;
	}

	function isDefined(value) {
		return value !== null && value !== undefined;
	}

	function render() {
		let renderTraverseNode = function(node, level, data) {
			if(isValidNode(node) === true) {
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
function Node(key) {
	this.key = key;
	this.left = null;
	this.right = null;

	this.render = function() {
		return '<div class="node">' + this.key + '</div>';
	}
}
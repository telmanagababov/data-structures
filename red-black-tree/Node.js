function Node(key) {
	this.key = key;
	this.parent = null;
	this.left = new Leaf();
	this.right = new Leaf();
	this.red = true;

	this.render = function() {
		let color = this.red === true ? 'red' : 'black';
		return '<div class="node ' + color + '">' + this.key + '</div>';
	}
}
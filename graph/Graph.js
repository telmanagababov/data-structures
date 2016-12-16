function Graph() {

	let vertices = [],
		connections = {};

	function addVertex(type) {
		vertices.push(type);
		connections[type] = [];
	}
	
	function addEdge(v, w) {
		if(connections[v].indexOf(w) === -1) {
			connections[v].push(w);
			connections[w].push(v);
		}
	}

	function getVertices() {
		return vertices;
	}
	
	function traverse(rootVertex, callback) {
		let colors = getDefaultColors(),
			executionQueue = [rootVertex];
		while(executionQueue.length > 0) {
			let vertex = executionQueue.shift(),
				neighbourVertexes = connections[vertex] || [];
			colors[vertex] = 'grey';
			neighbourVertexes.forEach(neighbourVertex => {
				if(colors[neighbourVertex] === 'white') {
					colors[neighbourVertex] = 'grey';
					executionQueue.push(neighbourVertex);
				}
			});
			colors[vertex] = 'black';
			callback(vertex);
		}
	}
	
	function getDefaultColors() {
		let colors = {};
		vertices.forEach(vertex => colors[vertex] = 'white');
		return colors;
	}

	function getPaths(rootVertex) {
		let colors = getDefaultColors(),
			distances = getDefaultDistances(),
			predecessors = getDefaultPredecessors(),
			executionQueue = [rootVertex];
		while(executionQueue.length > 0) {
			let vertex = executionQueue.shift(),
				neighbourVertexes = connections[vertex] || [];
			colors[vertex] = 'grey';
			neighbourVertexes.forEach(neighbourVertex => {
				if(colors[neighbourVertex] === 'white') {
					colors[neighbourVertex] = 'grey';
					distances[neighbourVertex] = distances[vertex] + 1;
					predecessors[neighbourVertex] = vertex;
					executionQueue.push(neighbourVertex);
				}
			});
			colors[vertex] = 'black';
		}
		return {
			distances: toValid(distances),
			predecessors: toValid(predecessors)
		};
	}

	function getDefaultDistances() {
		let distances = {};
		vertices.forEach(vertex => distances[vertex] = 0);
		return distances;
	}

	function getDefaultPredecessors() {
		let predecessors = {};
		vertices.forEach(vertex => predecessors[vertex] = null);
		return predecessors;
	}

	function toValid(dictionary) {
		Object.keys(dictionary).forEach(key => {
			if(dictionary[key] === null || dictionary[key] === undefined || dictionary[key] === 0) {
				delete dictionary[key];
			}
		});
		return dictionary;
	}

	function render() {
		return vertices.map(vertex =>
			'<p>' +
				vertex + ' > ' + (connections[vertex] ? connections[vertex].join(' ') : '') +
			'</p>'
		).join('');
	}

	return {
		addVertex: addVertex,
		addEdge: addEdge,
		getVertices: getVertices,
		traverse: traverse,
		getPaths: getPaths,
		render: render
	}
}
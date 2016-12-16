const ROOT_VERTEX = 'A',
	DEFAULT_VERTICES_NUM = 2;
let graph = new Graph(),
	representationContainer = null,
	pathsContainer = null,
	pathsVertexSelect = null,
	addVertexInput = null,
	addEdgeInput = null;
let currentVertexType = ROOT_VERTEX;

function addVertex() {
	graph.addVertex(currentVertexType);
	currentVertexType = String.fromCharCode(currentVertexType.charCodeAt(0) + 1);
	update();
}

function addEdge() {
	let edgeVertices = addEdgeInput.value.split(':');
	graph.addEdge(edgeVertices[0], edgeVertices[1]);
	update();
}

function update() {
	reset();
	render();
}

function reset() {
	let vertices = graph.getVertices();
	if(vertices.length > 1) {
		addEdgeInput.value = vertices.slice(vertices.length - 2).join(':');
	}
	setSelectValues(pathsVertexSelect, vertices);
	addVertexInput.value = currentVertexType
}

function setSelectValues(select, values) {
	let currentValue = select.value;
	select.innerHTML = '';
	for (let i = 0; i < values.length; i++) {
		let option = document.createElement('option');
		option.value = option.text = values[i];
		select.appendChild(option);
	}
	if(currentValue !== '') {
		select.value = currentValue;
	}
}

function render() {
	representationContainer.innerHTML = graph.render();
	pathsContainer.innerHTML = renderPaths(pathsVertexSelect.value);
}

function renderPaths(rootVertex) {
	let toRender = [],
		paths = graph.getPaths(rootVertex),
		distances = paths.distances,
		predecessors = paths.predecessors,
		vertices = Object.keys(distances);
	vertices.forEach(vertex => {
		let path = [];
		while(vertex !== rootVertex) {
			path.push(vertex);
			vertex = predecessors[vertex];
		}
		if(path.length > 0) {
			toRender.push(rootVertex + ' - ' + path.reverse().join(' - '))
		}
	});
	return toRender.join('<br>');
}

window.onload = () => {
	representationContainer = document.querySelector('#graph-representation');
	pathsContainer = document.querySelector('#graph-paths');
	pathsVertexSelect = document.querySelector('#graph-paths-select');
	addVertexInput = document.querySelector('#input-add-vertex');
	addEdgeInput = document.querySelector('#input-add-edge');

	document.querySelector('#control-add-vertex').onclick = addVertex;
	document.querySelector('#control-add-edge').onclick = addEdge;
	pathsVertexSelect.onchange = render;
	reset();
	for(let i = 0; i < DEFAULT_VERTICES_NUM; i++) {
		addVertex();
	}
};
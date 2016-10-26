const MAX_VALUE = 100;

let list = new CircularLinkedList();
let sizeInfo = null,
    emptyInfo = null,
    headInfo = null,
    itemsContainer = null;

function onAppend() {
    let value = Math.floor(Math.random() * MAX_VALUE);
    list.append(value);
    update();
}

function onRemove() {
    if(list.isEmpty() === false) {
        list.removeAt(list.getSize() - 1);
    }
    update();
}

function onClear() {
    while(list.isEmpty() === false) {
        list.removeAt(0);
    }
    update();
}

function update() {
    sizeInfo.value = list.getSize();
    emptyInfo.value = list.isEmpty();
    headInfo.value = list.getHead() ? list.getHead().element : null;
    itemsContainer.innerHTML = getItemsInfo();
}

function getItemsInfo() {
    let values = [];
    while(list.isEmpty() === false) {
        values.push(list.removeAt(0));
    }
    values.forEach(item => list.append(item));
    return values.map(item => "<p class=\"btn btn-primary\">" + item + "</p>").join();
}

window.onload = () => {
    sizeInfo = document.querySelector("#info-size");
    emptyInfo = document.querySelector("#info-empty");
    headInfo = document.querySelector("#info-head");
    itemsContainer = document.querySelector("#items-container");
    document.querySelector("#control-append").onclick = onAppend;
    document.querySelector("#control-remove").onclick = onRemove;
    document.querySelector("#control-clear").onclick = onClear;
};
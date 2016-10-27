const MAX_VALUE = 10;
let set = new HashTable();
let sizeInfo = null,
    emptyInfo = null,
    statusInfo = null,
    itemsContainer = null;

function onAdd() {
    let value = Math.floor(Math.random() * MAX_VALUE);
    let status = set.add(value);
    update(status);
}

function onRemove() {
    let itemsSet = set.getValues(),
        itemIndex = Math.floor(Math.random() * itemsSet.length),
        item = itemsSet[itemIndex];
    let status = set.remove(item);
    update(status);
}

function onClear() {
    set.clear();
    update(true);
}

function update(status) {
    sizeInfo.value = set.getSize();
    emptyInfo.value = set.getSize() === 0;
    statusInfo.value = status;
    itemsContainer.innerHTML = getItemsInfo();
}

function getItemsInfo() {
    let values = set.getValues();
    return values.map(item => "<p class=\"btn btn-primary\">" + item + "</p>").join();
}

window.onload = () => {
    sizeInfo = document.querySelector("#info-size");
    emptyInfo = document.querySelector("#info-empty");
    statusInfo = document.querySelector("#info-status");
    itemsContainer = document.querySelector("#items-container");
    document.querySelector("#control-add").onclick = onAdd;
    document.querySelector("#control-remove").onclick = onRemove;
    document.querySelector("#control-clear").onclick = onClear;
};
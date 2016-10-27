const MAX_VALUE = 100,
    MAX_KEY = 25,
    KEY_TEMPLATE = "key_";
let dictionary = new HashTable(),
    keys = [];
let itemsContainer = null;

function onPut() {
    let key = KEY_TEMPLATE + Math.floor(Math.random() * MAX_KEY),
        value = Math.floor(Math.random() * MAX_VALUE);
    if(keys.indexOf(key) === -1) {
        keys.push(key);
    }
    dictionary.put(key, value);
    update();
}

function onRemove() {
    if(keys.length > 0) {
        let keyIndex = Math.floor(Math.random() * keys.length),
            key = keys.splice(keyIndex, 1)[0];
        dictionary.remove(key);
        update();
    }
}

function onClear() {
    dictionary.clear();
    keys = [];
    update();
}

function update() {
    itemsContainer.innerHTML = getItemsInfo();
}

function getItemsInfo() {
    return keys.map(key => "<div class='value'>" +
                "<p>" + key + "</p>" +
                "<p>" + dictionary.getHash(key) + "</p>" +
                "<p class=\"btn btn-primary\">" + dictionary.get(key) + "</p>" +
            "</div>").join("");
}

window.onload = () => {
    itemsContainer = document.querySelector("#items-container");
    document.querySelector("#control-put").onclick = onPut;
    document.querySelector("#control-remove").onclick = onRemove;
    document.querySelector("#control-clear").onclick = onClear;
};
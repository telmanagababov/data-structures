function Queue() {

    let data = [];

    function enqueue(value) {
        data.push(value);
    }

    function dequeue() {
        return data.shift();
    }

    function clear() {
        data = [];
    }

    function front() {
        return data[0];
    }

    function isEmpty() {
        return data.length === 0;
    }

    function getSize() {
        return data.length;
    }

    return {
        enqueue: enqueue,
        dequeue: dequeue,
        clear: clear,
        front: front,
        isEmpty: isEmpty,
        getSize: getSize
    }
}
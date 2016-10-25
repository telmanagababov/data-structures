function PriorityQueue() {

    let data = [];

    function enqueue(element) {
        let i = 0;
        while(i < data.length && element.priority >= data[i].priority) {
            i++;
        }
        data.splice(i, 0, element);
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
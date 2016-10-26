function LinkedList() {

    let size = 0,
        head = null;

    function append(element) {
        let node = new Node(element);
        if(head === null) {
            head = node;
        } else {
            getLastItem().next = node;
        }
        size++;
    }

    function insert(position, element) {
        let node = new Node(element);
        let index = 0,
            previous = null,
            current = head;
        if(position === 0) {
            node.next = current;
            head = node;
        } else {
            while(index < position) {
                previous = current;
                current = current.next;
                index++;
            }
            node.next = current;
            previous.next = node;
        }
        size++;
    }

    function remove(element) {
        let index = indexOf(element);
        removeAt(index, element);
    }

    function removeAt(position) {
        let index = 0,
            previous = null,
            current = head;
        if(position === 0) {
            head = current.next;
        } else {
            while(index < position) {
                previous = current;
                current = current.next;
                index++;
            }
            previous.next = current.next;
        }
        size--;
        return current.element;
    }

    function indexOf(element) {
        let index = -1,
            current = head;
        while(index < size && current.element !== element) {
            current = current.next;
            index++;
        }
        return index;
    }

    function isEmpty() {
        return head === null;
    }

    function getSize() {
        return size;
    }

    function getHead() {
        return head;
    }

    function getLastItem() {
        let current = head;
        while(current.next !== null) {
            current = current.next;
        }
        return current;
    }

    function toString() {
        let values = [],
            current = head;
        while(current !== null) {
            values.push(current.element);
            current = current.next;
        }
        return values.join();
    }

    return {
        append: append,
        insert: insert,
        remove: remove,
        removeAt: removeAt,
        indexOf: indexOf,
        isEmpty: isEmpty,
        getSize: getSize,
        getHead: getHead,
        toString: toString
    }
}
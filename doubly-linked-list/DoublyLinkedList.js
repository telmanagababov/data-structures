function DoublyLinkedList() {

    let size = 0,
        head = null,
        tail = null;

    function append(element) {
        insert(size, element);
    }

    function insert(position, element) {
        let node = new Node(element);
        let index = 0,
            previous = null,
            current = head;
        if(head === null) {
            head = node;
            tail = node;
        } else if(position === 0) {
            node.next = head;
            head.prev = node;
            head = node;
        } else if(position === size) {
            node.prev = tail;
            tail.next = node;
            tail = node;
        } else {
            while(index < position) {
                previous = current;
                current = current.next;
                index++;
            }
            node.prev = previous;
            node.next = current;
            previous.next = node;
            current.prev = node;
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
            if(size === 1) {
                tail = null;
            } else {
                head.prev = null;
            }
        } else if(position === size - 1) {
            current = tail;
            tail = tail.prev;
            tail.next = null;
        } else {
            while(index < position) {
                previous = current;
                current = current.next;
                index++;
            }
            previous.next = current.next;
            current.next.prev = previous;
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

    function getTail() {
        return tail;
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
        getTail: getTail,
        toString: toString
    }
}
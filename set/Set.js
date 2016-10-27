function Set() {

    let items = {};

    function add(value) {
        let result = false;
        if(has(value) === false) {
            items[value] = value;
            result = true;
        }
        return result;
    }
    
    function remove(value) {
        let result = false;
        if(has(value) === true) {
            delete items[value];
            result = true;
        }
        return result;
    }
    
    function has(value) {
        return items.hasOwnProperty(value);
    }
    
    function clear() {
        items = {};
    }

    function getSize() {
        return getValues().length;
    }

    function getValues() {
        return Object.keys(items);
    }

    function union(set) {
        let unionSet = new Set();
        getValues().forEach(item => {
            unionSet.add(item);
        });
        set.getValues().forEach(item => {
            unionSet.add(item);
        });
        return unionSet;
    }

    function intersection(set) {
        let intersectionSet = new Set();
        getValues().forEach(item => {
            if(set.has(item) === true) {
                intersectionSet.add(item);
            }
        });
        set.getValues().forEach(item => {
            if(has(item) === true) {
                intersectionSet.add(item);
            }
        });
        return intersectionSet;
    }

    function difference(set) {
        let differenceSet = new Set();
        getValues().forEach(item => {
            if(set.has(item) === false) {
                differenceSet.add(item);
            }
        });
        set.getValues().forEach(item => {
            if(has(item) === false) {
                differenceSet.add(item);
            }
        });
        return differenceSet;
    }

    return {
        add: add,
        remove: remove,
        has: has,
        clear: clear,
        getSize: getSize,
        getValues: getValues,
        union: union,
        intersection: intersection,
        difference: difference
    }
}
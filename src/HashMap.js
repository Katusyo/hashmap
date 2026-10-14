import Node from "./Node.js";

class HashMap {
    constructor() {
        this.buckets = new Array(16);
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        
        const index = hashCode % this.buckets.length;
        
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        return index;
    }

    set(key, value) {
        const index = this.hash(key);
        const newNode = new Node(key, value);
        
        let current = this.buckets[index];
        while (current) {
            if (current.key === key) {
                current.value = value;
                return;
            }
            current = current.next;
        }

        if ((this.length() + 1) / this.buckets.length > this.loadFactor) {
            this.resize();
        }

        const newIndex = this.hash(key);

        newNode.next = this.buckets[newIndex];
        this.buckets[newIndex] = newNode;
    }

    resize() {
        const oldBuckets = this.buckets;

        this.buckets = new Array(oldBuckets.length * 2);

        for (let i = 0; i < oldBuckets.length; i++) {
            let current = oldBuckets[i];

            while (current) {
                const nextNode = current.next;
                const newIndex = this.hash(current.key);

                current.next = this.buckets[newIndex];
                this.buckets[newIndex] = current;

                current = nextNode;
            }
        }
    }
    

    get(key) {
        const index = this.hash(key);
        let current = this.buckets[index];
        while (current) {
            if (current.key === key) {
                return current.value;
            }
            current = current.next;
        }
        return undefined;
    }

    has(key) {
        return this.get(key) !== undefined;
    }

    remove(key) {
        const index = this.hash(key);
        let current = this.buckets[index];
        let prev = null;

        while (current) {
            if (current.key === key) {
                if (prev === null) {
                    this.buckets[index] = current.next;
                } else {
                    prev.next = current.next;
                }
                return true;
            }
            prev = current;
            current = current.next;
        }
        return false;
    }

    length() {
        let count = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            while (current) {
                count++;
                current = current.next;
            }
        }
        return count;
    }

    clear() {
        this.buckets = new Array(16);
    }

    keys() {
        const keysArray = [];
        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            while (current) {
                keysArray.push(current.key);
                current = current.next;
            }
        }
        return keysArray;
    }

    values() {
        const valuesArray = [];
        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            while (current) {
                valuesArray.push(current.value);
                current = current.next;
            }
        }
        return valuesArray;
    }

    entries() {
        const entriesArray = [];
        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            while (current) {
                entriesArray.push([current.key, current.value]);
                current = current.next;
            }
        }
        return entriesArray;
    }

}

export default HashMap;
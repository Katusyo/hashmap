import SetNode from "./SetNode.js";

class HashSet {
    constructor() {
        this.buckets = new Array(16);
        this.loadFactor = 0.75;
    }
    
    add(key) {
        const index = this.hash(key);
        const newNode = new SetNode(key);

        let current = this.buckets[index];
        while (current) {
            if (current.key === key) {
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

    has(key) {
        const index = this.hash(key);
        let current = this.buckets[index];

        while (current) {
            if (current.key === key) {
                return true;
            }
            current = current.next;
        }

        return false;
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
}

export default HashSet;
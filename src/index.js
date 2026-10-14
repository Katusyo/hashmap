import HashMap from "./HashMap.js";
import HashSet from "./HashSet.js";


const test = new HashMap();

test.set("apple", 'red');
test.set("banana", 'yellow');
test.set("carrot", 'orange');
test.set("dog", 'brown');
test.set("elepant", 'gray');
test.set("frog", 'green');
test.set("grape", 'purple');
test.set("hat", 'black');
test.set("ice crea,", 'white');
test.set("jacket", 'blue');
test.set("kite", 'pink');
test.set("lion", 'golden');
test.set("moon", 'silver');

test.set("apple", 'green'); // should update value for "apple"
test.set("dog", 'black'); //should update value for "dog"

console.assert(test.get("apple") === 'green', "Apple should remain available after resizing");

console.log(test.keys());
console.log(test.values());

console.log("Entries:", test.entries());
console.log("After updating apple:");
console.log("Entries:", test.entries());

console.assert(test.length() ===13, "Should contain 13 entries");
console.assert(test.buckets.length === 32, "Capacity should double from 16 to 32");
console.assert(test.get("apple") === "green", "Apple should remain accessible after resizing");
console.assert(test.get("moon") === "silver", "Moon should remain accessible after resizing");

const before = test.length();
test.remove("apple");
console.assert(test.length() === before - 1);
console.assert(test.get("banana") === 'yellow');

console.log("Before clear:");
console.log("Length:", test.length());
console.assert(test.buckets.length > 16, "Buckets should have resized to a larger size");

console.assert(test.get("moon") === 'silver', "Moon should remain available after resizing");

console.assert(test.get("banana") === 'yellow', "Banana should remain available after resizing");

console.assert(test.buckets.length > 16, "Buckets should have resized to a larger size");

console.assert(test.get("pineapple") === undefined);
console.assert(test.has("lion") === true);

console.assert(test.keys().includes("banana"));
console.assert(test.values().includes("yellow"));
console.assert(test.entries().some(([key, value]) => key === "banana" && value === "yellow"));

test.clear();

console.log("After clear:");
console.log("Length:", test.length());   // should return 0
console.log("Apple:", test.get("apple")); // should return undefined
console.log("Has banana:", test.has("banana")); // should return false
console.log("Bucket count:", test.buckets.length); // should return 16

console.assert(test.keys().length === 0);
console.assert(test.values().length === 0);
console.assert(test.entries().length === 0);

console.log("New entries after clear:");
test.set("grape", 'green');

console.log("Grape:", test.get("grape")); // should return 'green'
console.log("Length:", test.length()); // should return 1

const seen = new Map();
let collision = null;

for (let i = 0; i < 100; i++) {
    const key = `key${i}`;
    const index = test.hash(key);

    if (seen.has(index)) {
        collision = [seen.get(index), key, index];
        break;
    }
    seen.set(index, key);
}

console.log("Collision found:", collision);

if (collision) {
    const [key1, key2, index] = collision;

    test.set(key1, 100);
    test.set(key2, 200);

    console.assert(test.remove(key1) === true); 
    console.assert(test.has(key1) === false);
    console.assert(test.get(key2) === 200);

    console.log("Collision bucket;", index);
    console.log("HashMap:", test);
    console.log("Bucket contents:", test.buckets[index]);
}

const set = new HashSet();

set.add("ardvark");
set.add("bear");
set.add("ardvark"); // duplicate should not be included
set.add("dolphin");
set.add("eel");
set.add("flamingo");
set.add("gorilla");
set.add("horse");
set.add("iguana");
set.add("jaguar");
set.add("koala");
set.add("luigi");
set.add("mario");
set.add("wario");


console.log(set.hash("ardvark"));
console.log(set.hash("bear"));
console.log(set.hash("dolphin"));

console.assert(set.hash("ardvark") >= 0 && set.hash("ardvark") < set.buckets.length, "Hash should return a valid bucket index");

console.log(set.has("ardvark")); // should be true
console.log(set.has("dragon")); // should be false
console.log(set.length()); // should be 13
console.log(set.keys());

console.assert(set.hash("ardvark") >= 0 && set.hash("ardvark") < set.buckets.length, "Hash should return a valid bucket index");
console.assert(set.length() === 13, "Duplicate keys should not be added");
console.assert(set.buckets.length === 32, "Buckets should doubble after exceeding load factor");
console.assert(set.has("ardvark") === true, "Exisiting key should be found");
console.assert(set.has("dragon") === false, "Missing key shoudl return fale");
console.assert(set.remove("bear") === true, "Exisiting key should be removable");
console.assert(set.length() === 12, "Length should decrease after removed")
console.assert(set.has("bear") === false, "Removed key should no longer exist");
console.assert(set.remove("dragon") === false, "Missing key should not be removable");

console.log(set.clear());
console.log(set.length()); // should be 0

const resizeTest = new HashSet;

for (let i = 1; i <= 12; i++) {
    resizeTest.add(`key${i}`);
}

console.log(resizeTest.buckets.length); // 16
resizeTest.add("key13");
console.log(resizeTest.buckets.length); // 32
console.assert(resizeTest.has("key1") === true, "First key should still be there");
console.assert(resizeTest.has("key6") === true, "Midway key shoudl still be there");
console.assert(resizeTest.has("key13") === true, "New key should be there");
console.assert(resizeTest.length() === 13, "All unique keys should remain");

for (let i = 1; i <= 13; i++) {
    console.assert(
        resizeTest.has(`key${i}`),
        `key${i} should still exist after resizing`
    );

const index = resizeTest.hash("key1");

console.log(index);
console.log(resizeTest.buckets.length);

console.assert(index >= 0 && index < resizeTest.buckets.length, "Hash index shouldbe valid after resizing"
);
}
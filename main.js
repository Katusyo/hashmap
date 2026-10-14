/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/HashMap.js"
/*!************************!*\
  !*** ./src/HashMap.js ***!
  \************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node.js */ \"./src/Node.js\");\n\n\nclass HashMap {\n    constructor() {\n        this.buckets = new Array(16);\n        this.loadFactor = 0.75;\n    }\n\n    hash(key) {\n        let hashCode = 0;\n\n        const primeNumber = 31;\n        for (let i = 0; i < key.length; i++) {\n            hashCode = primeNumber * hashCode + key.charCodeAt(i);\n        }\n        \n        const index = hashCode % this.buckets.length;\n        \n        if (index < 0 || index >= this.buckets.length) {\n            throw new Error(\"Trying to access index out of bounds\");\n        }\n\n        return index;\n    }\n\n    set(key, value) {\n        const index = this.hash(key);\n        const newNode = new _Node_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](key, value);\n        \n        let current = this.buckets[index];\n        while (current) {\n            if (current.key === key) {\n                current.value = value;\n                return;\n            }\n            current = current.next;\n        }\n\n        if ((this.length() + 1) / this.buckets.length > this.loadFactor) {\n            this.resize();\n        }\n\n        const newIndex = this.hash(key);\n\n        newNode.next = this.buckets[newIndex];\n        this.buckets[newIndex] = newNode;\n    }\n\n    resize() {\n        const oldBuckets = this.buckets;\n\n        this.buckets = new Array(oldBuckets.length * 2);\n\n        for (let i = 0; i < oldBuckets.length; i++) {\n            let current = oldBuckets[i];\n\n            while (current) {\n                const nextNode = current.next;\n                const newIndex = this.hash(current.key);\n\n                current.next = this.buckets[newIndex];\n                this.buckets[newIndex] = current;\n\n                current = nextNode;\n            }\n        }\n    }\n    \n\n    get(key) {\n        const index = this.hash(key);\n        let current = this.buckets[index];\n        while (current) {\n            if (current.key === key) {\n                return current.value;\n            }\n            current = current.next;\n        }\n        return undefined;\n    }\n\n    has(key) {\n        return this.get(key) !== undefined;\n    }\n\n    remove(key) {\n        const index = this.hash(key);\n        let current = this.buckets[index];\n        let prev = null;\n\n        while (current) {\n            if (current.key === key) {\n                if (prev === null) {\n                    this.buckets[index] = current.next;\n                } else {\n                    prev.next = current.next;\n                }\n                return true;\n            }\n            prev = current;\n            current = current.next;\n        }\n        return false;\n    }\n\n    length() {\n        let count = 0;\n        for (let i = 0; i < this.buckets.length; i++) {\n            let current = this.buckets[i];\n            while (current) {\n                count++;\n                current = current.next;\n            }\n        }\n        return count;\n    }\n\n    clear() {\n        this.buckets = new Array(16);\n    }\n\n    keys() {\n        const keysArray = [];\n        for (let i = 0; i < this.buckets.length; i++) {\n            let current = this.buckets[i];\n            while (current) {\n                keysArray.push(current.key);\n                current = current.next;\n            }\n        }\n        return keysArray;\n    }\n\n    values() {\n        const valuesArray = [];\n        for (let i = 0; i < this.buckets.length; i++) {\n            let current = this.buckets[i];\n            while (current) {\n                valuesArray.push(current.value);\n                current = current.next;\n            }\n        }\n        return valuesArray;\n    }\n\n    entries() {\n        const entriesArray = [];\n        for (let i = 0; i < this.buckets.length; i++) {\n            let current = this.buckets[i];\n            while (current) {\n                entriesArray.push([current.key, current.value]);\n                current = current.next;\n            }\n        }\n        return entriesArray;\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HashMap);\n\n//# sourceURL=webpack://hashmap/./src/HashMap.js?\n}");

/***/ },

/***/ "./src/HashSet.js"
/*!************************!*\
  !*** ./src/HashSet.js ***!
  \************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _SetNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SetNode.js */ \"./src/SetNode.js\");\n\n\nclass HashSet {\n    constructor() {\n        this.buckets = new Array(16);\n        this.loadFactor = 0.75;\n    }\n    \n    add(key) {\n        const index = this.hash(key);\n        const newNode = new _SetNode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](key);\n\n        let current = this.buckets[index];\n        while (current) {\n            if (current.key === key) {\n                return;\n            }\n            current = current.next;\n        }\n\n        if ((this.length() + 1) / this.buckets.length > this.loadFactor) {\n            this.resize();\n        }\n\n        const newIndex = this.hash(key);\n\n        newNode.next = this.buckets[newIndex];\n        this.buckets[newIndex] = newNode;\n    }\n\n    hash(key) {\n        let hashCode = 0;\n\n        const primeNumber = 31;\n        for (let i = 0; i < key.length; i++) {\n            hashCode = primeNumber * hashCode + key.charCodeAt(i);\n        }\n        \n        const index = hashCode % this.buckets.length;\n        \n        if (index < 0 || index >= this.buckets.length) {\n            throw new Error(\"Trying to access index out of bounds\");\n        }\n\n        return index;\n    }\n\n    resize() {\n        const oldBuckets = this.buckets;\n\n        this.buckets = new Array(oldBuckets.length * 2);\n\n        for (let i = 0; i < oldBuckets.length; i++) {\n            let current = oldBuckets[i];\n\n            while (current) {\n                const nextNode = current.next;\n                const newIndex = this.hash(current.key);\n\n                current.next = this.buckets[newIndex];\n                this.buckets[newIndex] = current;\n\n                current = nextNode;\n            }\n        }\n    }\n\n    length() {\n        let count = 0;\n        for (let i = 0; i < this.buckets.length; i++) {\n            let current = this.buckets[i];\n            while (current) {\n                count++;\n                current = current.next;\n            }\n        }\n        return count;\n    }\n\n    has(key) {\n        const index = this.hash(key);\n        let current = this.buckets[index];\n\n        while (current) {\n            if (current.key === key) {\n                return true;\n            }\n            current = current.next;\n        }\n\n        return false;\n    }\n\n    remove(key) {\n        const index = this.hash(key);\n        let current = this.buckets[index];\n        let prev = null;\n\n        while (current) {\n            if (current.key === key) {\n                if (prev === null) {\n                    this.buckets[index] = current.next;\n                } else {\n                    prev.next = current.next;\n                }\n                return true;\n            }\n            prev = current;\n            current = current.next;\n        }\n        return false;\n    }\n\n    clear() {\n        this.buckets = new Array(16);\n    }\n\n    keys() {\n        const keysArray = [];\n        for (let i = 0; i < this.buckets.length; i++) {\n            let current = this.buckets[i];\n            while (current) {\n                keysArray.push(current.key);\n                current = current.next;\n            }\n        }\n        return keysArray;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HashSet);\n\n//# sourceURL=webpack://hashmap/./src/HashSet.js?\n}");

/***/ },

/***/ "./src/Node.js"
/*!*********************!*\
  !*** ./src/Node.js ***!
  \*********************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Node {\n    constructor(key, value) {\n        this.key = key;\n        this.value = value;\n        this.next = null;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Node);\n\n//# sourceURL=webpack://hashmap/./src/Node.js?\n}");

/***/ },

/***/ "./src/SetNode.js"
/*!************************!*\
  !*** ./src/SetNode.js ***!
  \************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass SetNode {\n    constructor(key) {\n        this.key = key;\n        this.next = null;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SetNode);\n\n//# sourceURL=webpack://hashmap/./src/SetNode.js?\n}");

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HashMap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HashMap.js */ \"./src/HashMap.js\");\n/* harmony import */ var _HashSet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HashSet.js */ \"./src/HashSet.js\");\n\n\n\n\nconst test = new _HashMap_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\ntest.set(\"apple\", 'red');\ntest.set(\"banana\", 'yellow');\ntest.set(\"carrot\", 'orange');\ntest.set(\"dog\", 'brown');\ntest.set(\"elepant\", 'gray');\ntest.set(\"frog\", 'green');\ntest.set(\"grape\", 'purple');\ntest.set(\"hat\", 'black');\ntest.set(\"ice crea,\", 'white');\ntest.set(\"jacket\", 'blue');\ntest.set(\"kite\", 'pink');\ntest.set(\"lion\", 'golden');\ntest.set(\"moon\", 'silver');\n\ntest.set(\"apple\", 'green'); // should update value for \"apple\"\ntest.set(\"dog\", 'black'); //should update value for \"dog\"\n\nconsole.assert(test.get(\"apple\") === 'green', \"Apple should remain available after resizing\");\n\nconsole.log(test.keys());\nconsole.log(test.values());\n\nconsole.log(\"Entries:\", test.entries());\nconsole.log(\"After updating apple:\");\nconsole.log(\"Entries:\", test.entries());\n\nconsole.assert(test.length() ===13, \"Should contain 13 entries\");\nconsole.assert(test.buckets.length === 32, \"Capacity should double from 16 to 32\");\nconsole.assert(test.get(\"apple\") === \"green\", \"Apple should remain accessible after resizing\");\nconsole.assert(test.get(\"moon\") === \"silver\", \"Moon should remain accessible after resizing\");\n\nconst before = test.length();\ntest.remove(\"apple\");\nconsole.assert(test.length() === before - 1);\nconsole.assert(test.get(\"banana\") === 'yellow');\n\nconsole.log(\"Before clear:\");\nconsole.log(\"Length:\", test.length());\nconsole.assert(test.buckets.length > 16, \"Buckets should have resized to a larger size\");\n\nconsole.assert(test.get(\"moon\") === 'silver', \"Moon should remain available after resizing\");\n\nconsole.assert(test.get(\"banana\") === 'yellow', \"Banana should remain available after resizing\");\n\nconsole.assert(test.buckets.length > 16, \"Buckets should have resized to a larger size\");\n\nconsole.assert(test.get(\"pineapple\") === undefined);\nconsole.assert(test.has(\"lion\") === true);\n\nconsole.assert(test.keys().includes(\"banana\"));\nconsole.assert(test.values().includes(\"yellow\"));\nconsole.assert(test.entries().some(([key, value]) => key === \"banana\" && value === \"yellow\"));\n\ntest.clear();\n\nconsole.log(\"After clear:\");\nconsole.log(\"Length:\", test.length());   // should return 0\nconsole.log(\"Apple:\", test.get(\"apple\")); // should return undefined\nconsole.log(\"Has banana:\", test.has(\"banana\")); // should return false\nconsole.log(\"Bucket count:\", test.buckets.length); // should return 16\n\nconsole.assert(test.keys().length === 0);\nconsole.assert(test.values().length === 0);\nconsole.assert(test.entries().length === 0);\n\nconsole.log(\"New entries after clear:\");\ntest.set(\"grape\", 'green');\n\nconsole.log(\"Grape:\", test.get(\"grape\")); // should return 'green'\nconsole.log(\"Length:\", test.length()); // should return 1\n\nconst seen = new Map();\nlet collision = null;\n\nfor (let i = 0; i < 100; i++) {\n    const key = `key${i}`;\n    const index = test.hash(key);\n\n    if (seen.has(index)) {\n        collision = [seen.get(index), key, index];\n        break;\n    }\n    seen.set(index, key);\n}\n\nconsole.log(\"Collision found:\", collision);\n\nif (collision) {\n    const [key1, key2, index] = collision;\n\n    test.set(key1, 100);\n    test.set(key2, 200);\n\n    console.assert(test.remove(key1) === true); \n    console.assert(test.has(key1) === false);\n    console.assert(test.get(key2) === 200);\n\n    console.log(\"Collision bucket;\", index);\n    console.log(\"HashMap:\", test);\n    console.log(\"Bucket contents:\", test.buckets[index]);\n}\n\nconst set = new _HashSet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\nset.add(\"ardvark\");\nset.add(\"bear\");\nset.add(\"ardvark\"); // duplicate should not be included\nset.add(\"dolphin\");\nset.add(\"eel\");\nset.add(\"flamingo\");\nset.add(\"gorilla\");\nset.add(\"horse\");\nset.add(\"iguana\");\nset.add(\"jaguar\");\nset.add(\"koala\");\nset.add(\"luigi\");\nset.add(\"mario\");\nset.add(\"wario\");\n\n\nconsole.log(set.hash(\"ardvark\"));\nconsole.log(set.hash(\"bear\"));\nconsole.log(set.hash(\"dolphin\"));\n\nconsole.assert(set.hash(\"ardvark\") >= 0 && set.hash(\"ardvark\") < set.buckets.length, \"Hash should return a valid bucket index\");\n\nconsole.log(set.has(\"ardvark\")); // should be true\nconsole.log(set.has(\"dragon\")); // should be false\nconsole.log(set.length()); // should be 13\nconsole.log(set.keys());\n\nconsole.assert(set.hash(\"ardvark\") >= 0 && set.hash(\"ardvark\") < set.buckets.length, \"Hash should return a valid bucket index\");\nconsole.assert(set.length() === 13, \"Duplicate keys should not be added\");\nconsole.assert(set.buckets.length === 32, \"Buckets should doubble after exceeding load factor\");\nconsole.assert(set.has(\"ardvark\") === true, \"Exisiting key should be found\");\nconsole.assert(set.has(\"dragon\") === false, \"Missing key shoudl return fale\");\nconsole.assert(set.remove(\"bear\") === true, \"Exisiting key should be removable\");\nconsole.assert(set.length() === 12, \"Length should decrease after removed\")\nconsole.assert(set.has(\"bear\") === false, \"Removed key should no longer exist\");\nconsole.assert(set.remove(\"dragon\") === false, \"Missing key should not be removable\");\n\nconsole.log(set.clear());\nconsole.log(set.length()); // should be 0\n\nconst resizeTest = new _HashSet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\nfor (let i = 1; i <= 12; i++) {\n    resizeTest.add(`key${i}`);\n}\n\nconsole.log(resizeTest.buckets.length); // 16\nresizeTest.add(\"key13\");\nconsole.log(resizeTest.buckets.length); // 32\nconsole.assert(resizeTest.has(\"key1\") === true, \"First key should still be there\");\nconsole.assert(resizeTest.has(\"key6\") === true, \"Midway key shoudl still be there\");\nconsole.assert(resizeTest.has(\"key13\") === true, \"New key should be there\");\nconsole.assert(resizeTest.length() === 13, \"All unique keys should remain\");\n\nfor (let i = 1; i <= 13; i++) {\n    console.assert(\n        resizeTest.has(`key${i}`),\n        `key${i} should still exist after resizing`\n    );\n\nconst index = resizeTest.hash(\"key1\");\n\nconsole.log(index);\nconsole.log(resizeTest.buckets.length);\n\nconsole.assert(index >= 0 && index < resizeTest.buckets.length, \"Hash index shouldbe valid after resizing\"\n);\n}\n\n//# sourceURL=webpack://hashmap/./src/index.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
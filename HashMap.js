class HashMap {
  static initialCapacity = 16;
  #keysUsed = 0;
  #loadFactor = 0.75;
  #capacity = HashMap.initialCapacity;
  #data = Array(this.#capacity).fill(null);

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const keyHash = this.#hash(key);
    if (this.#data[keyHash] === null) {
      this.#keysUsed++;
    }
    if (this.fillPercentage >= this.#loadFactor) {
      this.#data = [...this.#data, ...Array(this.#capacity).fill(null)];
      this.#capacity *= 2;
    }
    this.#data[keyHash] = [key, value];
  }

  get(key) {
    return this.#data[this.#hash(key)];
  }

  has(key) {
    return this.#data[this.#hash(key)] !== null;
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    }
    this.#data[this.#hash(key)] = null;
    this.#keysUsed--;
    return true;
  }

  toString() {
    let out = "\n";
    let entriesInLine = 0;
    for (let bucket of this.#data) {
      out += `(${bucket}), `;
      entriesInLine++;
      if (entriesInLine % 4 === 0) {
        out += "\n";
        entriesInLine = 0;
      }
    }
    return out;
  }

  clear() {
    this.#data = Array(HashMap.initialCapacity).fill(null);
    this.#keysUsed = 0;
    this.#capacity = HashMap.initialCapacity;
  }

  get keys() {
    return this.#data.filter((entry) => entry !== null).map((entry) => entry[0]);
  }

  get values() {
    return this.#data.filter((entry) => entry !== null).map((entry) => entry[1]);
  }

  get entries() {
    return this.#data.filter((entry) => entry !== null);
  }

  get length() {
    return this.#keysUsed;
  }

  get capacity() {
    return this.#capacity;
  }

  get fillPercentage() {
    return this.#keysUsed > 0 ? this.#keysUsed / this.#capacity : 0;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
console.log(test.length, test.capacity, test.fillPercentage);
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("vase", "silver");
test.set("scarf", "black");
test.set("rainbow", "rainbow");
test.set("trace", "invisible");

console.log(test.has("hat"));
test.remove("hat");
console.log(test.has("hat"));

console.log(test.length, test.capacity, test.fillPercentage);
console.log(test.keys);
console.log(test.values);
console.log(test.entries);
test.clear();
console.log(test.length, test.capacity, test.fillPercentage);

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.7;
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }
  hash(key) {
    // takes a key and produces a hash code with it
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }
    return hashCode;
  }
  set(key, value) {
    // takes two arguments:
    // the first is a key, and
    // the second is a value that is assigned to this key.
    let index = this.hash(key);
    for (let pair of this.buckets[index]) {
      // If a key already exists, then the old value is overwritten
      if (pair.key === key) {
        pair.value = value;
        return;
      }
    }
    this.buckets[index].push({ key, value });
  }
  get(key) {
    //takes one argument as a key and
    // returns the value that is assigned to this key
    let index = this.hash(key);
    for (let pair of this.buckets[index]) {
      if (pair.key === key) return pair.value;
    }

    return null;
  }
  has(key) {
    let index = this.hash(key);
    for (let pair of this.buckets[index]) {
      if (pair.key === key) return true;
    }
    return false;
  }
  remove(key) {
    let index = this.hash(key);
    for (let pair of this.buckets[index]) {
      if (pair.key === key) {
        this.buckets[index] = [];
        return true;
      }
    }
    return false;
  }
  length() {
    let length = 0;
    for (let bucket of this.buckets) {
      if (bucket.length === 0) continue;
      length += bucket.length;
    }
    return length;
  }
  clear() {
    for (let bucket in this.buckets) {
      this.buckets[bucket] = [];
    }
  }
  keys() {
    let i = 0;
    let keyTray = [];
    for (let bucket in this.buckets) {
      if (this.buckets[bucket].length === 0) continue;
      for (let pair of this.buckets[bucket]) {
        keyTray.push(pair.key);
      }
    }
    return keyTray;
  }
}

const test = new HashMap();

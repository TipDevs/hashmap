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
    for (let bucket of this.buckets[index]) {
      // If a key already exists, then the old value is overwritten
      if (bucket[0] === key) {
        bucket[1] = value;
        return;
      }
    }
    this.buckets[index].push([key, value]);
  }
  get(key) {
    //takes one argument as a key and
    // returns the value that is assigned to this key
    let index = this.hash(key);
    for (let bucket of this.buckets[index]) {
      if (bucket[0] === key) return bucket[1];
    }

    return null;
  }
  has(key) {
    let index = this.hash(key);
    for (let bucket of this.buckets[index]) {
      if (bucket[0] === key) return true;
    }
    return false;
  }
  remove(key) {
    let index = this.hash(key);
    for (let bucket of this.buckets[index]) {
      if (bucket[0] === key) {
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
      length++;
    }
    return length;
  }
  clear() {
    for (let bucket in this.buckets) {
      this.buckets[bucket] = [];
    }
  }
}

const test = new HashMap();

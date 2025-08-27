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
}

const test = new HashMap();

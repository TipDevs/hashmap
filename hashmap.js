class HashMap {
  #capacity = 16;
  #loadFactor = 0.7;
  #buckets = Array.from({ length: this.#capacity }, () => []);
  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.#capacity;
    }
    return hashCode;
  }
  set(key, value) {
    let index = this.#hash(key);
    for (let pair of this.#buckets[index]) {
      if (pair.key === key) {
        pair.value = value;
        return;
      }
    }
    this.#buckets[index].push({ key, value });
    if (this.length() / this.#capacity > this.#loadFactor) {
      this.#resize();
    }
  }
  get(key) {
    let index = this.#hash(key);
    for (let pair of this.#buckets[index]) {
      if (pair.key === key) return pair.value;
    }

    return null;
  }
  has(key) {
    let index = this.#hash(key);
    for (let pair of this.#buckets[index]) {
      if (pair.key === key) return true;
    }
    return false;
  }
  remove(key) {
    let index = this.#hash(key);
    let bucket = this.#buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].splice(i, 0);
        return true;
      }
    }
    return false;
  }
  length() {
    let length = 0;
    for (let bucket of this.#buckets) {
      if (bucket.length === 0) continue;
      length += bucket.length;
    }
    return length;
  }
  clear() {
    for (let bucket of this.#buckets) {
      bucket.splice(0, bucket.length);
    }
  }
  keys() {
    let keyTray = [];
    for (let bucket of this.#buckets) {
      if (bucket.length === 0) continue;
      for (let pair of bucket) {
        keyTray.push(pair.key);
      }
    }
    return keyTray;
  }
  values() {
    let valueTray = [];
    for (let bucket of this.#buckets) {
      if (bucket.length === 0) continue;
      for (let pair of bucket) {
        valueTray.push(pair.value);
      }
    }
    return valueTray;
  }
  entries() {
    let entriesTray = [];
    for (let bucket of this.#buckets) {
      if (bucket.length === 0) continue;
      for (let pair of bucket) {
        entriesTray.push({ key: pair.key, value: pair.value });
      }
    }
    return entriesTray;
  }
  #resize() {
    // method that resize the #capacity when load factor overflow
    console.log("Resizing.....");
    let oldBuckets = this.#buckets;
    this.#capacity *= 2;
    this.#buckets = Array.from({ length: this.#capacity }, () => []);
    for (let bucket of oldBuckets) {
      for (let pair of bucket) {
        let index = this.#hash(pair.key);
        this.#buckets[index].push(pair);
      }
    }
  }
}

const test = new HashMap();

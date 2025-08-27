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
}

const test = new HashMap();

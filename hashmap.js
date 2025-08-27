class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.7;
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }
}

const test = new HashMap();

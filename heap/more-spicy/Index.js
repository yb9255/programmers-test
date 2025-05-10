class MinHeap {
  constructor() {
    this.values = [];
  }

  size() {
    return this.values.length;
  }

  peek() {
    return this.values[0];
  }

  insert(element) {
    this.values.push(element);
    this.bubbleUp();
  }

  swap(firstIndex, secondIndex) {
    [this.values[firstIndex], this.values[secondIndex]] = [
      this.values[secondIndex],
      this.values[firstIndex],
    ];
  }

  extractMin() {
    if (this.values.length <= 0) {
      return null;
    }

    if (this.values.length === 1) {
      return this.values.pop();
    }

    this.swap(0, this.values.length - 1);
    const min = this.values.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    let element = this.values[idx];

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (parentIdx < 0) break;

      const parentElement = this.values[parentIdx];
      if (parentElement <= element) break;

      this.swap(idx, parentIdx);

      idx = parentIdx;
      element = this.values[idx];
    }
  }

  bubbleDown() {
    let idx = 0;
    const length = this.values.length;

    while (true) {
      const leftChildIdx = idx * 2 + 1;
      const rightChildIdx = idx * 2 + 2;
      let swapIdx = idx;

      if (
        leftChildIdx < length &&
        this.values[leftChildIdx] < this.values[swapIdx]
      ) {
        swapIdx = leftChildIdx;
      }

      if (
        rightChildIdx < length &&
        this.values[rightChildIdx] < this.values[swapIdx]
      ) {
        swapIdx = rightChildIdx;
      }

      if (swapIdx === idx) break;

      this.swap(idx, swapIdx);
      idx = swapIdx;
    }
  }
}

function solution(scoville, K) {
  let count = 0;
  const heap = new MinHeap();
  scoville.forEach((num) => heap.insert(num));

  while (heap.peek() < K) {
    if (heap.size() < 2) return -1;

    const first = heap.extractMin();
    const second = heap.extractMin();

    heap.insert(first + second * 2);
    count++;
  }

  return count;
}

// 테스트 실행
const input = [[1, 2, 3, 9, 10, 12], 7];
const output = 2;
const result = solution(...input);

console.log(
  '결과:',
  result === output
    ? '✅ 통과'
    : `❌ 실패 (기대값: ${output}, 실제값: ${result})`,
);

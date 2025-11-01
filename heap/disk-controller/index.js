/** https://school.programmers.co.kr/learn/courses/30/lessons/42627 */

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  size() {
    return this.values.length;
  }

  peek() {
    return this.values[0];
  }

  swap(i, j) {
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
  }

  enqueue(element) {
    this.values.push(element);
    this.bubbleUp();
  }

  dequeue() {
    if (this.values.length === 0) return null;
    if (this.values.length === 1) return this.values.pop();

    this.swap(0, this.values.length - 1);
    const min = this.values.pop();
    this.sinkDown();
    return min;
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      const current = this.values[idx];

      if (current.spentTime < parent.spentTime) {
        this.swap(idx, parentIdx);
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;

    while (true) {
      const leftIdx = idx * 2 + 1;
      const rightIdx = idx * 2 + 2;
      let smallest = idx;

      if (
        leftIdx < length &&
        this.values[leftIdx].spentTime < this.values[smallest].spentTime
      ) {
        smallest = leftIdx;
      }

      if (
        rightIdx < length &&
        this.values[rightIdx].spentTime < this.values[smallest].spentTime
      ) {
        smallest = rightIdx;
      }

      if (smallest === idx) break;
      this.swap(idx, smallest);
      idx = smallest;
    }
  }
}

function solution(jobs) {
  jobs.sort((a, b) => a[0] - b[0]);

  const pq = new PriorityQueue();
  let time = 0;
  let idx = 0;
  let acc = 0;

  while (idx < jobs.length || pq.size() > 0) {
    while (idx < jobs.length && jobs[idx][0] <= time) {
      const [startTime, spentTime] = jobs[idx];
      pq.enqueue({ startTime, spentTime });
      idx++;
    }

    if (pq.size() > 0) {
      const { startTime, spentTime } = pq.dequeue();
      time += spentTime;
      acc += time - startTime;
    } else if (idx < jobs.length) {
      time = jobs[idx][0];
    }
  }

  return Math.floor(acc / jobs.length);
}

const input = [
  [0, 3],
  [1, 9],
  [3, 5],
];
const output = 8;
const result = solution(input);

console.log(
  '결과:',
  result === output
    ? '✅ 통과'
    : `❌ 실패 (기대값: ${output}, 실제값: ${result})`
);

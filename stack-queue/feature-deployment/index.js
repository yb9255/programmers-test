/** https://school.programmers.co.kr/learn/courses/30/lessons/42586 */

function solution(progresses, speeds) {
  let count = 0;
  let front = 0;
  const result = [];

  while (front < progresses.length) {
    if (progresses[front] >= 100) {
      while (progresses[front] >= 100) {
        count++;
        front++;
      }

      result.push(count);
      count = 0;
    }

    for (let i = 0; i < progresses.length; i++) {
      progresses[i] += speeds[i];
    }
  }

  return result;
}

const testSolution = (input, expected) => {
  const result = solution(...input);
  console.log(
    '결과:',
    result.toString() === expected.toString()
      ? '✅ 통과'
      : `❌ 실패 (기대값: ${expected}, 실제값: ${result})`
  );
};

testSolution(
  [
    [93, 30, 55],
    [1, 30, 5],
  ],
  [2, 1]
);

testSolution(
  [
    [95, 90, 99, 99, 80, 99],
    [1, 1, 1, 1, 1, 1],
  ],
  [1, 3, 2]
);

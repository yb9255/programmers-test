function solution(numbers, target) {
  /** Pseudo Code
    1. 각 값을 순회하면서 이전 누적값에 +와 -현재값을 더하는 재귀를 돈다.
  */

  let answer = 0;

  const getTarget = (depth, sum) => {
    if (depth === numbers.length) {
      if (sum === target) {
        answer++;
      }

      return;
    }

    getTarget(depth + 1, sum + numbers[depth]);
    getTarget(depth + 1, sum - numbers[depth]);
  };

  getTarget(0, 0);

  return answer;
}

const testSolution = (input, expected) => {
  const result = solution(...input);
  console.log(
    '결과:',
    result === expected
      ? '✅ 통과'
      : `❌ 실패 (기대값: ${expected}, 실제값: ${result})`,
  );
};

testSolution([[1, 1, 1, 1, 1], 3], 5);
testSolution([[4, 1, 2, 1], 4], 2);

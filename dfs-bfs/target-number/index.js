/** https://school.programmers.co.kr/learn/courses/30/lessons/43165 */

function solution(numbers, target) {
  /** Pseudo Code
    1. 각 값을 순회하면서 이전 누적값에 +와 -현재값을 더하는 재귀를 돈다.
  */

  let answer = 0;

  const dfs = (depth, acc) => {
    if (depth === numbers.length) {
      if (acc === target) {
        answer++;
      }

      return;
    }

    dfs(depth + 1, acc + numbers[depth]);
    dfs(depth + 1, acc - numbers[depth]);
  };

  dfs(0, 0);
  return answer;
}

const testSolution = (input, expected) => {
  const result = solution(...input);
  console.log(
    '결과:',
    result === expected
      ? '✅ 통과'
      : `❌ 실패 (기대값: ${expected}, 실제값: ${result})`
  );
};

testSolution([[1, 1, 1, 1, 1], 3], 5);
testSolution([[4, 1, 2, 1], 4], 2);

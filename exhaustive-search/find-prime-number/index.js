/** https://school.programmers.co.kr/learn/courses/30/lessons/42839 */

function solution(numbers) {
  /** Pseudo Code
    1. numbers의 순열을 구한다.
    2. 순열 중 소수에 해당하는 값을 걸러낸다.
    3. 값을 저장할때 중복값을 제거하기 위해 Set에 저장한다.
  */

  const digits = numbers.split('');
  const result = new Set();
  const visited = Array(digits.length).fill(false);
  const cur = [];

  const getPermutations = (depth, targetDepth) => {
    if (depth === targetDepth) {
      const num = +cur.join('');

      if (num > 1) {
        result.add(num);
      }

      return;
    }

    for (let i = 0; i < digits.length; i++) {
      if (visited[i]) continue;

      visited[i] = true;
      cur[depth] = digits[i];
      getPermutations(depth + 1, targetDepth);
      visited[i] = false;
    }
  };

  for (let i = 1; i <= digits.length; i++) {
    getPermutations(0, i);
  }

  const isPrime = (num) => {
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }

    return true;
  };

  return [...result].filter(isPrime).length;
}

const testSolution = (input, expected) => {
  const result = solution(input);
  console.log(
    '결과:',
    result === expected
      ? '✅ 통과'
      : `❌ 실패 (기대값: ${expected}, 실제값: ${result})`
  );
};

testSolution('17', 3);
testSolution('011', 2);

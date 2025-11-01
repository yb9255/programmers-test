/** https://school.programmers.co.kr/learn/courses/30/lessons/12909 */

function solution(s) {
  /** Pseudo Code
   * 1. stack을 만든다..
   * 2. s를 순회하며 (인 경우 stack에 넣는다.
   * 3. stack이 비지 않았는데 새로운 (가 들어가는 경우 false
   * 4. 순회가 끝났을때 stack이 다 비었다면 true;
   */

  const stack = [];

  for (const symbol of s) {
    if (symbol === '(') {
      stack.push(symbol);
    } else {
      if (!stack.length || stack[stack.length - 1] !== '(') {
        return false;
      } else {
        stack.pop();
      }
    }
  }

  return stack.length === 0;
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

testSolution('()()', true);
testSolution('(())()', true);
testSolution(')()(', false);
testSolution('(()(', false);

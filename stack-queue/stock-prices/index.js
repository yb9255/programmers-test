/** https://school.programmers.co.kr/learn/courses/30/lessons/42584 */

function solution(prices) {
  const stack = [];
  const result = [];

  /** 
      Pseudo Code
      1. prices의 길이 n만큼 순회하면서 (i) stack에 price들의 index를 넣는다.
      2. index를 넣기 전에, 현재 prices[i]가 prices[<stack 끝 인덱스>]보다 작다면,
      stack 끝 index ~ i 까지만 주식 값이 유지된 것을 의미한다.
      2-1. 따라서 이 시점에서 stack을 pop해서 값이 떨어진 idx를 찾은 다음,
      answer[idx]의 값을 stack 끝 index - i 값으로 설정해준다.
      3. 이 과정을 거치고 stack에 값이 남아있는 index를 해당 인덱스 시점부터 끝까지
      값이 떨어지지 않았을음 의미한다. -> answer[idx] = n - 1 - idx;
      
      4. 값을 전부 넣으면 메모리 이슈로 시간초과에 걸린다.
    */

  for (const i in prices) {
    while (stack.length && prices[stack[stack.length - 1]] > prices[i]) {
      const top = stack.pop();
      result[top] = i - top;
    }

    stack.push(i);
  }

  while (stack.length) {
    const top = stack.pop();
    result[top] = prices.length - 1 - top;
  }

  return result;
}

const testSolution = (input, expected) => {
  const result = solution(input);
  console.log(
    '결과:',
    result.toString() === expected.toString()
      ? '✅ 통과'
      : `❌ 실패 (기대값: ${expected}, 실제값: ${result})`
  );
};

testSolution([1, 2, 3, 2, 3], [4, 3, 1, 1, 0]);

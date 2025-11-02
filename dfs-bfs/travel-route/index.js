/** https://school.programmers.co.kr/learn/courses/30/lessons/43164 */

function solution(tickets) {
  /**
    Pseudo Code

    1. map에 ticket을 순회하며 from: Array<to> 형태로 값을 기록한다.
    2. Array<to>를 알파벳 순으로 정렬한다.
    3. from을 인자로 받는 재귀함수를 시작한다.
    4. 인자에 맞는 Array<to>를 찾은 뒤, Array<to>가 빌때까지
    해당 Array<to>를 shift하며 알파벳 순으로 dfs(to)를 다시 실행한다.
    5. while이 끝나면 from을 정답 배열에 push한다. 이 형태에서 "ICN"으로 재귀를 시작하면
    맨 뒤의 목적지부터 push하여 최종적으로 "ICN"이 가장 마지막에 push가 된다.
    6. 정답 배열을 reverse하여 return한다.
  */

  const map = new Map();
  const answer = [];

  for (const [from, to] of tickets) {
    if (!map.has(from)) map.set(from, []);
    map.get(from).push(to);
  }

  for (const destinList of map.values()) {
    destinList.sort();
  }

  const dfs = (airport) => {
    const destinList = map.get(airport);

    while (destinList && destinList.length) {
      const destination = destinList.shift();
      dfs(destination);
    }

    answer.push(airport);
  };

  dfs('ICN');

  return answer.reverse();
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

testSolution(
  [
    ['ICN', 'JFK'],
    ['HND', 'IAD'],
    ['JFK', 'HND'],
  ],
  ['ICN', 'JFK', 'HND', 'IAD']
);

testSolution(
  [
    ['ICN', 'SFO'],
    ['ICN', 'ATL'],
    ['SFO', 'ATL'],
    ['ATL', 'ICN'],
    ['ATL', 'SFO'],
  ],
  ['ICN', 'ATL', 'ICN', 'SFO', 'ATL', 'SFO']
);

/** https://school.programmers.co.kr/learn/courses/30/lessons/43162 */

function solution(n, computers) {
  /** Pseudo Code
    1. 첫 재귀함수 실행 시 현재 컴퓨터를 방문했다고 기록한다.
    2. 다음에 방문할 컴퓨터가 1을 가지고 있다면 재귀를 실행한다.
    즉, 연결된 컴퓨터는 재귀로 들어가서 방문했음이 표시된다.
    3. 0부터 n까지 순회를 돌며 방문 기록이 없을 시에만 재귀함수를 실행한다.
    4. 방문 기록이 없는 경우, 이전 컴퓨터의 네트워크가 연결된적이 없다는 의미이므로 count를 올려준다.
  */

  const visited = Array(n).fill(false);
  let networkCount = 0;

  const checkNetworkConnected = (cur) => {
    visited[cur] = true;

    for (let next = 0; next < n; next++) {
      if (!visited[next] && computers[cur][next] === 1) {
        checkNetworkConnected(next);
      }
    }
  };

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      checkNetworkConnected(i);
      networkCount++;
    }
  }

  return networkCount;
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

testSolution(
  [
    3,
    [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ],
  ],
  2
);
testSolution(
  [
    3,
    [
      [1, 1, 0],
      [1, 1, 1],
      [0, 1, 1],
    ],
  ],
  1
);

// https://school.programmers.co.kr/learn/courses/30/lessons/86971

function solution(n, wires) {
  /** Pseudo Code
   * 1. 각 index 송전탑에 연결된 송전탑 index를 담는 배열 connectedVList를 만든다.
   * 2. wires를 순회하면서 connectedVList v1 인덱스 배열에는 v2를, v2 인덱스 배열에는 v1을 담는다.
   *
   * 3. skip하는 송전탑 index 두개를 받고 사이즈를 check해주는 checkSize 함수를 생성한다.
   * 3-1. cutV1을 queue에 넣고 bfs 순회를 시작한다. cutV1은 visited에 기록한다.
   * 현재 체크한 송전탑은 1개이므로 count를 1로 초기화한다.
   * 3-2. cutV1과 연결된 다음 송전탑을 connectedVList[cutV1]에서 찾는다.
   * 3-3. 이때 현재 송전탑과 다음 송전탑 모두 선을 끊는 송전탑 index에 포함된다면 건너뛴다
   * 3-4. 만약 이미 방문한 송전탑이면 건너뛴다.
   * 3-5. 방문이 가능한 송전탑이면 송전탑 개수를 1개 추가하므로 count를 1 늘리고 해당 송전탑을 queue에 push한다.
   * 3-6. bfs 순회가 끝나고 count를 리턴한다.
   *
   * 4. wires 전체를 순회하며 checkSize 함수를 실행한다. size1은 checkSize 리턴값, size2는 n에서 size1을 뺀 값이다.
   * 5. Math.min(answer, Math.abs(size1 - size2))를 해서 송전탑 무리끼리의 갯수 차이가 최소인 케이스를 구하고 리턴한다.
   */

  let answer = Infinity;
  const connectedVList = Array.from({ length: n + 1 }, () => []);

  for (const [v1, v2] of wires) {
    connectedVList[v1].push(v2);
    connectedVList[v2].push(v1);
  }

  const visited = Array(n + 1).fill(-1);
  let visitedMask = 0;

  const checkSize = (cutV1, cutV2) => {
    visitedMask++;

    const queue = [cutV1];
    let front = 0;
    visited[cutV1] = visitedMask;

    let count = 1;

    while (front < queue.length) {
      const cur = queue[front++];

      for (const next of connectedVList[cur]) {
        if (
          (cur === cutV1 && next === cutV2) ||
          (cur === cutV2 && next === cutV1)
        ) {
          continue;
        }

        if (visited[next] === visitedMask) continue;

        visited[next] = visitedMask;
        queue.push(next);
        count++;
      }
    }

    return count;
  };

  for (const [v1, v2] of wires) {
    const size1 = checkSize(v1, v2);
    const size2 = n - size1;

    answer = Math.min(answer, Math.abs(size1 - size2));
  }

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

testSolution(
  [
    9,
    [
      [1, 3],
      [2, 3],
      [3, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [7, 8],
      [7, 9],
    ],
  ],
  3
);

testSolution(
  [
    4,
    [
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  ],
  0
);

testSolution(
  [
    7,
    [
      [1, 2],
      [2, 7],
      [3, 7],
      [3, 4],
      [4, 5],
      [6, 7],
    ],
  ],
  1
);

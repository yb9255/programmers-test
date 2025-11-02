/** https://school.programmers.co.kr/learn/courses/30/lessons/1844 */

function solution(maps) {
  /** Pseudo Code
    1. dfs는 끝까지 갔다가 돌아오므로 비효율적. 최단거리만 탐색하는 bfs가 더 적절하다.
    2. queue에 시작 지점의 y, x, distance를 담는다.
    3. 방문하지 않은 상하좌우 블럭을 각각 queue에 담고, 담은 좌표는 visited로 잡는다.
    4. queue가 빌때까지 while로 순회하면서 shift로 앞의 값을 빼내어 y, x를 봐서
    도착했는지 확인한 뒤, 도착했으면 값을 리턴한다.
    5. queue가 다 빌때까지 도착하지 못했으면 -1을 리턴한다.
  */

  const n = maps.length;
  const m = maps[0].length;

  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  visited[0][0] = true;

  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];

  const queue = [[0, 0, 1]];

  while (queue.length) {
    const [y, x, distance] = queue.shift();

    if (y === n - 1 && x === m - 1) {
      return distance;
    }

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0) continue;
      if (ny >= n || nx >= m) continue;
      if (maps[ny][nx] === 0) continue;
      if (visited[ny][nx]) continue;

      visited[ny][nx] = true;
      queue.push([ny, nx, distance + 1]);
    }
  }

  return -1;
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

testSolution(
  [
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ],
  11
);

testSolution(
  [
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
  ],
  -1
);

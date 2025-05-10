function solution(k, dungeons) {
  /** Pseudo Code
    1. 방문하는 던전 순서를 순회하는 dfs를 돈다.
    2. 각 순열 조합 배열을 순회하면서, 피로도 조건이 일치한 상태로 탐험할 수 있는 던전을 카운트한다.
    3. 카운트할때마다 최대 카운트인지 여부를 체크하고 maxCount 값을 갱신한다.
    4. maxCount를 리턴한다.
  */

  let maxCount = 0;
  const visited = Array(dungeons.length).fill(false);

  const getMaxCount = (count, curK) => {
    maxCount = Math.max(maxCount, count);

    for (let i = 0; i < dungeons.length; i++) {
      const [needed, consume] = dungeons[i];

      if (!visited[i] && curK >= needed) {
        visited[i] = true;
        getMaxCount(count + 1, curK - consume);
        visited[i] = false;
      }
    }
  };

  getMaxCount(0, k);

  return maxCount;
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

testSolution(
  [
    80,
    [
      [80, 20],
      [50, 40],
      [30, 10],
    ],
  ],
  3,
);

/** https://school.programmers.co.kr/learn/courses/30/parts/12421 */

/**
  정답 출처
  https://cocococo.tistory.com/search/%EC%95%84%EC%9D%B4%ED%85%9C%20%EC%A4%8D%EA%B8%B0
*/

function solution(rectangle, characterX, characterY, itemX, itemY) {
  /**
    Pseudo Code
    1. 사각형 모서리간에 접하는 부분들은 이 모서리가 합쳐져서
    이동 가능한 경로인지 내부인지 판단이 어려워짐.
    2. 그래서 map과 모든 좌표값을 2배로 곱해서 모서리가 합쳐지는 부분에 빈 공간이 생기도록 변환한다.
    3. rectangle 전체를 순회하면서 똑같은 크기의 map에 모서리인지 아닌지 여부를 체크한다.
    4. 도형 바깥이면 0, 도형 모서리면 1, 도형 내부이면 2로 표시한다. 도형 외부와 내부를 구분하지 않으면
    A와 겹쳐지는 다른 도형 B가 A 내부도 갈 수 있는 길로 인지해버릴 수 있다. 다른 도형의 내부가 아닐 때만
    도형 모서리 1이 될수록 코드 작성
    5. BFS로 map을 순회한다. 이동 가능한 곳이면 queue에 이동하도록 담으면서 이동 거리를 1 올린다.
    6. queue 내부 좌표가 itemX, itemY와 같아지면 이동 거리를 리턴한다.
  */

  characterX *= 2;
  characterY *= 2;
  itemX *= 2;
  itemY *= 2;

  const doubleRec = rectangle.map((row) => row.map((coord) => coord * 2));
  const coordsMap = Array.from({ length: 102 }, () => Array(102).fill(0));

  doubleRec.forEach(([x1, y1, x2, y2]) => {
    for (let i = x1; i <= x2; i++) {
      for (let j = y1; j <= y2; j++) {
        if (i === x1 || i === x2 || j === y1 || j === y2) {
          if (coordsMap[i][j] === 0) coordsMap[i][j] = 1;
        } else {
          coordsMap[i][j] = 2;
        }
      }
    }
  });

  coordsMap[characterX][characterY] = 0;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  const queue = [[characterX, characterY, 0]];

  while (queue.length) {
    const [curX, curY, distance] = queue.shift();

    if (curX === itemX && curY === itemY) {
      return distance / 2;
    }

    for (let dir = 0; dir < 4; dir++) {
      const nx = curX + dx[dir];
      const ny = curY + dy[dir];

      if (coordsMap[nx][ny] === 1) {
        coordsMap[nx][ny] = 0;
        queue.push([nx, ny, distance + 1]);
      }
    }
  }
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
    [
      [1, 1, 7, 4],
      [3, 2, 5, 5],
      [4, 3, 6, 9],
      [2, 6, 8, 8],
    ],
    1,
    3,
    7,
    8,
  ],
  17
);

testSolution(
  [
    [
      [1, 1, 8, 4],
      [2, 2, 4, 9],
      [3, 6, 9, 8],
      [6, 3, 7, 7],
    ],
    9,
    7,
    6,
    1,
  ],
  11
);

testSolution([[[1, 1, 5, 7]], 1, 1, 4, 7], 9);

testSolution(
  [
    [
      [2, 1, 7, 5],
      [6, 4, 10, 10],
    ],
    3,
    1,
    7,
    10,
  ],
  15
);

testSolution(
  [
    [
      [2, 2, 5, 5],
      [1, 3, 6, 4],
      [3, 1, 4, 6],
    ],
    1,
    4,
    6,
    3,
  ],
  10
);

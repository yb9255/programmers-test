/** https://school.programmers.co.kr/learn/courses/30/lessons/67256 */

/**
 * BFS로 현재 번호와 손가락 위치간 거리를 계속 체크하면서 리턴
 * 똑같은 번호를 2번 누를 때 손가락 위치 포지션을 놓치지 않도록 주의
 */

function solution(numbers, hand) {
  const positionMap = Array.from({ length: 4 }, () => Array(3).fill(null));
  positionMap[3][0] = 'L';
  positionMap[3][2] = 'R';

  const getDist = (startY, startX, target) => {
    const visited = Array.from({ length: 4 }, () => Array(3).fill(false));
    const dy = [-1, 0, 1, 0];
    const dx = [0, -1, 0, 1];

    const queue = [[startY, startX, 0]];
    visited[startY][startX] = true;
    let front = 0;

    while (front < queue.length) {
      const [cy, cx, dist] = queue[front++];

      if (positionMap[cy][cx] === target) {
        return [cy, cx, dist];
      }

      for (let dir = 0; dir < 4; dir++) {
        const ny = cy + dy[dir];
        const nx = cx + dx[dir];

        if (ny < 0 || nx < 0 || ny >= 4 || nx >= 3) continue;
        if (visited[ny][nx]) continue;

        visited[ny][nx] = true;
        queue.push([ny, nx, dist + 1]);
      }
    }
  };

  const result = [];

  const updateHandPosition = (y, x, nextY, nextX, hand) => {
    result.push(hand);
    positionMap[y][x] = hand;

    if (nextY !== y || nextX !== x) {
      positionMap[nextY][nextX] = null;
    }
  };

  numbers.forEach((number) => {
    const y = number === 0 ? 3 : Math.floor((number - 1) / 3);
    const x = number === 0 ? 1 : (number - 1) % 3;

    const [leftY, leftX, leftDist] = getDist(y, x, 'L');
    const [rightY, rightX, rightDist] = getDist(y, x, 'R');

    if (number === 1 || number === 4 || number === 7) {
      updateHandPosition(y, x, leftY, leftX, 'L');
    } else if (number === 3 || number === 6 || number === 9) {
      updateHandPosition(y, x, rightY, rightX, 'R');
    } else {
      if (leftDist === rightDist) {
        if (hand === 'left') {
          updateHandPosition(y, x, leftY, leftX, 'L');
        } else {
          updateHandPosition(y, x, rightY, rightX, 'R');
        }
      } else if (leftDist > rightDist) {
        updateHandPosition(y, x, rightY, rightX, 'R');
      } else {
        updateHandPosition(y, x, leftY, leftX, 'L');
      }
    }
  });

  return result.join('');
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

testSolution([[1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right'], 'LRLLLRLLRRL');
testSolution([[7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], 'left'], 'LRLLRRLLLRR');
testSolution([[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 'right'], 'LLRLLRLLRL');

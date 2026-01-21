/** https://school.programmers.co.kr/learn/courses/30/lessons/67256 */

/** Manhattan Distance
 * 1. 격자에서 상하좌우로 자유롭게 이동이 가능할 때 사용하는 공식
 * distance = Math.abs(y1 - y2) + Math.abs(x1 - x2);
 * 장애물이 없는 상하좌우 이동시 사용함
 */

/** 기타 거리
 * dy = y2 - y1, dx = x2 - x1을 의미
 *
 * Euclidean: 두 점 사이의 직선 거리 (유클리드 거리)
 * Math.sqrt(dx*dx + dy*dy)
 *
 * Manhattan: 격자에서 상하좌우 이동이 가능할 때 최단거리 (맨하탄 거리)
 * Math.abs(dx) + Math.abs(dy)
 *
 * Chebyshev: 격자에서 상하좌우 + 대각선 8방향 이동이 가능할 때 최단거리 (체비쇼프 거리)
 * Math.max(Math.abs(dx), Math.abs(dy))
 *
 * 이 셋 모드 장애물이 없을때만 정상 동작
 */

function solution(numbers, hand) {
  let curL = [3, 0];
  let curR = [3, 2];

  const result = [];
  for (const number of numbers) {
    const y = number === 0 ? 3 : Math.floor((number - 1) / 3);
    const x = number === 0 ? 1 : (number - 1) % 3;

    const leftDist = Math.abs(curL[0] - y) + Math.abs(curL[1] - x);
    const rightDist = Math.abs(curR[0] - y) + Math.abs(curR[1] - x);

    if (number === 1 || number === 4 || number === 7) {
      result.push('L');
      curL = [y, x];
    } else if (number === 3 || number === 6 || number === 9) {
      result.push('R');
      curR = [y, x];
    } else {
      if (leftDist === rightDist) {
        if (hand === 'left') {
          result.push('L');
          curL = [y, x];
        } else {
          result.push('R');
          curR = [y, x];
        }
      } else if (leftDist > rightDist) {
        result.push('R');
        curR = [y, x];
      } else {
        result.push('L');
        curL = [y, x];
      }
    }
  }

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

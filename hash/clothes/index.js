/** https://school.programmers.co.kr/learn/courses/30/lessons/42578 */

function solution(clothes) {
  const map = {};

  for (const [_, type] of clothes) {
    map[type] = (map[type] || 0) + 1;
  }

  // 누적값 * (현재 타입의 갯수 + 이 타입을 선택하지 않는 경우) - 모든 타입을 선택하지 않음
  return Object.values(map).reduce((acc, cur) => acc * (cur + 1), 1) - 1;
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
    ['yellow_hat', 'headgear'],
    ['blue_sunglasses', 'eyewear'],
    ['green_turban', 'headgear'],
  ],
  5
);

testSolution(
  [
    ['crow_mask', 'face'],
    ['blue_sunglasses', 'face'],
    ['smoky_makeup', 'face'],
  ],
  3
);

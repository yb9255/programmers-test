function solution(sizes) {
  /** Pseudo Code
        1. 명함 종류를 순회하면서 가로가 세로보다 크면 가로 세로를 바꾼다.
        2. 그 중 가장 큰 값을 구한 뒤 곱한다.
    */

  let maxWidth = 0;
  let maxHeight = 0;

  sizes.forEach(([w, h]) => {
    const [width, height] = w > h ? [w, h] : [h, w];

    if (width > maxWidth) maxWidth = width;
    if (height > maxHeight) maxHeight = height;
  });

  return maxWidth * maxHeight;
}

const testSolution = (input, expected) => {
  const result = solution(input);
  console.log(
    '결과:',
    result === expected
      ? '✅ 통과'
      : `❌ 실패 (기대값: ${expected}, 실제값: ${result})`,
  );
};

testSolution(
  [
    [60, 50],
    [30, 70],
    [60, 30],
    [80, 40],
  ],
  4000,
);

testSolution(
  [
    [10, 7],
    [12, 3],
    [8, 15],
    [14, 7],
    [5, 15],
  ],
  120,
);

testSolution(
  [
    [14, 4],
    [19, 6],
    [6, 16],
    [18, 7],
    [7, 11],
  ],
  133,
);

/** https://school.programmers.co.kr/learn/courses/30/lessons/42842 */

function solution(brown, yellow) {
  /** Pseudo Code
   * 1. 높이는 항상 가로보다 작거나 같으므로, 최대 높이는 Math.sqrt(total)
   * 2. width는 height와 곱할 때 total이 되야 하므로, total / height
   * 최대 높이가 total의 절반을 넘지 않으므로, width >= total;
   * 3. 노란색 영역은 갈색 테두리 영역에서 귀퉁이 부분 4칸을 제외한 길이 * 높이 영역만큼 크기를 가진다.
   * 즉, 노란색 영역의 크기는 (가로 - 2, 세로 - 2)
   * 4. height 높이 3부터 최대 높이까지 순회하면서 width/height 쌍을 구하고,
   * (width - 2) * (height - 2)가 yellow와 일치하는 쌍을 return한다.
   */

  const total = brown + yellow;

  for (let height = 3; height <= Math.sqrt(total); height++) {
    const width = total / height;

    if ((width - 2) * (height - 2) === yellow) {
      return [width, height];
    }
  }
}

const testSolution = (input, expected) => {
  const result = solution(...input);
  console.log(
    '결과:',
    result.toString() === expected.toString()
      ? '✅ 통과'
      : `❌ 실패 (기대값: ${expected}, 실제값: ${result})`
  );
};

testSolution([10, 2], [4, 3]);
testSolution([8, 1], [3, 3]);
testSolution([24, 24], [8, 6]);

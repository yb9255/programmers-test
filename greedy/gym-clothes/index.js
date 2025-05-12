function solution(n, lost, reserve) {
  /** Pseudo Code
    1. lost에서 속한 reserve, reserve에 속한 lost를 전부 제거하고 set으로 바꾼다.
    2. reserveSet을 오름차순으로 정렬한다. 항상 뒷번호가 앞번호한테 우선 빌려줄 수 있도록
    하기 위해 정렬이 필수적으로 필요하다.
    3. reserveSet 값을 순회하면서 reserve의 앞번호가 없으면 우선 빌려주고 lostSet에서 번호를 지운다.
    4. 이 후 reserve의 뒷번호가 없으면 빌려주고 lostSet에서 번호를 지운다.
    5. 도난 당한 학생 목록에서 남은 lost 학생 길이를 리턴한다.
  */

  const lostSet = new Set(lost.filter((l) => !reserve.includes(l)));
  const reserveSet = new Set(reserve.filter((r) => !lost.includes(r)));

  for (const r of [...reserveSet].sort((a, b) => a - b)) {
    if (lostSet.has(r - 1)) {
      lostSet.delete(r - 1);
    } else if (lostSet.has(r + 1)) {
      lostSet.delete(r + 1);
    }
  }

  return n - lostSet.size;
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

testSolution([5, [2, 4], [1, 3, 5]], 5);
testSolution([5, [2, 4], [3]], 4);
testSolution([3, [3], [1]], 2);

function solution(people, limit) {
  /** Pseudo Code
    1. people을 오름차순으로 sort,
    2. left / right 투 포인터로 조합을 찾아나감.
    무거운 사람을 우선 태우고 (right--), 가벼운 사람을 태우는게 가능하면
    태우고 left를 더함.
    3. while문을 반복할때마다 count를 올리고 최종적으로 count를 리턴
  */

  people.sort((a, b) => a - b);

  let left = 0;
  let right = people.length - 1;
  let count = 0;

  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left++;
    }

    right--;
    count++;
  }

  return count;
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

testSolution([[70, 50, 80, 50], 100], 3);
testSolution([[70, 80, 50], 100], 3);

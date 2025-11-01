function solution(priorities, location) {
  /** Pseudo Code
   * 1. priorities를 정렬하여 priorityOrder를 구한다.
   * 2. priorities를 순회하여 index 정보를 가지도록 값을 mapping한다 (indexedPriorities)
   * 3. priorities를 다시 순회하기 시작한다. (i = 0부터)
   * 4. priorities가 highest가 아니라면, 맨 끝에 해당 값을 push하고 다음 index로 넘어간다.
   * 5. priorities가 highest라면 현재 index가 location과 일치하는지 체크한다.
   * 6. 일치하지 않으면 answer를 1 올리고, priorityOrder를 pop하고,
   * 7. 일치하면 answer를 1 올린 다음 리턴한다.
   */

  let answer = 0;
  const priorityOrder = priorities.slice().sort((a, b) => a - b);
  const queue = priorities.map((priority, i) => [priority, i]);
  let front = 0;

  while (front < queue.length) {
    const [priority, index] = queue[front++];

    if (priority === priorityOrder.at(-1)) {
      answer++;
      priorityOrder.pop();

      if (index === location) return answer;
    } else {
      queue.push([priority, index]);
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

testSolution([[2, 1, 3, 2], 2], 1);
testSolution([[1, 1, 9, 1, 1, 1], 0], 5);

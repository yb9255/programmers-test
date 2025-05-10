/** Pseudo Code
  1. citations을 내림차순으로 정렬한다.
  2. 내림차순으로 정렬된 경우, citations[0]시 발표 횟수는 1번, citations[1]의 발표 횟수는 2번..
  이렇게 된다.
  3. 즉 i + 1이 발표횟수, citations[i]가 인용횟수라고 여길 수 있다.
  4. 만약 citations[i]의 인용횟수가 i + 1의 발표횟수보다 작다면, (i + 1)번째 논문은 h-index를 충족하지 못하는 것을 의미
  e.g.) citations[2]가 3보다 작다면, citations[2]에 있는 3번째 논문은 3을 충족하지 못했음을 의미
  5. 따라서 citation[i] < i + 1이 충족되면 그 이전 값인 i가 h-index에 해당하게 된다.
  6. 모든 citation[i]가 저 조건을 만족한다면, h-index는 과학자가 발표한 논문 개수가 된다.
*/

function solution(citations) {
  citations.sort((a, b) => b - a);

  for (let i = 0; i < citations.length; i++) {
    if (citations[i] < i + 1) {
      return i;
    }
  }

  return citations.length;
}

const input = [3, 0, 6, 1, 5];
const output = 3;
const result = solution(input);
console.log(
  '결과:',
  result === output
    ? '✅ 통과'
    : `❌ 실패 (기대값: ${output}, 실제값: ${result})`,
);

const input2 = [3, 3, 3, 4];
const output2 = 3;
const result2 = solution(input2);
console.log(
  '결과:',
  result2 === output2
    ? '✅ 통과'
    : `❌ 실패 (기대값: ${output}, 실제값: ${result})`,
);

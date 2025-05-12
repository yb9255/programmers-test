function solution(N, number) {
  /**
  1. 숫자 N을 i번 사용해 만들 수 있는 수들을 dp[i]에 저장합니다.
     - dp[i]는 Set 자료구조로 중복을 제거합니다.

  2. dp[1]은 숫자 N 하나를 사용한 경우의 수입니다. (예: 5)

  3. dp[i]에는 두 가지 방식으로 값을 추가합니다:
     a. 숫자 이어붙이기: N을 i번 이어붙인 수 (예: i=3 → 555)
     b. 이전 dp[j], dp[i-j]의 조합을 사칙연산(+,-,*,/)으로 합성한 값들

  4. 예시:
     - dp[2] = { 55, 5+5, 5-5, 5*5, 5/5 }
     - dp[3] = dp[1] op dp[2], dp[2] op dp[1]
     - dp[4] = dp[1] op dp[3], dp[2] op dp[2], dp[3] op dp[1]
     - ...
     - dp[5] = dp[1] op dp[4], dp[2] op dp[3], dp[3] op dp[2], dp[4] op dp[1]

  5. 각 i에서 number가 dp[i]에 포함되어 있다면, i를 정답으로 반환합니다.

  6. i는 최대 8까지 확인하며, 8을 넘기면 -1을 반환합니다.
 */
  if (number === N) return 1;

  const dp = Array.from({ length: 9 }, () => new Set());

  for (let i = 1; i <= 8; i++) {
    dp[i].add(+String(N).repeat(i));

    for (let j = 1; j < i; j++) {
      for (const val1 of dp[i - j]) {
        for (const val2 of dp[j]) {
          dp[i].add(val1 + val2);
          dp[i].add(val1 - val2);
          dp[i].add(val1 * val2);
          if (val2) dp[i].add(Math.floor(val1 / val2));
        }
      }
    }

    if (dp[i].has(number)) return i;
  }

  return -1;
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

testSolution([5, 12], 4);
testSolution([2, 11], 3);

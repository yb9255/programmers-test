function solution(word) {
  /** Pseudo Code
    1. 빈 문자열로 시작한다.
    2. 모음 배열을 순회하면서 현재 문자열에 모음을 붙이고 재귀함수를 돈다.
    이 때 count를 올린다.
    3. 모음 배열의 길이가 5가 되면 재귀를 중지한다.
    4. answer를 리턴한다.
  */

  let answer = 0;
  let count = 0;
  const vowels = ['A', 'E', 'I', 'O', 'U'];

  const getCount = (word, target) => {
    if (word === target) {
      answer = count;
      return;
    }

    if (word.length === 5) return;

    for (const char of vowels) {
      count++;
      getCount(word + char, target);
    }
  };

  getCount('', word);
  return answer;
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

testSolution('AAAAE', 6);
testSolution('AAAE', 10);
testSolution('I', 1563);
testSolution('EIO', 1189);

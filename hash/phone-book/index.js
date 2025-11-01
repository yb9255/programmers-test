/** https://school.programmers.co.kr/learn/courses/30/lessons/42577 */

function solution(phone_book) {
  const phoneBook = phone_book.sort();

  for (let i = 1; i < phoneBook.length; i++) {
    if (phoneBook[i].startsWith(phoneBook[i - 1])) {
      return false;
    }
  }

  return true;
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

testSolution(['119', '97674223', '1195524421'], false);
testSolution(['123', '456', '789'], true);
testSolution(['12', '123', '1235', '567', '88'], false);

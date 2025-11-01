/** https://school.programmers.co.kr/learn/courses/30/lessons/42840 */

function solution(answers) {
  const count = [0, 0, 0];
  const answer = [];
  let answerIndex = 0;

  const firstPattern = [1, 2, 3, 4, 5];
  const secondPattern = [2, 1, 2, 3, 2, 4, 2, 5];
  const thirdPattern = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  answers.forEach((answer, index) => {
    if (firstPattern[index % 5] === answer) {
      count[0]++;
    }

    if (secondPattern[index % 8] === answer) {
      count[1]++;
    }

    if (thirdPattern[index % 10] === answer) {
      count[2]++;
    }
  });

  const maxCount = Math.max(...count);

  for (let i = 0; i < 3; i++) {
    if (maxCount === count[i]) {
      answer[answerIndex] = i + 1;
      answerIndex++;
    }
  }

  return answer;
}

function solution(numbers) {
  const maxNum = numbers
    .map(String)
    .sort((a, b) => {
      if (a + b > b + a) return -1;
      if (a + b < b + a) return 1;
    })
    .join('');

  return maxNum[0] === '0' ? '0' : maxNum;
}

const input1 = [6, 10, 2];
const input2 = [3, 30, 34, 5, 9];
const output1 = '6210';
const output2 = '9534330';
const result1 = solution(input1);
const result2 = solution(input2);

console.log(
  '결과1:',
  result1 === output1
    ? '✅ 통과'
    : `❌ 실패 (기대값: ${output1}, 실제값: ${result1})`,
);

console.log(
  '결과2:',
  result2 === output2
    ? '✅ 통과'
    : `❌ 실패 (기대값: ${output2}, 실제값: ${result2})`,
);

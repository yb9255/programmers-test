/** https://school.programmers.co.kr/learn/courses/30/lessons/42628 */

function solution(operations) {
  const arr = [];

  for (const op of operations) {
    const [cmd, val] = op.split(' ');
    const num = +val;

    if (cmd === 'I') {
      arr.push(num);
    } else if (cmd === 'D') {
      if (arr.length === 0) continue;
      arr.sort((a, b) => a - b);
      if (num === 1) arr.pop();
      else arr.shift();
    }
  }

  if (arr.length === 0) return [0, 0];
  arr.sort((a, b) => a - b);
  return [arr[arr.length - 1], arr[0]];
}

const input1 = ['I 16', 'I -5643', 'D -1', 'D 1', 'D 1', 'I 123', 'D -1'];
const input2 = [
  'I -45',
  'I 653',
  'D 1',
  'I -642',
  'I 45',
  'I 97',
  'D 1',
  'D -1',
  'I 333',
];
const output1 = [0, 0].toString();
const output2 = [333, -45].toString();
const result1 = solution(input1).toString();
const result2 = solution(input2).toString();

console.log(
  '결과1:',
  result1 === output1
    ? '✅ 통과'
    : `❌ 실패 (기대값: ${output1}, 실제값: ${result1})`
);

console.log(
  '결과2:',
  result2 === output2
    ? '✅ 통과'
    : `❌ 실패 (기대값: ${output2}, 실제값: ${result2})`
);

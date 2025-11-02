/** https://school.programmers.co.kr/learn/courses/30/lessons/43163 */

function solution(begin, target, words) {
  /** Pseudo Code
    1. BFS로 최단거리를 탐색한다.
    2. begin과 count = 0을 queue에 넣는다. 한글자씩 변환 === 한칸씩 이동 개념으로 생각.
    3. queue가 있는한 while로 순회하면서, words 목록 중 현재와 한글자만 다른 글자들을 찾아 
    queue에 넣는다. 이 때 이미 queue에 넣은 단어는 넘어간다.
    4. target과 단어가 같아질 때 count를 리턴한다.
    5. 가는 방법이 없다면, 0을 리턴한다.
  */

  const visited = Array(words.length).fill(false);
  const queue = [[begin, 0]];

  while (queue.length) {
    const [curWord, count] = queue.shift();

    if (curWord === target) {
      return count;
    }

    words.forEach((word, idx) => {
      if (visited[idx]) return;

      if (isOneCharDifferent(curWord, word)) {
        visited[idx] = true;
        queue.push([word, count + 1]);
      }
    });
  }

  return 0;
}

function isOneCharDifferent(first, second) {
  let count = 0;

  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) count++;
  }

  return count === 1;
}

const testSolution = (begin, target, words, expected) => {
  const result = solution(begin, target, words);
  console.log(
    '결과:',
    result === expected
      ? '✅ 통과'
      : `❌ 실패 (기대값: ${expected}, 실제값: ${result})`
  );
};

testSolution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'], 4);
testSolution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log'], 0);

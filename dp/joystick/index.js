function solution(name) {
  /** Pseudo Code
    1. 현재 인덱스에서 위 / 아래 중 어느 쪽 변경이 더 횟수가 적은지
    charCode로 판단한다. 이 때, A -> Z로 이동하는 경우 1이 추가되기 때문에
    charCode는 90이 아니라 91이 되어야 한다.
    2. 이동거리를 구할때, A가 반복되어서 많은 경우 바꿀 필요가 없기 때문에
    A쪽으로 이동할 필요가 없을 수 있다.
    3. 앞으로 이동하면서 처음 바꿀 알파벳을 만나서 바꾼 후 A가 몰려 돌아가는
    케이스를 구한다. <현재 인덱스 * 2 + 전체 길이 - A의 길이>
    4. 뒤로 우선 이동한 다음 전부 바꾸고 앞 인덱스로 돌아오는 경우를 구합니다.
     <(전체 길이 - A의 길이) * 2 + 현재 인덱스>
  */

  let answer = 0;
  let move = name.length - 1;
  const maxCharCode = 'Z'.charCodeAt();
  const minCharCode = 'A'.charCodeAt();

  for (let i = 0; i < name.length; i++) {
    const charCode = name[i].charCodeAt();
    answer += Math.min(charCode - minCharCode, maxCharCode + 1 - charCode);

    let next = i + 1;
    while (next < name.length && name[next] === 'A') {
      next++;
    }

    move = Math.min(
      move,
      i * 2 + name.length - next,
      (name.length - next) * 2 + i,
    );
  }

  return answer + move;
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

testSolution('JEROEN', 56);
testSolution('JAN', 23);

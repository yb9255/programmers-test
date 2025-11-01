/** https://school.programmers.co.kr/learn/courses/30/lessons/42583 */

function solution(bridge_length, weight, truck_weights) {
  /** Pseudo Code
      1. 다리에 트럭을 올릴 때 answer에 1을 더하고 truck 무게를 더한다.
      2. 다리에서 트럭을 내릴 때 answer에서 1을 뺀다 truck 무게를 뺀다.
      3. 다리에 트럭을 올리기 전, 트럭을 올리면 현재 bridge_length를 초과하는지 체크하고,
      그렇다면 우선 트럭을 내린다.
      4. 트럭 0, 다리 위 무게가 0이 되면 answer를 리턴한다.
    */

  let time = 0;
  let curWeight = 0;
  const bridge = [];
  let bridgeFront = 0;
  let truckFront = 0;

  while (truckFront < truck_weights.length) {
    const truck = truck_weights[truckFront];

    if (bridge.length > 0) {
      for (let i = bridgeFront; i < bridge.length; i++) {
        bridge[i][1]++;
      }

      if (bridge[bridgeFront][1] > bridge_length) {
        curWeight -= bridge[bridgeFront][0];
        bridgeFront++;
      }
    }

    if (bridge.length - bridgeFront < bridge_length) {
      if (curWeight + truck <= weight) {
        bridge.push([truck, 1]);
        curWeight += truck;
        truckFront++;
      }
    }

    time++;
  }

  while (bridgeFront < bridge.length) {
    for (let i = bridgeFront; i < bridge.length; i++) {
      bridge[i][1]++;
    }

    if (bridge[bridgeFront][1] > bridge_length) {
      bridgeFront++;
    }

    time++;
  }

  return time;
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

testSolution([2, 10, [7, 4, 5, 6]], 8);
testSolution([100, 100, [10]], 101);
testSolution([100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]], 110);

function solution(genres, plays) {
  /** Pseudo Code
   * 1. genres와 plays의 정보를 합친다. (playsInfo)
   * 이 때 playsInfo는 { <genre>: [<{play, index}>]} 형태로 저장하며, music의
   * 정렬은 재생순으로 하며 배열 내 play와 값이 같은 새로운 play는 무시한다.
   * 2. genres를 재생횟수별로 map에 담고 배열로 정렬한다.(genresCountMap, sortedGenresList)
   * 3. 정답 배열에 sortedGenresList 순으로 playsInfo의 배열에서 index만 필터해서 push한다.
   */

  const playsInfo = {};
  const genreCountMap = {};
  const answer = [];

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    const play = plays[i];

    if (!playsInfo[genre]) {
      playsInfo[genre] = [[play, i]];
      continue;
    }

    const [topRankedPlayInfo, secondRankedPlayInfo] = playsInfo[genre];

    if (topRankedPlayInfo[0] < play) {
      playsInfo[genre][0] = [play, i];
      playsInfo[genre][1] = topRankedPlayInfo;
    } else if (!secondRankedPlayInfo) {
      playsInfo[genre].push([play, i]);
    } else if (secondRankedPlayInfo[0] < play) {
      playsInfo[genre][1] = [play, i];
    }
  }

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    genreCountMap[genre] = (genreCountMap[genre] || 0) + plays[i];
  }

  const sortedGenresList = Object.entries(genreCountMap)
    .sort((a, b) => b[1] - a[1])
    .map(([genre]) => genre);

  sortedGenresList.forEach((genre) =>
    answer.push(...playsInfo[genre].map((playInfo) => playInfo[1]))
  );

  return answer;
}

const testSolution = (input, expected) => {
  const result = solution(...input);
  console.log(
    '결과:',
    result.toString() === expected.toString()
      ? '✅ 통과'
      : `❌ 실패 (기대값: ${expected}, 실제값: ${result})`
  );
};

testSolution(
  [
    ['classic', 'pop', 'classic', 'classic', 'pop'],
    [500, 600, 150, 800, 2500],
  ],
  [4, 1, 3, 0]
);

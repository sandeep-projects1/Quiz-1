


export const categoryNames = {
  1: 'LONG TEST CATEGORY 1',
  2: 'TEGORY 2',
  3: 'LONG TEST 3',
  4: 'CATEGORY 4',
  5: 'LONG 5',
  6: 'LONG CATEGORY 6',
  7: 'CATEGORY 7',
  8: 'LONG TEST CATEGORY 8',
};

export const questions = {
  // Repeat similarly for categories 1 to 8
  ...Object.fromEntries(
    Array.from({ length: 8 }, (_, i) => i + 1).flatMap((cat) =>
      Array.from({ length: 10 }, (_, j) => {
        const points = (j + 1) * 10;
        return [
          `Category ${cat}-${points}`,
          {
            q: `Sample question ${j + 1} for Category ${cat}`,
            a: `Sample answer ${j + 1}`,
          },
        ];
      })
    )
  ),
};

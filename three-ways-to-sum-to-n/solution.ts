function sum_to_n_a(n: number): number {
  // your code here
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

function sum_to_n_b(n: number): number {
  // your code here
  return (n * (n + 1)) / 2;
}

function sum_to_n_c(n: number): number {
  // your code here
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (acc, curr) => acc + curr,
    0
  );
}

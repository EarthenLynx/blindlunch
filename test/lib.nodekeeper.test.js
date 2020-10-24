const Nodekeeper = require("../lib/class/nodekeeper");

test('Check if nodekeerp creates a correct random ID', () => {
  const n = new Nodekeeper()

  expect(n.create(12)).toBeTruthy();
})

test('Check if process ID gets properly saved in the process env', () => {
  const n = new Nodekeeper();

  const pair = n.set(20);
  console.log(process.env[pair.key]);
  console.log(pair.key);
  console.log(pair.value);
  expect(process.env[pair.key]).toBe(pair.value)
})
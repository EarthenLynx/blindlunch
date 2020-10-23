const testStrings = [
  "The clever fox jumps over the lazy dog",
  "My cat is a nightmare",
  "Every ferret has a right to live"
];
const testArrays = [
  [123, true, "Foo"],
  ["bar", 456],
  [true, undefined, "false"]];
const testObjects = [
  {},
  { foo: "bar" },
  { object: "myObj", arr: ['my', 'array'] }
];
const testEmptyVars = ["", [], {}]
const testBools = [true, false];
const testBoolsTruthy = [true, "true", 123];
const testBoolsFalsey = [false, undefined, null]
const testMails = [];

module.exports = { testStrings, testArrays, testObjects, testEmptyVars, testBools, testBoolsTruthy, testBoolsFalsey, testMails }
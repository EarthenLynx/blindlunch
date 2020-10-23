const Verificator = require("../lib/class/verificator");

const { testStrings, testArrays, testObjects, testEmptyVars, testBools, testBoolsTruthy, testBoolsFalsey, testMails } = require("./inputs");

test('Check if strings are properly recognized', () => {
  const v = new Verificator("test")

  // Check for string
  testStrings.forEach(el => expect(v.string(el).check()).toBeTruthy());
  testMails.forEach(el => expect(v.string(el).check()).toBeTruthy())

  // Counterchecks
  testArrays.forEach(el => expect(v.string(el).check()).toBeFalsy());
  testObjects.forEach(el => expect(v.string(el).check()).toBeFalsy());
})

test('Check if arrays are properly recognized', () => {
  const v = new Verificator("test")

  // Check for array
  testArrays.forEach(el => expect(v.array(el).check()).toBeTruthy());

  // Counterchecks
  testStrings.forEach(el => expect(v.array(el).check()).toBeFalsy());
  testMails.forEach(el => expect(v.array(el).check()).toBeFalsy())
})

test('Check if objects are properly recognized', () => {
  const v = new Verificator("test")

  // Check for object
  testObjects.forEach(el => expect(v.object(el).check()).toBeTruthy());

  // Counterchecks
  testStrings.forEach(el => expect(v.object(el).check()).toBeFalsy());
  testBoolsFalsey.forEach(el => expect(v.object(el).check()).toBeFalsy())
});

test('Check if booleans are properly recognized', () => {
  const v = new Verificator("test")

  // Check for booleans
  testBools.forEach(el => expect(v.boolean(el)).toBeTruthy());
});

test('Check if email verification is working', () => {
  const v = new Verificator("test")

  // Check for several emails
  testMails.forEach(el => expect(v.email(el).check()).toBeTruthy());

  // Counterchecks
  testObjects.forEach(el => expect(v.email(el).check()).toBeFalsy());
  testBoolsFalsey.forEach(el => expect(v.email(el).check()).toBeFalsy())
});

test('Check if empty value for strings and arrays is working', () => {
  const v = new Verificator('test');

  expect(v.filled('').check()).toBeFalsy();
})

test('Check if empty value check for arrays and objects is working', () => {
  const v = new Verificator("test")

  // Check for several empty types
  testEmptyVars.forEach(el => expect(v.empty(el).check()).toBeTruthy());

  // Counterchecks
  testStrings.forEach(el => expect(v.empty(el).check()).toBeFalsy());
  testArrays.forEach(el => expect(v.empty(el).check()).toBeFalsy());
  testObjects.forEach(el => expect(v.empty(el).check()).toBeFalsy());
})
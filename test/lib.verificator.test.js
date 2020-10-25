const Verificator = require("../lib/class/verificator");

const { testStrings, testArrays, testObjects, testEmptyVars, testBools, testTinyInts, testBoolsFalsey, testMails, } = require("./inputs");

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

test('Check if tinyint are properly recognized', () => {
  const v = new Verificator("test")

  testTinyInts.forEach(el => expect(v.tinyInt(el)).toBeTruthy());

  // Counterchecks
  testStrings.forEach(el => expect(v.object(el).check()).toBeFalsy());
  testObjects.forEach(el => expect(v.email(el).check()).toBeFalsy());
})
// TODO: Check if tinyint are properly recognized

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

test('Check if two equal values are strictly distinct', () => {
  const v = new Verificator("test"); 

  expect(v.equal('One', 'One').check()).toBeTruthy(); 
  expect(v.equal(1, 1).check()).toBeTruthy();
  expect(v.equal(true, true).check()).toBeTruthy();
  
  expect(v.equal(false, 'false').check()).toBeFalsy(); 
  expect(v.equal(1, '1').check()).toBeFalsy(); 
  expect(v.equal("one", 'One').check()).toBeFalsy(); 
}); 

test('Check if two non-equal values are recognized properly', () => {
  const v = new Verificator("test"); 
  
  expect(v.notequal(false, 'false').check()).toBeTruthy(); 
  expect(v.notequal(1, '1').check()).toBeTruthy(); 
  expect(v.notequal("one", 'One').check()).toBeTruthy(); 

  expect(v.notequal('One', 'One').check()).toBeFalsy(); 
  expect(v.notequal(1, 1).check()).toBeFalsy();
  expect(v.notequal(true, true).check()).toBeFalsy();
})
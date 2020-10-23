const Verificator = require("../lib/verificator");

test('Check if strings are properly recognized', () => {
  const v = new Verificator("test")

  // Check for several strings
  expect(v.string("My string").check()).toBeTruthy();
  expect(v.string("my_otherstring").check()).toBeTruthy();

  // Counterchecks
  expect(v.string(123).check()).toBeFalsy();
  expect(v.string(true).check()).toBeFalsy();
  expect(v.string(new Object({ value: "String" })).check()).toBeFalsy();
  expect(v.string([]).check()).toBeFalsy();
})

test('Check if arrays are properly recognized', () => {
  const v = new Verificator("test")

  // Check for several strings
  expect(v.array(['one', 2, true]).check()).toBeTruthy();
  expect(v.array([]).check()).toBeTruthy();
  expect(v.array(new Array()).check()).toBeTruthy();

  // Counterchecks
  expect(v.array(123).check()).toBeFalsy();
  expect(v.array(true).check()).toBeFalsy();
  expect(v.array(new String("String")).check()).toBeFalsy();
  expect(v.array({}).check()).toBeFalsy();
})

test('Check if objects are properly recognized', () => {
  const v = new Verificator("test")

  // Check for several strings
  expect(v.object({ that: 'mine', foo: 'bar' }).check()).toBeTruthy();
  expect(v.object({ that: 'mine', foo: 123 }).check()).toBeTruthy();
  expect(v.object(new Object({ that: 'mine', foo: 123 })).check()).toBeTruthy();

  // Counterchecks
  expect(v.object(123).check()).toBeFalsy();
  expect(v.object(true).check()).toBeFalsy();
  expect(v.object(new String("String")).check()).toBeFalsy();
  expect(v.object([]).check()).toBeFalsy();
});

test('Check if booleans are properly recognized', () => {
  const v = new Verificator("test")

  // Check for several strings
  expect(v.boolean(true).check()).toBeTruthy();
  expect(v.boolean(false).check()).toBeTruthy();

  // Counterchecks
  expect(v.boolean(123).check()).toBeFalsy();
  expect(v.boolean('This is a string').check()).toBeFalsy();
  expect(v.boolean(new String("String")).check()).toBeFalsy();
  expect(v.boolean([]).check()).toBeFalsy();
});

test('Check if email verification is working', () => {
  const v = new Verificator("test")

  // Check for several emails
  expect(v.email("t.quante@gmx.net").check()).toBeTruthy();
  expect(v.email("ms@outlook.de").check()).toBeTruthy();
  expect(v.email("my_mail@gmail.net").check()).toBeTruthy();

  // Counterchecks
  expect(v.email("No Email").check()).toBeFalsy();
  expect(v.email(123).check()).toBeFalsy();
  expect(v.email(true).check()).toBeFalsy();
  expect(v.email({ email: "t.quante@gmx.net" }).check()).toBeFalsy();
});

test('Check if empty value check for arrays and objects is working', () => {
  const v = new Verificator("test")

  // Check for several empty types
  expect(v.empty({}).check()).toBeTruthy();
  expect(v.empty([]).check()).toBeTruthy();

  // Counterchecks
  expect(v.empty({ one: "two" }).check()).toBeFalsy();
  expect(v.empty(["one", 2, true]).check()).toBeFalsy();
})
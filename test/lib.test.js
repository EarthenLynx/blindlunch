const Verificator = require("../lib/verificator");

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

test('Check if strings are properly recognized', () => {
  const v = new Verificator("test")

  // Check for several strings
  expect(v.string("My string").check()).toBeTruthy();
  expect(v.string("my_otherstring").check()).toBeTruthy();
  expect(v.string(new String('New String')).check()).toBeTruthy();

  // Counterchecks
  expect(v.string(123).check()).toBeFalsy();
  expect(v.string(true).check()).toBeFalsy();
  expect(v.string(new Object({ value: "String" })).check()).toBeFalsy();
  expect(v.string([]).check()).toBeFalsy();
})
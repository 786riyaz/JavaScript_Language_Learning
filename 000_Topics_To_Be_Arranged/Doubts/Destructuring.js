// Please explain the code below and also explain the destructuring assignment in JavaScript.
const profile = {
  firstName: "Julian",
  lastName: "Anthony",
  website: "Sharpener",
};
const { firstName: forename, lastName: surname, website: onlineSite } = profile;
console.log(forename, surname, onlineSite);
// ============================================
const profile = {
  lastName: { familyName: "Smith" },
};
const {
  lastName: { familyName: surname },
} = profile;
console.log(surname);
// ============================================
const users = [
  { name: "Julian", age: 30 },
  { name: "Anthony", age: 25 },
];
const [{ name: firstUserName, age: firstUserAge }, { name: secondUserName, age: secondUserAge }] = users;
console.log(firstUserName, firstUserAge, secondUserName, secondUserAge);
// ============================================
const student = {
  name: "Julian",
  age: 30,
  city: "New York",
  class: "10",
  subjects: ["Math", "Science", "History"],
};
const {name ,age, ...restDetails} = student;
console.log(name, age, restDetails);
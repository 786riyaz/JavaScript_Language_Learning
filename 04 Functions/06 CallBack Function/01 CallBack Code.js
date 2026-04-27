// Callback code
var output = document.getElementById("output");

function makeMessage(s1, s2, callback) {
  var result1 = callback(s1, s2);
  output.innerHTML += result1;
}
(makeMessage("hello", "world", function (s1, s2) {
  var result2 = s1 + s2 + "worked";
  return result2;
}),
  makeMessage("Java", "Script", function (s1, s2) {
    var result2 = s1 + s2 + " is great" + s1;
    return result2;
  }));

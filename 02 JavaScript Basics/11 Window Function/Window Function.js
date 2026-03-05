// Window Object Methods 👨‍💻 
var output = document.getElementById("wrapper");
console.dir(window);

for (var prop in window) {
  document.write(prop + " " + window[prop] + "<br>");
}
output.innerHTML += window.innerHeight + " " + window.innerWidth;

function goBack() {
  window.history.go(-1);
}

// Print, prompt is a Builtin Function
print();
prompt();

// Navigator object
console.dir(Navigator)
// To Know user Agent
var output = document.getElementById("wrapper");
output.innerHTML = navigator.userAgent;

// DOM Traversing
document.body.children
document.body.children[3].innerHTML = "Google"
document.body.children[4].children[1].children[1].name
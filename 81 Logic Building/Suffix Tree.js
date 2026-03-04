import color from "colors";
/*
  Function: buildSuffixTree
  Purpose:
    Creates a suffix tree (object based) for a given word.

  Example:
    Input  : "banana"
    Output : Nested object representing all suffixes

  Suffixes of "banana":
    banana
    anana
    nana
    ana
    na
    a
*/

function buildSuffixTree(word) {
  const tree = {};

  for (let start = 0; start < word.length; start++) {
    console.log("==================================================================================");
    console.log("Building suffix starting at index ", start, " ||| Tree so far:", JSON.stringify(tree).green);

    let node = tree;

    for (let index = start; index < word.length; index++) {
      const char = word[index];
      console.log("Processing character :", char.yellow, " ||| Current node :", JSON.stringify(node).red);

      if (!node[char]) {
        node[char] = {};
        console.log(`Adding '${char}'`.green, "to current node. New node created:", JSON.stringify(node[char]).cyan);
      }

      node = node[char];
      console.log("Moved to node for character :", char.yellow, " ||| Current node after move:", JSON.stringify(node).red, "||| Tree so far: ", JSON.stringify(tree).bgGreen);
    }
    console.log("\nFinished processing suffix starting at index ", start,"||| Node ::", JSON.stringify(node).bgYellow, "||| Tree so far: ", JSON.stringify(tree).bgGreen);
  }

  return tree;
}



// ===== Example Usage =====
const result = buildSuffixTree("banana");

// console.log(JSON.stringify(result, null, 2));

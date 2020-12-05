const fs = require("fs");

function initTree(lMarker, uMarker, node, span, isALeaf) {
  node["span"] = span;

  if (isALeaf) {
    node["isLeaf"] = true;
    return node;
  }

  var split = span.split("-");
  var lowerLow = parseInt(split[0]);
  var higherHigh = parseInt(split[1]);
  var diff = Math.abs((higherHigh - lowerLow) / 2);
  var lowerHigh = diff === 1 ? lowerLow : lowerLow + Math.floor(Math.abs((parseInt(split[0]) - parseInt(split[1])) / 2));
  var higherLow = diff === 1 ? higherHigh : lowerHigh + 1;
  var isFrontLeaf = Math.abs(lowerHigh - lowerLow) === 0;
  var isBackLeaf = Math.abs(higherHigh - higherLow) === 0;
  var frontSpan = !isFrontLeaf ? `${lowerLow}-${lowerHigh}` : `${lowerLow}`;
  var backSpan = !isBackLeaf ? `${higherLow}-${higherHigh}` : `${higherLow}`;

  node[lMarker] = initTree(lMarker, uMarker, {}, frontSpan, isFrontLeaf);
  node[uMarker] = initTree(lMarker, uMarker, {}, backSpan, isBackLeaf);
  return node;
}

let searchTree = (tree, code) => {
  var sep = code.split("");
  var i;
  var currNode = tree;
  for (i = 0; i < sep.length; i++) {
    currNode = currNode[sep[i]];
  }
  return currNode.span;
}

let process = inp => {
  var rowTree = initTree("F", "B", {}, "0-127", false);
  var colTree = initTree("L", "R", {}, "0-7", false);

  var ids = inp.split("\r\n")
    .reduce((acc,it) => {
      var rowNumber = parseInt(searchTree(rowTree, it.substring(0,7)));
      var colNumber = parseInt(searchTree(colTree, it.substring(7,it.length)));
      var id = (rowNumber * 8) + colNumber;
      acc.add(id);
      return acc;
    }, new Set());

    var min = Math.min.apply(Math, Array.from(ids));
    var max = Math.max.apply(Math, Array.from(ids));
    var i;

    for (i = min; i < max; i++) {
      if (!ids.has(i)) {
        break;
      }
    }

    return i;

}

var t = fs.readFileSync("./resources/day5.txt", 'utf-8');
console.log("Missing: " + process(t));
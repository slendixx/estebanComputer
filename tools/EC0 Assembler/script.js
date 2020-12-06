function assemble() {
  //Spread the source code line by line
  const source = [...sourceCode.value.split("\n")];
  parse(source);
}
function parse(source) {
  let tokens = [];
  let tokensRight = [];
  let line = "";
  let right = "";
  for (let l = 0; l < source.length; l++) {
    line = source[l];
    [line] = line.split("\n");
    [line] = line.split("#");
    if (line === "" || line === "\n") continue;
    if (line.includes("//")) {
      [line, right] = line.split("//");
      tokens = [line.split(/\s+/)];
      tokensRight = [right.split(/\s+/)];
      determineCase(tokens);
      determineCase(tokensRight);
    } else {
      tokens = [line.split(/\s+/)];
      determineCase(tokens);
    }
    //Determine with what type of line we're dealing with
  }
}
function determineCase(tokens) {
  if (tokens.length === 2 && tokenIsDirective(tokens[0])) {
    //.org arg
  } else if (tokens.length === 2 && !tokenIsDirective(tokens[0])) {
    //space inst
  }else if (tokens.length === 3 && !tokenIsDirective(tokens[1])) {
    //.org arg space
  }
}
function tokenIsDirective(token) {
  if (token === ".org") return true;
  else return false;
}
function isSingleArgInstruction(token) {
  switch (token) {
    case "st":
      break;
    case "call":
      break;
    case "jump":
      break;
    case "ba":
      break;
    case "be":
      break;
    case "bneg":
      break;
    case "bo":
      break;
    case "bc":
      break;

    //Add more single argument instructions when implemented here...
  }
}
function addSymbol(table, { id = "null", size = -1, address = -1 }) {
  table.push({
    id: id,
    size: size,
    address: address,
  });
}
function translate() {}

const [sourceCode, machine, loader] = document.querySelectorAll("textarea");
const [btnAssemble, btnLoader] = document.querySelectorAll("button");
const output = document.getElementById("output");

btnAssemble.addEventListener("click", assemble);

const symbolTable = [];
let programAddressPointer = 0;

// Tokenize string at any kind of whitespace
// const str = "abc    def ghi";
// const tokens = [...str.split(/[ ]+/)];
// console.log(tokens);
// console.log(`${tokens.length === 1 ? true : false}`);

// check if string only contains digits
// /^\d+$/.test(val)

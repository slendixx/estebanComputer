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
      tokens = [...line.split(/\s+/)];
      tokensRight = [...right.split(/\s+/)];
      console.log(tokens);
      console.log(tokens.length);
      console.log(tokensRight);
      console.log(tokensRight.length);
      determineCase(tokens);
      determineCase(tokensRight);
    } else {
      tokens = [...line.split(/\s+/)];
      console.log(tokens);
      console.log(tokens.length);
      determineCase(tokens);
    }
    //Determine with what type of line we're dealing with
  }
}
function determineCase(tokens) {
  if (isBeg(tokens.length === 1 && tokens[0])) {
    console.log(".beg");
  } else if (tokens.length === 1 && isEnd(tokens[0])) {
    console.log(".end");
  } else if (tokens.length === 2 && isBeg(tokens[0])) {
    console.log(".beg \\s");
  } else if (tokens.length === 2 && isEnd(tokens[0])) {
    console.log(".end \\s");
  } else if (tokens.length === 2 && isOrg(tokens[0])) {
    console.log(".org arg");
  } else if (tokens.length === 2 && isNoArgInstruction(tokens[1])) {
    console.log("\\s noArgInst");
  } else if (tokens.length === 2 && isConstant(tokens[1])) {
    console.log("\\s const");
  }
  //Gotta come up with unique conditions for these cases
  else if (tokens.length === 3) {
    console.log("\\s const \\s");
  } else if (tokens.length === 3) {
    console.log("\\s label: const");
  } else if (tokens.length === 3) {
    console.log(".org arg \\s");
  } else if (tokens.length === 3) {
    console.log("\\s noArgInst \\s");
  } else if (tokens.length === 3) {
    console.log("\\s singleArgInst arg");
  } else if (tokens.length === 4) {
    console.log("\\s label: const \\s");
  } else if (tokens.length === 4) {
    console.log("\\s singleArgInst arg \\s");
  } else if (tokens.length === 4) {
    console.log("\\s doubleArgInst arg1 arg2");
  } else if (tokens.length === 4) {
    console.log("\\s label: singleArgInst arg");
  } else if (tokens.length === 5) {
    console.log("\\s doubleArgInst arg1 arg2 \\s");
  } else if (tokens.length === 5) {
    console.log("\\s label: singleArgInst arg \\s");
  } else if (tokens.length === 5) {
    console.log("\\s label: doubleArgInst arg1 arg2");
  } else if (tokens.length === 6) {
    console.log("\\s label: doubleArgInst arg1 arg2 \\s");
  }
  //Depending on these 20 cases, a diferent parsing and translation process is applied
}
function isBeg(token) {
  return token === ".beg" ? true : false;
}
function isEnd(token) {
  return token === ".end" ? true : false;
}
function isOrg(token) {
  return token === ".org" ? true : false;
}
function isNoArgInstruction(token) {
  switch (token) {
    case "add":
    case "sub":
    case "or":
    case "and":
    case "not":
      return true;
    default:
      return false;
  }
}
function isSingleArgInstruction(token) {
  switch (token) {
    case "st":
    case "call":
    case "jump":
    case "ba":
    case "be":
    case "bneg":
    case "bo":
    case "bc":
      return true;
    default:
      return false;
    //Add more single argument instructions when implemented here...
  }
}
function isDoubleArgInstruction(token) {
  switch (token) {
    case "ld":
    case "ldc":
      return true;
    default:
      return false;
  }
}
function isConstant(token) {
  return /^\d+$/.test(token);
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

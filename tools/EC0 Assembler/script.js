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
    if (line === "" || line === "\n" || /^\s+$/.test(line)) continue;
    if (line.includes("//")) {
      [line, right] = line.split("//");
      tokens = [...line.split(/\s+/)];
      tokensRight = [...right.split(/\s+/)];
      determineCase(tokens, l);
      determineCase(tokensRight, l);
    } else {
      tokens = [...line.split(/\s+/)];
      determineCase(tokens, l);
    }
    //Determine with what type of line we're dealing with
  }
}
function determineCase(tokens, line) {
  if (isBeg(tokens.length === 1 && tokens[0])) {
    console.log(`${line + 1}: ` + ".beg");
  } else if (tokens.length === 1 && isEnd(tokens[0])) {
    console.log(`${line + 1}: ` + ".end");
  } else if (tokens.length === 2 && isBeg(tokens[0])) {
    console.log(`${line + 1}: ` + ".beg \\s");
  } else if (tokens.length === 2 && isEnd(tokens[0])) {
    console.log(`${line + 1}: ` + ".end \\s");
  } else if (tokens.length === 2 && isOrg(tokens[0]) && isConst(tokens[1])) {
    console.log(`${line + 1}: ` + ".org arg");
  } else if (tokens.length === 2 && isNoArgInstruction(tokens[1])) {
    console.log(`${line + 1}: ` + "\\s noArgInst");
  } else if (tokens.length === 2 && isConst(tokens[1])) {
    console.log(`${line + 1}: ` + "\\s const");
  }
  //Gotta come up with unique conditions for these cases
  else if (tokens.length === 3 && !isOrg(tokens[0]) && isConst(tokens[1])) {
    console.log(`${line + 1}: ` + "\\s const \\s");
  } else if (tokens.length === 3 && isLabel(tokens[1]) && isConst(tokens[2])) {
    console.log(`${line + 1}: ` + "\\s label: const");
  } else if (tokens.length === 3 && isOrg(tokens[0]) && isConst(tokens[1])) {
    console.log(`${line + 1}: ` + ".org arg \\s");
  } else if (tokens.length === 3 && isNoArgInstruction(tokens[1])) {
    console.log(`${line + 1}: ` + "\\s noArgInst \\s");
  } else if (tokens.length === 3 && isSingleArgInstruction(tokens[1])) {
    console.log(`${line + 1}: ` + "\\s singleArgInst arg");
  } else if (
    tokens.length === 4 &&
    isLabel(tokens[1]) &&
    isConst([tokens[2]])
  ) {
    console.log(`${line + 1}: ` + "\\s label: const \\s");
  } else if (tokens.length === 4 && isSingleArgInstruction(tokens[1])) {
    console.log(`${line + 1}: ` + "\\s singleArgInst arg \\s");
  } else if (tokens.length === 4 && isDoubleArgInstruction(tokens[1])) {
    console.log(`${line + 1}: ` + "\\s doubleArgInst arg1 arg2");
  } else if (
    tokens.length === 4 &&
    isLabel(tokens[1]) &&
    isSingleArgInstruction(tokens[2])
  ) {
    console.log(`${line + 1}: ` + "\\s label: singleArgInst arg");
  } else if (tokens.length === 5 && isDoubleArgInstruction(tokens[1])) {
    console.log(`${line + 1}: ` + "\\s doubleArgInst arg1 arg2 \\s");
  } else if (
    tokens.length === 5 &&
    isLabel(tokens[1]) &&
    isSingleArgInstruction(tokens[2])
  ) {
    console.log(`${line + 1}: ` + "\\s label: singleArgInst arg \\s");
  } else if (
    tokens.length === 5 &&
    isLabel(tokens[1]) &&
    isDoubleArgInstruction(tokens[2])
  ) {
    console.log(`${line + 1}: ` + "\\s label: doubleArgInst arg1 arg2");
  } else if (
    tokens.length === 6 &&
    isLabel(tokens[1]) &&
    isDoubleArgInstruction(tokens[2])
  ) {
    console.log(`${line + 1}: ` + "\\s label: doubleArgInst arg1 arg2 \\s");
  } else {
    updateFeedback(`Syntax error at line: ${line + 1}.`);
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
    case "lda":
    case "ldc":
      return true;
    default:
      return false;
  }
}
function isConst(token) {
  return /^\d+$/.test(token);
}
function isLabel(token) {
  return token.includes(":");
}
function updateFeedback(msg) {
  feedback.textContent = msg;
}
function addSymbol(table, { id = "null", size = -1, address = -1 }) {
  table.push({
    id: id,
    size: size,
    address: address,
  });
}
function translate() {}

const [, sourceCode, machine, loader] = document.querySelectorAll("textarea");
const [btnAssemble, btnCopy] = document.querySelectorAll("button");
const feedback = document.getElementById("feedback");

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

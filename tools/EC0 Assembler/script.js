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
      determineCase(tokens, l, false);
      determineCase(tokensRight, l, true);
    } else {
      tokens = [...line.split(/\s+/)];
      determineCase(tokens, l, false);
    }
    ++programPointer;
  }
}
function determineCase(tokens, line, isRightInstruction) {
  if (isBeg(tokens.length === 1 && isBeg(tokens[0]))) {
    // console.log(`${line + 1}: ` + ".beg");
  } else if (tokens.length === 1 && isEnd(tokens[0])) {
    // console.log(`${line + 1}: ` + ".end");
  } else if (tokens.length === 2 && isBeg(tokens[0])) {
    // console.log(`${line + 1}: ` + ".beg \\s");
  } else if (tokens.length === 2 && isEnd(tokens[0])) {
    // console.log(`${line + 1}: ` + ".end \\s");
  } else if (tokens.length === 2 && isOrg(tokens[0]) && isConst(tokens[1])) {
    // console.log(`${line + 1}: ` + ".org arg");
    setProgramPointer(Number(tokens[1]));
  } else if (tokens.length === 2 && isNoArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s noArgInst");
    if (!isRightInstruction) {
      incCurrentSymbolSize();
    }
  } else if (tokens.length === 2 && isConst(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s const");
    if (!isRightInstruction) {
      incCurrentSymbolSize();
    }
  }
  //Gotta come up with unique conditions for these cases
  else if (tokens.length === 3 && !isOrg(tokens[0]) && isConst(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s const \\s");
    if (!isRightInstruction) {
      incCurrentSymbolSize();
    }
  } else if (tokens.length === 3 && isLabel(tokens[1]) && isConst(tokens[2])) {
    // console.log(`${line + 1}: ` + "\\s label: const");
    if(!isRightInstruction){
      addSymbol();
      setCurrentSymbol()
    }
  } else if (tokens.length === 3 && isOrg(tokens[0]) && isConst(tokens[1])) {
    // console.log(`${line + 1}: ` + ".org arg \\s");
    setProgramPointer(Number(tokens[1]));
  } else if (tokens.length === 3 && isNoArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s noArgInst \\s");
    if (!isRightInstruction) {
      incCurrentSymbolSize();
    }
  } else if (tokens.length === 3 && isSingleArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s singleArgInst arg");
    if (!isRightInstruction) {
      incCurrentSymbolSize();
    }
  } else if (
    tokens.length === 4 &&
    isLabel(tokens[1]) &&
    isConst([tokens[2]])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: const \\s");
    if (!isRightInstruction) {
      addSymbol();
      setCurrentSymbol()
    }
  } else if (tokens.length === 4 && isSingleArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s singleArgInst arg \\s");
    if (!isRightInstruction) {
      incCurrentSymbolSize();
    }
  } else if (tokens.length === 4 && isDoubleArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s doubleArgInst arg1 arg2");
    if (!isRightInstruction) {
      incCurrentSymbolSize();
    }
  } else if (
    tokens.length === 4 &&
    isLabel(tokens[1]) &&
    isSingleArgInstruction(tokens[2])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: singleArgInst arg");
    if (!isRightInstruction) {
      addSymbol();
      setCurrentSymbol()
    }
  } else if (tokens.length === 5 && isDoubleArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s doubleArgInst arg1 arg2 \\s");
    if (!isRightInstruction) {
      incCurrentSymbolSize();
    }
  } else if (
    tokens.length === 5 &&
    isLabel(tokens[1]) &&
    isSingleArgInstruction(tokens[2])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: singleArgInst arg \\s");
    if (!isRightInstruction) {
      addSymbol();
      setCurrentSymbol()
    }
  } else if (
    tokens.length === 5 &&
    isLabel(tokens[1]) &&
    isDoubleArgInstruction(tokens[2])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: doubleArgInst arg1 arg2");
    if (!isRightInstruction) {
      addSymbol();
      setCurrentSymbol()
    }
  } else if (
    tokens.length === 6 &&
    isLabel(tokens[1]) &&
    isDoubleArgInstruction(tokens[2])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: doubleArgInst arg1 arg2 \\s");
    if (!isRightInstruction) {
      addSymbol();
      setCurrentSymbol()
    }
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
function setProgramPointer() {}
function incCurrentSymbolSize() {}
function addSymbol({ id = "null", size = -1, address = -1 }) {
  symbolTable.push({
    id: id,
    size: size,
    address: address,
  });
}
function setCurrentSymbol(id){
  for(let s = 0; s < symbolTable.length.s++){
    
  }
}

function translateBeg(tokens) {}
function translateEnd(tokens) {}
function translateOrg(tokens) {}
function translateNoArgInstruction(tokens) {}
function translateSingleArgInstruction(tokens) {}
function translateDoubleArgInstruction(tokens) {}

const [, sourceCode, machine, loader] = document.querySelectorAll("textarea");
const [btnAssemble, btnCopy] = document.querySelectorAll("button");
const feedback = document.getElementById("feedback");

btnAssemble.addEventListener("click", assemble);

const symbolTable = [];
let programPointer = 0;

// Tokenize string at any kind of whitespace
// const str = "abc    def ghi";
// const tokens = [...str.split(/[ ]+/)];
// console.log(tokens);
// console.log(`${tokens.length === 1 ? true : false}`);

// check if string only contains digits
// /^\d+$/.test(val)

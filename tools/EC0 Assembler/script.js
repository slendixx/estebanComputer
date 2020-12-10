function assemble() {
  //Spread the source code line by line
  const source = [...sourceCode.value.split("\n")];
  parse(source);

  console.table(symbolTable);
}
function parse(source) {
  let tokens = [];
  let tokensRight = [];
  let line = "";
  let right = "";
  let programPointerIncAmount;
  for (let l = 0; l < source.length; l++) {
    line = source[l];
    [line] = line.split("\n");
    [line] = line.split("#");
    if (line === "" || line === "\n" || /^\s+$/.test(line)) continue;
    if (line.includes("//")) {
      [line, right] = line.split("//");
      tokens = [...line.split(/\s+/)];
      tokensRight = [...right.split(/\s+/)];
      determineCase(tokens, l, true, false);
      determineCase(tokensRight, l, true, true);
    } else {
      tokens = [...line.split(/\s+/)];
      determineCase(tokens, l, false, false);
    }
    ++programPointer;
  }
}
function determineCase(tokens, line, rightInstruction, isRightInstruction) {
  programPointerIncAmount = 1;
  //if (line === 6) debugger;
  // console.log(
  //   `line: ${line}, tokens: ${tokens}, ${
  //     tokens.length === 6 &&
  //     isLabel(tokens[1]) &&
  //     isDoubleArgInstruction(tokens[2])
  //   }, ${!isRightInstruction && !isOnSymbolTable(tokens[1])}`
  // );

  if (isBeg(tokens.length === 1 && isBeg(tokens[0]))) {
    // console.log(`${line + 1}: ` + ".beg");
    beginLine = line;
  } else if (tokens.length === 1 && isEnd(tokens[0])) {
    // console.log(`${line + 1}: ` + ".end");
    endLine = line;
  } else if (tokens.length === 2 && isBeg(tokens[0])) {
    // console.log(`${line + 1}: ` + ".beg \\s");
    beginLine = line;
  } else if (tokens.length === 2 && isEnd(tokens[0])) {
    // console.log(`${line + 1}: ` + ".end \\s");
    endLine = line;
  } else if (tokens.length === 2 && isOrg(tokens[0]) && isConst(tokens[1])) {
    // console.log(`${line + 1}: ` + ".org arg");
    programPointerIncAmount = Number(tokens[1]) - programPointer;
  } else if (tokens.length === 2 && isNoArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s noArgInst");
    if (!isRightInstruction) {
      incCurrentSymbolSize(currentSymbol);
    }
  } else if (tokens.length === 2 && isConst(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s const");
    if (symbolTable.length !== 0 && !isRightInstruction) {
      incCurrentSymbolSize(currentSymbol);
    }
  } else if (tokens.length === 3 && !isOrg(tokens[0]) && isConst(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s const \\s");
    if (symbolTable.length !== 0 && !isRightInstruction) {
      incCurrentSymbolSize(currentSymbol);
    }
  } else if (tokens.length === 3 && isLabel(tokens[1]) && isConst(tokens[2])) {
    // console.log(`${line + 1}: ` + "\\s label: const");
    if (!isRightInstruction && !isOnSymbolTable(tokens[1])) {
      addSymbol({
        id: tokens[1],
        address: programPointer,
        defined: true,
        size: 1,
      });
      setCurrentSymbol(symbolTable[length - 1]);
    } else if (!isRightInstruction && isOnSymbolTable(tokens[1])) {
      let symbol = lookForSymbol(tokens[1]);
      if (!symbol.defined) {
        symbol.defined = true;
        symbol.address = programPointer;
        symbol.size = 1;
        setCurrentSymbol(symbol);
      } else {
        updateFeedback(
          `Error: Reuse of label ${tokens[1]} at line ${line + 1}`
        );
      }
    }
  } else if (tokens.length === 3 && isOrg(tokens[0]) && isConst(tokens[1])) {
    // console.log(`${line + 1}: ` + ".org arg \\s");
    programPointerIncAmount = Number(tokens[1]) - programPointer;
  } else if (tokens.length === 3 && isNoArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s noArgInst \\s");
    if (!isRightInstruction) {
      incCurrentSymbolSize(currentSymbol);
    }
  } else if (tokens.length === 3 && isSingleArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s singleArgInst arg");
    if (!isRightInstruction) {
      incCurrentSymbolSize(currentSymbol);
    }
    if (!isConst(tokens[2])) {
      if (!isOnSymbolTable(tokens[2])) {
        addSymbol({
          //if the user referenced a symbol that's not the table, add it with defined:false
          id: tokens[2],
          defined: false,
        });
      }
      //if the user referenced a symbol that is already on the table, do nothing
    }
  } else if (
    tokens.length === 4 &&
    isLabel(tokens[1]) &&
    isConst([tokens[2]])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: const \\s");
    if (!isRightInstruction && !isOnSymbolTable(tokens[1])) {
      addSymbol({
        id: tokens[1],
        address: programPointer,
        defined: true,
        size: 1,
      });
      setCurrentSymbol(symbolTable[length - 1]);
    }
  } else if (tokens.length === 4 && isSingleArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s singleArgInst arg \\s");
    if (!isRightInstruction) {
      incCurrentSymbolSize(currentSymbol);
    }
    if (!isConst(tokens[2])) {
      if (!isOnSymbolTable(tokens[2])) {
        addSymbol({
          //if the user referenced a symbol that's not the table, add it with defined:false
          id: tokens[2],
          defined: false,
        });
      }
      //if the user referenced a symbol that is already on the table, do nothing
    }
  } else if (tokens.length === 4 && isDoubleArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s doubleArgInst arg1 arg2");
    if (!isRightInstruction) {
      incCurrentSymbolSize(currentSymbol);
    }
    if (tokens[2] !== "op1" || tokens[2] !== "op2") {
      updateFeedback(
        `Syntax Error at line ${
          line + 1
        }. lda/ldc's first argument must be: "op1" or "op2"`
      );
    }

    if (!isConst(tokens[3])) {
      if (!isOnSymbolTable(tokens[3])) {
        addSymbol({
          //if the user referenced a symbol that's not the table, add it with defined:false
          id: tokens[3],
          defined: false,
        });
      }
      //if the user referenced a symbol that is already on the table, do nothing
    }
  } else if (
    tokens.length === 4 &&
    isLabel(tokens[1]) &&
    isSingleArgInstruction(tokens[2])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: singleArgInst arg");
    if (!isRightInstruction && !isOnSymbolTable(tokens[1])) {
      addSymbol({
        id: tokens[1],
        address: programPointer,
        defined: true,
        size: 1,
      });
      setCurrentSymbol(symbolTable[length - 1]);
    }
    if (!isConst(tokens[3])) {
      if (!isOnSymbolTable(tokens[3])) {
        addSymbol({
          //if the user referenced a symbol that's not the table, add it with defined:false
          id: tokens[3],
          defined: false,
        });
      }
      //if the user referenced a symbol that is already on the table, do nothing
    }
  } else if (tokens.length === 5 && isDoubleArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s doubleArgInst arg1 arg2 \\s");
    if (!isRightInstruction) {
      incCurrentSymbolSize(currentSymbol);
    }
    if (tokens[2] !== "op1" || tokens[2] !== "op2") {
      updateFeedback(
        `Syntax Error at line ${
          line + 1
        }. lda/ldc's first argument must be: "op1" or "op2"`
      );
    }

    if (!isConst(tokens[3])) {
      if (!isOnSymbolTable(tokens[3])) {
        addSymbol({
          //if the user referenced a symbol that's not the table, add it with defined:false
          id: tokens[3],
          defined: false,
        });
      }
      //if the user referenced a symbol that is already on the table, do nothing
    }
  } else if (
    tokens.length === 5 &&
    isLabel(tokens[1]) &&
    isSingleArgInstruction(tokens[2])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: singleArgInst arg \\s");
    if (!isRightInstruction && !isOnSymbolTable(tokens[1])) {
      addSymbol({
        id: tokens[1],
        address: programPointer,
        defined: true,
        size: 1,
      });
      setCurrentSymbol(symbolTable[length - 1]);
    }
    if (!isConst(tokens[3])) {
      if (!isOnSymbolTable(tokens[3])) {
        addSymbol({
          //if the user referenced a symbol that's not the table, add it with defined:false
          id: tokens[3],
          defined: false,
        });
      }
      //if the user referenced a symbol that is already on the table, do nothing
    }
  } else if (
    tokens.length === 5 &&
    isLabel(tokens[1]) &&
    isDoubleArgInstruction(tokens[2])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: doubleArgInst arg1 arg2");
    if (!isRightInstruction && !isOnSymbolTable(tokens[1])) {
      addSymbol({
        id: tokens[1],
        address: programPointer,
        defined: true,
        size: 1,
      });
      setCurrentSymbol(symbolTable[length - 1]);
    }
    if (tokens[3] !== "op1" || tokens[3] !== "op2") {
      updateFeedback(
        `Syntax Error at line ${
          line + 1
        }. lda/ldc's first argument must be: "op1" or "op2"`
      );
    }

    if (!isConst(tokens[4])) {
      if (!isOnSymbolTable(tokens[4])) {
        addSymbol({
          //if the user referenced a symbol that's not the table, add it with defined:false
          id: tokens[4],
          defined: false,
        });
      }
      //if the user referenced a symbol that is already on the table, do nothing
    }
  } else if (
    tokens.length === 6 &&
    isLabel(tokens[1]) &&
    isDoubleArgInstruction(tokens[2])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: doubleArgInst arg1 arg2 \\s");

    if (!isRightInstruction && !isOnSymbolTable(tokens[1])) {
      addSymbol({
        id: tokens[1],
        address: programPointer,
        defined: true,
        size: 1,
      });
      setCurrentSymbol(symbolTable[length - 1]);
    }
    if (tokens[3] !== "op1" || tokens[3] !== "op2") {
      updateFeedback(
        `Syntax Error at line ${
          line + 1
        }. lda/ldc's first argument must be: "op1" or "op2"`
      );
    }

    if (!isConst(tokens[4])) {
      if (!isOnSymbolTable(tokens[4])) {
        addSymbol({
          //if the user referenced a symbol that's not the table, add it with defined:false
          id: tokens[4],
          defined: false,
        });
      }
      //if the user referenced a symbol that is already on the table, do nothing
    }
  } else {
    updateFeedback(`Syntax error at line: ${line + 1}.`);
  }

  //Increase  the program pointer before parsing the next line
  if (rightInstruction && isRightInstruction)
    //If there is an instructtion to the right, wait for it's parsing to increase the program pointer
    incProgramPointer(programPointerIncAmount);
  else if (!rightInstruction)
    //If there's no instruction to the right, simply increase the program pointer.
    incProgramPointer(programPointerIncAmount);
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
function incProgramPointer(incAmount) {
  if (incAmount < 0)
    updateFeedback(
      "The argument for .org must be greater than or equal to 0 (zero)."
    );
  else programPointer += incAmount;
}
function incCurrentSymbolSize(symbol) {
  ++symbol.size;
}
function addSymbol({ id = "null", size = -1, address = -1, defined = false }) {
  symbolTable.push({
    id: id,
    size: size,
    address: address,
    defined: defined,
  });
}
function setCurrentSymbol(id) {
  if (!lookForSymbol()) for (let s = 0; s < symbolTable.length; s++) {}
}
function lookForSymbol(id) {
  let symbol;
  for (let s = 0; s < symbolTable.length; s++) {
    symbol = symbolTable[s];
    if (symbol.id === id) return symbol;
  }
  return null;
}
function isOnSymbolTable(id) {
  let symbol;
  for (let s = 0; s < symbolTable.length; s++) {
    symbol = symbolTable[s];
    if (symbol.id === id) return true;
  }
  return false;
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

//Global variables
const symbolTable = [];
let programPointer = 0;
let currentSymbol = {};
let beginLine;
let endLine;

// Tokenize string at any kind of whitespace
// const str = "abc    def ghi";
// const tokens = [...str.split(/[ ]+/)];
// console.log(tokens);
// console.log(`${tokens.length === 1 ? true : false}`);

// check if string only contains digits
// /^\d+$/.test(val)
// addSymbol({ id: "test", size: 1, addres: 10, defined: true });
// console.log(isOnSymbolTable("flake"));

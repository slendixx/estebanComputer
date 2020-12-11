//TODO test with negative numbers!!

function assemble() {
  symbolTable = [];
  programPointer = 0;
  currentSymbol = {};
  updateFeedback("Ready.");
  //Spread the source code line by line
  const source = [...sourceCode.value.split("\n")];
  parse(source);
  //Once parsing is complete  i have a fully formed symbol table
  testForUndefinedSymbols(symbolTable);
  console.table(symbolTable);
  console.log(`Translation begin line: ${beginLine + 1}`);
  console.log(`Translation end line: ${endLine + 1}`);

  if (feedback.textContent === "Ready.") {
    //if no errors happened during parsing
    translate(source);
  }
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
      determineParseCase(tokens, l, true, false);
      determineParseCase(tokensRight, l, true, true);
    } else {
      tokens = [...line.split(/\s+/)];
      determineParseCase(tokens, l, false, false);
    }
  }
}
function determineParseCase(
  tokens,
  line,
  rightInstruction,
  isRightInstruction
) {
  let programPointerIncAmount = 1;
  let increaseProgramPointer = true;
  //if (line === 6) debugger;
  // console.log(
  //   `line: ${line}, tokens: ${tokens}, ${
  //     tokens.length === 6 &&
  //     isLabel(tokens[1]) &&
  //     isDoubleArgInstruction(tokens[2])
  //   }, ${!isRightInstruction && !isOnSymbolTable(tokens[1])}`
  // );

  if (tokens.length === 1 && isBeg(tokens[0])) {
    // console.log(`${line + 1}: ` + ".beg");
    beginLine = line;
    increaseProgramPointer = false;
  } else if (tokens.length === 1 && isEnd(tokens[0])) {
    // console.log(`${line + 1}: ` + ".end");
    endLine = line;
    increaseProgramPointer = false;
  } else if (tokens.length === 2 && isBeg(tokens[0])) {
    // console.log(`${line + 1}: ` + ".beg \\s");
    beginLine = line;
    increaseProgramPointer = false;
  } else if (tokens.length === 2 && isEnd(tokens[0])) {
    // console.log(`${line + 1}: ` + ".end \\s");
    endLine = line;
    increaseProgramPointer = false;
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
      setCurrentSymbol(symbolTable[symbolTable.length - 1]);
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
      console.log(line + " " + currentSymbol);
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
    tokens.length === 3 &&
    isLabel(tokens[1]) &&
    isNoArgInstruction(tokens[2])
  ) {
    // \\s label: noArgInstruction
    if (!isRightInstruction && !isOnSymbolTable(tokens[1])) {
      addSymbol({
        id: tokens[1],
        address: programPointer,
        defined: true,
        size: 1,
      });
      setCurrentSymbol(symbolTable[symbolTable.length - 1]);
    } else if (!isRightInstruction && isOnSymbolTable(tokens[1])) {
      let symbol = lookForSymbol(tokens[1]);
      symbol.defined = true;
      symbol.size = 1;
      symbol.address = programPointer;
    }
  } else if (
    tokens.length === 4 &&
    isLabel(tokens[1]) &&
    isNoArgInstruction(tokens[2])
  ) {
    // \\s label: noArgInstruction \\s
    if (!isRightInstruction && !isOnSymbolTable(tokens[1])) {
      addSymbol({
        id: tokens[1],
        address: programPointer,
        defined: true,
        size: 1,
      });
      setCurrentSymbol(symbolTable[symbolTable.length - 1]);
    } else if (!isRightInstruction && isOnSymbolTable(tokens[1])) {
      let symbol = lookForSymbol(tokens[1]);
      symbol.defined = true;
      symbol.size = 1;
      symbol.address = programPointer;
    }
  } else if (
    tokens.length === 4 &&
    isLabel(tokens[1]) &&
    isConst([tokens[2]])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: const \\s");
    // debugger;
    if (!isRightInstruction && !isOnSymbolTable(tokens[1])) {
      addSymbol({
        id: tokens[1],
        address: programPointer,
        defined: true,
        size: 1,
      });
      setCurrentSymbol(symbolTable[symbolTable.length - 1]);
    } else if (!isRightInstruction && isOnSymbolTable(tokens[1])) {
      let symbol = lookForSymbol(tokens[1]);
      symbol.defined = true;
      symbol.size = 1;
      symbol.address = programPointer;
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
    if (tokens[2] !== "op1" && tokens[2] !== "op2") {
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
      setCurrentSymbol(symbolTable[symbolTable.length - 1]);
    } else if (!isRightInstruction && isOnSymbolTable(tokens[1])) {
      let symbol = lookForSymbol(tokens[1]);
      symbol.defined = true;
      symbol.size = 1;
      symbol.address = programPointer;
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
    if (tokens[2] !== "op1" && tokens[2] !== "op2") {
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
      setCurrentSymbol(symbolTable[symbolTable.length - 1]);
    } else if (!isRightInstruction && isOnSymbolTable(tokens[1])) {
      let symbol = lookForSymbol(tokens[1]);
      symbol.defined = true;
      symbol.size = 1;
      symbol.address = programPointer;
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
      setCurrentSymbol(symbolTable[symbolTable.length - 1]);
    } else if (!isRightInstruction && isOnSymbolTable(tokens[1])) {
      let symbol = lookForSymbol(tokens[1]);
      symbol.defined = true;
      symbol.size = 1;
      symbol.address = programPointer;
    }
    if (tokens[3] !== "op1" && tokens[3] !== "op2") {
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
      setCurrentSymbol(symbolTable[symbolTable.length - 1]);
    } else if (!isRightInstruction && isOnSymbolTable(tokens[1])) {
      let symbol = lookForSymbol(tokens[1]);
      symbol.defined = true;
      symbol.size = 1;
      symbol.address = programPointer;
    }
    if (tokens[3] !== "op1" && tokens[3] !== "op2") {
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
  if (rightInstruction && isRightInstruction) {
    if (increaseProgramPointer)
      //If there is an instructtion to the right, wait for it's parsing to increase the program pointer
      incProgramPointer(programPointerIncAmount);
  } else if (!rightInstruction && !isRightInstruction) {
    if (increaseProgramPointer)
      //If there's no instruction to the right, simply increase the program pointer.
      incProgramPointer(programPointerIncAmount);
  }
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
    case "mul":
    case "div":
    case "rshift":
    case "lshift":
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
    case "sti":
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
    case "ldi":
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
  if (incAmount < 0) {
    updateFeedback(
      "The argument for .org must be greater than or equal to 0 (zero)."
    );
  } else programPointer += incAmount;
}
function incCurrentSymbolSize(symbol) {
  if (currentSymbol) ++symbol.size;
}
function addSymbol({ id = "null", size = -1, address = -1, defined = false }) {
  const [buffer] = id.split(":");
  symbolTable.push({
    id: buffer,
    size: size,
    address: address,
    defined: defined,
  });
  // if (symbolTable.length === 1) currentSymbol = symbolTable[0];
}
function setCurrentSymbol(symbol) {
  // if (!lookForSymbol(id)) for (let s = 0; s < symbolTable.length; s++) {}
  currentSymbol = symbol;
}
function lookForSymbol(id) {
  let symbol;
  const [buffer] = id.split(":");
  for (let s = 0; s < symbolTable.length; s++) {
    symbol = symbolTable[s];
    if (symbol.id === buffer) return symbol;
  }
  return null;
}
function isOnSymbolTable(id) {
  let symbol;
  const [buffer] = id.split(":");
  for (let s = 0; s < symbolTable.length; s++) {
    symbol = symbolTable[s];
    if (symbol.id === buffer) return true;
  }
  return false;
}

function testForUndefinedSymbols(symbolTable) {
  let symbol;
  for (let s = 0; s < symbolTable.length; s++) {
    symbol = symbolTable[s];
    if (!symbol.defined) {
      updateFeedback(`Error: Undefined symbol "${symbol.id}".`);
      return;
    }
  }
}
function translate(source) {
  let tokens = [];
  let tokensRight = [];
  let line = "";
  let right = "";
  programPointer = 0;
  const output = {
    machineCode: ``,
  };
  for (let l = beginLine; l < endLine; l++) {
    line = source[l];
    [line] = line.split("\n");
    [line] = line.split("#");
    if (line === "" || line === "\n" || /^\s+$/.test(line)) continue;
    if (line.includes("//")) {
      [line, right] = line.split("//");
      tokens = [...line.split(/\s+/)];
      tokensRight = [...right.split(/\s+/)];
      determineTranslateCase(tokens, l, true, false, output);
      determineTranslateCase(tokensRight, l, true, true, output);
    } else {
      tokens = [...line.split(/\s+/)];
      determineTranslateCase(tokens, l, false, false, output);
    }
  }
  // console.log(output.machineCode);
  machine.value = output.machineCode;
}

function determineTranslateCase(
  tokens,
  line,
  rightInstruction,
  isRightInstruction,
  output
) {
  let programPointerIncAmount = 1;
  let machineCodeLine = ``;
  //if (line === 6) debugger;
  // console.log(
  //   `line: ${line}, tokens: ${tokens}, ${
  //     tokens.length === 6 &&
  //     isLabel(tokens[1]) &&
  //     isDoubleArgInstruction(tokens[2])
  //   }, ${!isRightInstruction && !isOnSymbolTable(tokens[1])}`
  // );

  if (tokens.length === 2 && isOrg(tokens[0]) && isConst(tokens[1])) {
    // console.log(`${line + 1}: ` + ".org arg");
    programPointerIncAmount = Number(tokens[1]) - programPointer;
    machineCodeLine = translateOrg(tokens[1]);
    output.machineCode += machineCodeLine;
  } else if (tokens.length === 2 && isNoArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s noArgInst");
    if (rightInstruction) {
      if (!isRightInstruction) {
        machineCodeLine = translateNoArgInstruction(tokens[1]);
        output.machineCode += machineCodeLine;
      } else {
        machineCodeLine = translateNoArgInstruction(tokens[1]);
        output.machineCode += `${machineCodeLine}\n`;
      }
    } else {
      machineCodeLine = translateNoArgInstruction(tokens[1]);
      output.machineCode += machineCodeLine;
      output.machineCode += fillRight();
    }
  } else if (tokens.length === 2 && isConst(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s const");
    if (!isRightInstruction) {
      machineCodeLine = translateConst(tokens[1]);
      output.machineCode += `${machineCodeLine}\n`;
    }
  } else if (tokens.length === 3 && !isOrg(tokens[0]) && isConst(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s const \\s");
    if (!isRightInstruction) {
      machineCodeLine = translateConst(tokens[1]);
      output.machineCode += `${machineCodeLine}\n`;
    }
  } else if (tokens.length === 3 && isLabel(tokens[1]) && isConst(tokens[2])) {
    // console.log(`${line + 1}: ` + "\\s label: const");
    if (!isRightInstruction) {
      machineCodeLine = translateConst(tokens[2]);
      output.machineCode += `${machineCodeLine}\n`;
    }
  } else if (tokens.length === 3 && isOrg(tokens[0]) && isConst(tokens[1])) {
    // console.log(`${line + 1}: ` + ".org arg \\s");
    programPointerIncAmount = Number(tokens[1]) - programPointer;
    machineCodeLine = translateOrg(tokens[1]);
    output.machineCode += machineCodeLine;
  } else if (tokens.length === 3 && isNoArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s noArgInst \\s");
    if (rightInstruction) {
      if (!isRightInstruction) {
        machineCodeLine = translateNoArgInstruction(tokens[1]);
        output.machineCode += machineCodeLine;
      } else {
        machineCodeLine = translateNoArgInstruction(tokens[1]);
        output.machineCode += `${machineCodeLine}\n`;
      }
    } else {
      machineCodeLine = translateNoArgInstruction(tokens[1]);
      output.machineCode += machineCodeLine;
      output.machineCode += fillRight();
    }
  } else if (tokens.length === 3 && isSingleArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s singleArgInst arg");
    if (rightInstruction) {
      if (!isRightInstruction) {
        machineCodeLine = translateSingleArgInstruction(tokens[1], tokens[2]);
        output.machineCode += machineCodeLine;
      } else {
        machineCodeLine = translateSingleArgInstruction(tokens[1], tokens[2]);
        output.machineCode += `${machineCodeLine}\n`;
      }
    } else {
      machineCodeLine = translateSingleArgInstruction(tokens[1], tokens[2]);
      output.machineCode += machineCodeLine;

      output.machineCode += fillRight();
    }
  } else if (
    tokens.length === 3 &&
    isLabel(tokens[1]) &&
    isNoArgInstruction(tokens[2])
  ) {
    // \\s label: noArgInstruction
    if (rightInstruction) {
      if (!isRightInstruction) {
        machineCodeLine = translateNoArgInstruction(tokens[2]);
        output.machineCode += machineCodeLine;
      } else {
        machineCodeLine = translateNoArgInstruction(tokens[2]);
        output.machineCode += `${machineCodeLine}\n`;
      }
    } else {
      machineCodeLine = translateNoArgInstruction(tokens[2]);
      output.machineCode += machineCodeLine;
      output.machineCode += fillRight();
    }
  } else if (
    tokens.length === 4 &&
    isLabel(tokens[1]) &&
    isNoArgInstruction(tokens[2])
  ) {
    // \\s label: noArgInstruction \\s
    if (rightInstruction) {
      if (!isRightInstruction) {
        machineCodeLine = translateNoArgInstruction(tokens[2]);
        output.machineCode += machineCodeLine;
      } else {
        machineCodeLine = translateNoArgInstruction(tokens[2]);
        output.machineCode += `${machineCodeLine}\n`;
      }
    } else {
      machineCodeLine = translateNoArgInstruction(tokens[2]);
      output.machineCode += machineCodeLine;
      output.machineCode += fillRight();
    }
  } else if (
    tokens.length === 4 &&
    isLabel(tokens[1]) &&
    isConst([tokens[2]])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: const \\s");
    if (!isRightInstruction) {
      machineCodeLine = translateConst(tokens[2]);
      output.machineCode += `${machineCodeLine}\n`;
    }
  } else if (tokens.length === 4 && isSingleArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s singleArgInst arg \\s");
    if (rightInstruction) {
      if (!isRightInstruction) {
        machineCodeLine = translateSingleArgInstruction(tokens[1], tokens[2]);
        output.machineCode += machineCodeLine;
      } else {
        machineCodeLine = translateSingleArgInstruction(tokens[1], tokens[2]);
        output.machineCode += `${machineCodeLine}\n`;
      }
    } else {
      machineCodeLine = translateSingleArgInstruction(tokens[1], tokens[2]);
      output.machineCode += machineCodeLine;
      output.machineCode += fillRight();
    }
  } else if (tokens.length === 4 && isDoubleArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s doubleArgInst arg1 arg2");
    if (rightInstruction) {
      if (!isRightInstruction) {
        machineCodeLine = translateDoubleArgInstruction(
          tokens[1],
          tokens[2],
          tokens[3]
        );
        output.machineCode += machineCodeLine;
      } else {
        machineCodeLine = translateDoubleArgInstruction(
          tokens[1],
          tokens[2],
          tokens[3]
        );
        output.machineCode += `${machineCodeLine}\n`;
      }
    } else {
      machineCodeLine = translateDoubleArgInstruction(
        tokens[1],
        tokens[2],
        tokens[3]
      );
      output.machineCode += machineCodeLine;
      output.machineCode += fillRight();
    }
  } else if (
    tokens.length === 4 &&
    isLabel(tokens[1]) &&
    isSingleArgInstruction(tokens[2])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: singleArgInst arg");
    if (rightInstruction) {
      if (!isRightInstruction) {
        machineCodeLine = translateSingleArgInstruction(tokens[2], tokens[3]);
        output.machineCode += machineCodeLine;
      } else {
        machineCodeLine = translateSingleArgInstruction(tokens[2], tokens[3]);
        output.machineCode += `${machineCodeLine}\n`;
      }
    } else {
      machineCodeLine = translateSingleArgInstruction(tokens[2], tokens[3]);
      output.machineCode += machineCodeLine;
      output.machineCode += fillRight();
    }
  } else if (tokens.length === 5 && isDoubleArgInstruction(tokens[1])) {
    // console.log(`${line + 1}: ` + "\\s doubleArgInst arg1 arg2 \\s");
    if (rightInstruction) {
      if (!isRightInstruction) {
        machineCodeLine = translateDoubleArgInstruction(
          tokens[1],
          tokens[2],
          tokens[3]
        );
        output.machineCode += machineCodeLine;
      } else {
        machineCodeLine = translateDoubleArgInstruction(
          tokens[1],
          tokens[2],
          tokens[3]
        );
        output.machineCode += `${machineCodeLine}\n`;
      }
    } else {
      machineCodeLine = translateDoubleArgInstruction(
        tokens[1],
        tokens[2],
        tokens[3]
      );
      output.machineCode += machineCodeLine;
      output.machineCode += fillRight();
    }
  } else if (
    tokens.length === 5 &&
    isLabel(tokens[1]) &&
    isSingleArgInstruction(tokens[2])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: singleArgInst arg \\s");
    if (rightInstruction) {
      if (!isRightInstruction) {
        machineCodeLine = translateSingleArgInstruction(tokens[2], tokens[3]);
        output.machineCode += machineCodeLine;
      } else {
        machineCodeLine = translateSingleArgInstruction(tokens[2], tokens[3]);
        output.machineCode += `${machineCodeLine}\n`;
      }
    } else {
      machineCodeLine = translateSingleArgInstruction(tokens[2], tokens[3]);
      output.machineCode += machineCodeLine;
      output.machineCode += fillRight();
    }
  } else if (
    tokens.length === 5 &&
    isLabel(tokens[1]) &&
    isDoubleArgInstruction(tokens[2])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: doubleArgInst arg1 arg2");
    if (rightInstruction) {
      if (!isRightInstruction) {
        machineCodeLine = translateDoubleArgInstruction(
          tokens[2],
          tokens[3],
          tokens[4]
        );
        output.machineCode += machineCodeLine;
      } else {
        machineCodeLine = translateDoubleArgInstruction(
          tokens[2],
          tokens[3],
          tokens[4]
        );
        output.machineCode += `${machineCodeLine}\n`;
      }
    } else {
      machineCodeLine = translateDoubleArgInstruction(
        tokens[2],
        tokens[3],
        tokens[4]
      );
      output.machineCode += machineCodeLine;
      output.machineCode += fillRight();
    }
  } else if (
    tokens.length === 6 &&
    isLabel(tokens[1]) &&
    isDoubleArgInstruction(tokens[2])
  ) {
    // console.log(`${line + 1}: ` + "\\s label: doubleArgInst arg1 arg2 \\s");

    if (rightInstruction) {
      if (!isRightInstruction) {
        machineCodeLine = translateDoubleArgInstruction(
          tokens[2],
          tokens[3],
          tokens[4]
        );
        output.machineCode += machineCodeLine;
      } else {
        machineCodeLine = translateDoubleArgInstruction(
          tokens[2],
          tokens[3],
          tokens[4]
        );
        output.machineCode += `${machineCodeLine}\n`;
      }
    } else {
      machineCodeLine = translateDoubleArgInstruction(
        tokens[2],
        tokens[3],
        tokens[4]
      );
      output.machineCode += machineCodeLine;
      output.machineCode += fillRight();
    }
  }

  //Increase  the program pointer before parsing the next line
  if (rightInstruction && isRightInstruction) {
    //If there is an instructtion to the right, wait for it's parsing to increase the program pointer
    incProgramPointer(programPointerIncAmount);
  } else if (!rightInstruction && !isRightInstruction) {
    //If there's no instruction to the right, simply increase the program pointer.
    incProgramPointer(programPointerIncAmount);
  }
}

function translateOrg(arg) {
  let machineCode = ``;
  const linesToFill = Number(arg);
  for (let l = programPointer; l < linesToFill; l++) {
    machineCode = `${machineCode}00000000000000000000000000000000\n`;
  }

  return machineCode;
}
function translateConst(token) {
  let machineCode = ``;
  let binary = toSignedBinary(Number(token), registerWidth);
  return binary;
}
function translateNoArgInstruction(inst) {
  let machineCode = ``;
  switch (inst) {
    case "add":
      machineCode = `0100000000000000`;
      break;
    case "sub":
      machineCode = `0100010000000000`;
      break;
    case "mul":
      machineCode = `0100100000000000`;
      break;
    case "div":
      machineCode = `0100110000000000`;
      break;
    case "rshift":
      machineCode = `0101000000000000`;
      break;
    case "lshift":
      machineCode = `0101010000000000`;
      break;
    case "or":
      machineCode = `0101100000000000`;
      break;
    case "and":
      machineCode = `0101110000000000`;
      break;
    case "not":
      machineCode = `0110000000000000`;
      break;
  }
  return machineCode;
}
function translateSingleArgInstruction(inst, arg) {
  //if the argument is a const, translate it to binary using yoSignedBinary();
  //else, translate the address property of the referenced symbol using toSignedBinary();
  let machineCode = ``;
  let argBinary = ``;
  let disp = false;
  switch (inst) {
    case "st":
      machineCode = `00100`;
      break;
    case "sti":
      machineCode = `00101`;
      break;
    case "call":
      machineCode = `10000`;
      disp = true;
      break;
    case "jump":
      machineCode = `10001`;
      disp = true;
      break;
    case "ba":
      machineCode = `10010`;
      disp = true;
      break;
    case "be":
      machineCode = `10011`;
      disp = true;
      break;
    case "bn":
      machineCode = `10100`;
      disp = true;
      break;
    case "bo":
      machineCode = `10101`;
      disp = true;
      break;
    case "bc":
      machineCode = `10110`;
      disp = true;
      break;
    //Add more single argument instructions when implemented here...
  }
  if (!disp) {
    if (isConst(arg)) argBinary = toSignedBinary(Number(arg), bits10to0);
    else {
      argBinary = toSignedBinary(lookForSymbol(arg).address, bits10to0);
    }
  } else {
    if (isConst(arg)) argBinary = toSignedBinary(Number(arg), bits10to0);
    else {
      const destAddress = lookForSymbol(arg).address;
      argBinary = toSignedBinary(destAddress - programPointer, bits10to0);
    }
  }
  machineCode += argBinary;
  return machineCode;
}
function translateDoubleArgInstruction(inst, arg1, arg2) {
  let machineCode = ``;
  let argBinary = ``;
  let indirect = false;
  switch (inst) {
    case "ld":
      machineCode = `000`;
      break;
    case "ldi":
      machineCode = `000`;
      indirect = true;
      break;
  }
  if (arg1 === "op1") {
    machineCode += `0`;
  } else {
    machineCode += `1`;
  }

  if (indirect) machineCode += `1`;
  else machineCode += `0`;

  if (isConst(arg2)) argBinary = toSignedBinary(Number(arg2), bits10to0);
  else {
    argBinary = toSignedBinary(lookForSymbol(arg2).address, bits10to0);
  }
  return (machineCode += argBinary);
}
function fillRight() {
  return `0000000000000000\n`;
}
function toSignedBinary(decimalNumber, minDigitAmount) {
  let binaryNumber = ``;
  if (decimalNumber >= 0)
    binaryNumber = prepend0s(decimalNumber.toString(2), minDigitAmount);
  else {
    binaryNumber = complementTo2(decimalNumber, minDigitAmount);
  }
  return binaryNumber;
}
function prepend0s(binaryNumber, minDigitAmount) {
  for (i = binaryNumber.length; i < minDigitAmount; i++) {
    binaryNumber = `${"0"}${binaryNumber}`;
  }
  return binaryNumber;
}
function complementTo2(decimalNumber, minDigitAmount) {
  let buffer = decimalNumber.toString();
  [, buffer] = buffer.split("-");
  buffer = Number(buffer);
  let digits = [...buffer.toString(2)];
  let binaryNumber = ``;
  for (let d = digits.length - 1; d >= 0; d--) {
    if (digits[d] === "1") {
      digits = bitwiseNot(digits, d);
      break;
    }
  }
  for (let d = 0; d < digits.length; d++) {
    binaryNumber += digits[d];
  }
  return prepend1s(binaryNumber, minDigitAmount);
}
function bitwiseNot(digits, startDigit) {
  for (let d = startDigit - 1; d >= 0; d--) {
    digits[d] = digits[d] === "0" ? "1" : "0";
  }
  return digits;
}
function prepend1s(binaryNumber, minDigitAmount) {
  for (i = binaryNumber.length; i < minDigitAmount; i++) {
    binaryNumber = `${"1"}${binaryNumber}`;
  }
  return binaryNumber;
}

const [, sourceCode, machine, loader] = document.querySelectorAll("textarea");
const [btnAssemble, btnCopy] = document.querySelectorAll("button");
const feedback = document.getElementById("feedback");
const registerWidth = 32;
const bits10to0 = 11;
btnAssemble.addEventListener("click", assemble);

//Global variables
let symbolTable;
let programPointer;
let currentSymbol;
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

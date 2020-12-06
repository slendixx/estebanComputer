function assemble() {
  //Spread the source code line by line
  const source = [...sourceCode.value.split("\n")];
  parse(source);
}
function parse(source) {
  const beginLine = lookForBegin(source);
  if (beginLine !== -1) {
    if (lookForEnd(source)) {
      syntaxCheck(source, beginLine);
      //If the source code does not pass the syntax check, do not translate it
    } else {
      updateOutput(`Syntax error: The .end directive was not found.`);
    }
  } else {
    updateOutput(`Syntax error: The .beg directive was not found.`);
  }

  //syntaxCheck(source, beginLine);
}
function lookForBegin(source) {
  for (let line = 0; line < source.length; line++) {
    if (source[line].includes(".beg")) return line;
  }
  return -1;
}
function lookForEnd(source) {
  for (let line = 0; line < source.length; line++) {
    if (source[line].includes(".end")) return true;
  }
  return false;
}
function updateOutput(outputMsg) {
  output.textContent = outputMsg;
}

function syntaxCheck(source, beginLine) {
  noSyntaxErrorsMsg = "No syntax errors detected";
  updateOutput(noSyntaxErrorsMsg);
  checkForDirectives(source, beginLine);
  checkForLabels(source, beginLine);
  //checkForInstructions(source, beginLine);
  if (output.textContent === noSyntaxErrorsMsg) translate();
}
function checkForDirectives(source, beginLine) {
  let line;
  let tokens = [];
  for (let l = beginLine; l < source.length; l++) {
    [line] = source[l].split("#"); //ignore everything after the comment marker

    if (line === "\n") continue;
    if (line.includes(".")) {
      if (line.includes(".beg")) {
        line = line.trim(); //remove whitespaces from the directive line
        if (line !== ".beg") {
          updateOutput(
            `Syntax error at line ${
              l + 1
            }: Unexpected character after .beg ---Expected: blank`
          );
        }
      } else if (line.includes(".org")) {
        //tokenize line
        tokens = [...line.split(/\s+/)];
        if (tokens[2] !== "") {
          updateOutput(
            `Syntax error at line ${
              l + 1
            }: Unexpected amount of arguments for .org ---Expected amount: 1`
          );
        } else {
          //got the correct amount of arguments: 1

          if (!/^\d+$/.test(tokens[1])) {
            updateOutput(
              `Syntax error at line ${
                l + 1
              }: Argument 1 for .org is not a numeric constant`
            );
          }
        }
      } else if (line.includes(".end")) {
        line = line.trim(); //remove whitespaces from the directive line
        if (line !== ".end") {
          updateOutput(
            `Syntax error at line ${
              l + 1
            }: Unexpected character after .end ---Expected: blank`
          );
        }
      } else {
        updateOutput(`Syntax error at line ${l + 1}: Unrecognized directive.`);
      }
    }
  }
}
function checkForLabels(source, beginLine) {
  let line;
  let tokens = [];

  for (let l = beginLine; l < source.length; l++) {
    [line] = source[l].split("#");
    if (line === "\n") continue;
    if (line.includes(":")) {
      [line] = line.split(":");
      tokens = [...line.split(/\s+/)];
      if (tokens[0] === "" && tokens.length !== 2) {
        //In case there's whitespace before the label. ignore it
        updateOutput(
          `Syntax error at line ${l + 1}: Label name must not contain spaces`
        );
      }
      if (tokens[0] !== "" && tokens.length !== 1) {
        //In case there's no whitespace before the label.
        updateOutput(
          `Syntax error at line ${l + 1}: Label name must not contain spaces`
        );
      }

      line = line.trim();
      switch (line[0]) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          updateOutput(
            `Syntax error at line ${
              l + 1
            }: Label name must not begin with a number`
          );
          break;
      }
      if (line.includes(".")) {
        updateOutput(
          `Syntax error at line ${l + 1}: Label name must not contain "."`
        );
      }
    }
  }
}
// function checkForInstructions(source, beginLine) {
//   let line;
//   let tokens = [];

//   for (let l = beginLine; l < source.length; l++) {
//     [line] = source[l].split("#");
//     if (line === "\n") continue;

//     if (!line.includes(".")) {
//     }
//   }
// }
// function checkForSymbols() {} //Check to see if there is a reference to an undefined label

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

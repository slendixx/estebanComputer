function assemble() {
  //Spread the source code line by line
  const sourceCode = [...source.value.split("\n")];
  parse(sourceCode);
}
function parse(source) {
  const beginLine = lookForBegin(source);
  if (beginLine !== -1) {
    syntaxCheck(source, beginLine);
    //If the source code does not pass the syntax check, do not translate it
  } else {
    updateOutput(`Syntax error: The .beg directive was not found.`);
  }
  console.log(source);
  //syntaxCheck(source, beginLine);
}
function lookForBegin(source) {
  for (let line = 0; line < source.length; line++) {
    if (source[line].includes(".beg")) return line;
  }
  return -1;
}
function updateOutput(outputMsg) {
  output.textContent = outputMsg;
}

function syntaxCheck(source, beginLine) {}
function checkForDirective() {}
function checkForLabel() {}
function checkForInstruction() {}
function checkForSymbols() {} //Check to see if there is a reference to an undefined label

function translate() {}

const [source, machine, loader] = document.querySelectorAll("textarea");
const [btnAssemble, btnLoader] = document.querySelectorAll("button");
const output = document.getElementById("output");

btnAssemble.addEventListener("click", assemble);

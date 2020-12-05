function generateold() {
  const totalDirAmount = 2 ** Number(dirRegWidth.value);
  const startX = Number(inputX.value);
  const startY = Number(inputY.value);
  const startZ = Number(inputZ.value);
  const decOutX = Number(outputX.value);
  const decOutY = Number(outputY.value);
  const decOutZ = Number(outputZ.value);

  let command = "";
  let resultCommand = "";

  for (let currentDir = 0; currentDir < totalDirAmount; currentDir++) {
    command = buildCommand({
      dir: currentDir,
      dirAmount: totalDirAmount,
      x: startX,
      y: startY,
      z: startZ,
      outX: decOutX,
      outY: decOutY,
      outZ: decOutZ,
    });
    resultCommand += command;
  }
  result.textContent = resultCommand;
}

function generate() {
  const totalDirAmount = 2 ** Number(dirRegWidth.value);
  const inX = Number(inputX.value);
  const inY = Number(inputY.value);
  const inZ = Number(inputZ.value);
  const outX = Number(outputX.value);
  const outY = Number(outputY.value);
  const outZ = Number(outputZ.value);

  let command = "";
  let dirBinary = "";
  let resultCommand = "";

  for (let dir = 0; dir < totalDirAmount; dir++) {
    command = "";
    dirBinary = dir.toString(2);
    dirBinary = prepend0s(dirBinary, dirRegWidth.value);
    const bitValues = [...dirBinary];
    let xdisp = 0;
    for (let bit = bitValues.length - 1; bit >= 0; bit--) {
      if (bitValues[bit] === "0") {
        command += `execute if block ${
          inX + xdisp
        } ${inY} ${inZ} minecraft:black_wool run `;
      } else {
        command += `execute if block ${
          inX + xdisp
        } ${inY} ${inZ} minecraft:white_wool run `;
      }
      xdisp++;
    }
    command += `tp 0-3-2-0-0 ${outX} ${outY} ${outZ + dir}\n`;
    resultCommand += command;
  }
  result.textContent = resultCommand;
}

function prepend0s(binaryNumber, minDigitAmount) {
  for (i = binaryNumber.length; i < minDigitAmount; i++) {
    binaryNumber = `${"0"}${binaryNumber}`;
  }
  return binaryNumber;
}

function copy() {}

const [inputX, inputY, inputZ, dirRegWidth] = document.querySelectorAll(
  ".inputdir"
);
const [outputX, outputY, outputZ] = document.querySelectorAll(".decoutput");

document.getElementById("generate").addEventListener("click", generate);
const result = document.getElementById("result");
document.getElementById("copy").addEventListener("click", copy);

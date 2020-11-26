"use strict";

function generateLink() {
  let [o1, o2, o3, o4, o5] = originfields;
  o1 = Number(o1.value);
  o2 = Number(o2.value);
  o3 = Number(o3.value);
  o4 = Number(o4.value);
  o5 = Number(o5.value);
  let [d1, d2, d3, d4, d5] = destFields;
  d1 = Number(d1.value);
  d2 = Number(d2.value);
  d3 = Number(d3.value);
  d4 = Number(d4.value);
  d5 = Number(d5.value);
  const width = busWidth.value;
  let bitCounter = 0;

  let output = `# Link from ${o1.toString(16)}-${o2.toString(16)}-${o3.toString(
    16
  )}-${o4.toString(16)}-... to ${d1.toString(16)}-${d2.toString(
    16
  )}-${d3.toString(16)}-${d4.toString(16)}-...\n`;

  for (let i = 0; i < width; i++) {
    output += `# bit ${bitCounter}\nexecute at ${o1.toString(16)}-${o2.toString(
      16
    )}-${o3.toString(16)}-${o4.toString(16)}-${(o5 + bitCounter).toString(
      16
    )} if block ~ ~-1 ~ minecraft:black_wool run execute at ${d1.toString(
      16
    )}-${d2.toString(16)}-${d3.toString(16)}-${d4.toString(16)}-${(
      d5 + bitCounter
    ).toString(
      16
    )} run setblock ~ ~-1 ~ minecraft:black_wool destroy\nexecute at ${o1.toString(
      16
    )}-${o2.toString(16)}-${o3.toString(16)}-${o4.toString(16)}-${(
      o5 + bitCounter
    ).toString(
      16
    )} if block ~ ~-1 ~ minecraft:white_wool run execute at ${d1.toString(
      16
    )}-${d2.toString(16)}-${d3.toString(16)}-${d4.toString(16)}-${(
      d5 + bitCounter
    ).toString(16)} run setblock ~ ~-1 ~ minecraft:white_wool destroy\n`;

    bitCounter++;
  }
  result.textContent = output;
}

function copyOutput() {
  result.select();
  document.execCommand("copy");
}

const originfields = document.querySelectorAll(".origin-uuid");
const destFields = document.querySelectorAll(".dest-uuid");
const [btnLink, btnCopy] = document.querySelectorAll("button");
const originHexValues = document.querySelectorAll(".origin-hex");
const destHexValues = document.querySelectorAll(".dest-hex");
const result = document.getElementById("result");
const [busWidth] = document.querySelectorAll(".options");

btnLink.addEventListener("click", generateLink);
btnCopy.addEventListener("click", copyOutput);
console.log(result);

"use strict";

function generateSummon() {
  let field1 = first.value;
  let field2 = second.value;
  let field3 = third.value;
  let field4 = forth.value;
  let field5 = fifth.value;
  const multiple = checkBMultiple.checked;
  console.log(multiple);
  const amount = multiple ? inAmount.value : 1;
  let firstInc = firstIncrease.value;
  let secondInc = secondIncrease.value;
  let thirdInc = thirdIncrease.value;
  let forthInc = forthIncrease.value;
  let fifthInc = fifthIncrease.value;
  let xInc = xIncrease.value;
  let yInc = yIncrease.value;
  let zInc = zIncrease.value;
  let x = inX.value;
  let y = inY.value;
  let z = inZ.value;

  field1 = Number(field1);
  field2 = Number(field2);
  field3 = Number(field3);
  field4 = Number(field4);
  field5 = Number(field5);
  firstInc = Number(firstInc);
  secondInc = Number(secondInc);
  thirdInc = Number(thirdInc);
  forthInc = Number(forthInc);
  fifthInc = Number(fifthInc);
  x = Number(x);
  y = Number(y);
  z = Number(z);
  xInc = Number(xInc);
  yInc = Number(yInc);
  zInc = Number(zInc);

  firstHex.value = field1.toString(16);
  secondHex.value = field2.toString(16);
  thirdHex.value = field3.toString(16);
  forthHex.value = field4.toString(16);
  fifthHex.value = field5.toString(16);

  let command = ``;

  for (let i = 0; i < amount; i++) {
    let UUIDMost = field2 > 0 ? field2 * secondFieldFiller : 0;
    UUIDMost += field3;
    let UUIDLeast = field4 > 0 ? field4 * forthFieldFiller : 0;
    UUIDLeast += field5;

    command += `summon minecraft:armor_stand ${x} ${y} ${z} {UUIDMost:${UUIDMost}l,UUIDLeast:${UUIDLeast}l,NoGravity:true,CustomName:"\\"${0}-${field2.toString(
      16
    )}-${field3.toString(16)}-${field4.toString(16)}-${field5.toString(
      16
    )}\\"",CustomNameVisible:true${
      checkBInvisible.checked ? ",Invisible:true" : ""
    }}\n`;

    field1 += firstInc;
    field2 += secondInc;
    field3 += thirdInc;
    field4 += forthInc;
    field5 += fifthInc;
    x += xInc;
    y += yInc;
    z += zInc;
  }

  result.textContent = command;
}

function copyCommand() {
  result.select();
  document.execCommand("copy");
}

//DOM elements
const first = document.getElementById("first");
const second = document.getElementById("second");
const third = document.getElementById("third");
const forth = document.getElementById("forth");
const fifth = document.getElementById("fifth");
const firstHex = document.getElementById("firstHex");
const secondHex = document.getElementById("secondHex");
const thirdHex = document.getElementById("thirdHex");
const forthHex = document.getElementById("forthHex");
const fifthHex = document.getElementById("fifthHex");
const firstIncrease = document.getElementById("first-increase");
const secondIncrease = document.getElementById("second-increase");
const thirdIncrease = document.getElementById("third-increase");
const forthIncrease = document.getElementById("forth-increase");
const fifthIncrease = document.getElementById("fifth-increase");

const inX = document.getElementById("x");
const inY = document.getElementById("y");
const inZ = document.getElementById("z");
const xIncrease = document.getElementById("x-increase");
const yIncrease = document.getElementById("y-increase");
const zIncrease = document.getElementById("z-increase");

const btnGenerateSummon = document.getElementById("summon");
const result = document.getElementById("result");
const btnCopy = document.getElementById("copy");

const checkBMultiple = document.getElementById("multiple");
const inAmount = document.getElementById("amount");
const checkBInvisible = document.getElementById("invisible");

const secondFieldFiller = 65536;
const forthFieldFiller = 281474976710656;

btnGenerateSummon.addEventListener("click", generateSummon);
btnCopy.addEventListener("click", copyCommand);

"use strict";

function generateSummon() {
  let UUIDMost = second.value > 0 ? second.value + 16 ** 4 : 0;
  UUIDMost += third.value;
  UUIDMost = Number(UUIDMost);
  let UUIDLeast = forth.value > 0 ? forth.value + 16 ** 13 : 0;
  UUIDLeast += fifth.value;
  UUIDLeast = Number(UUIDLeast);

  const UUIDMostHex = UUIDMost.toString(16);
  const UUIDLeastHex = UUIDLeast.toString(16);

  const command = `summon minecraft:armor_stand ${x.value} ${y.value} ${
    z.value
  } {UUIDMost:${UUIDMostHex}l,UUIDLeast:${UUIDLeast}l,NoGravity:true,CustomName:"\\"${0}-${second.value.toString(
    16
  )}-${third.value.toString(16)}-${forth.value.toString(
    16
  )}-${fifth.value.toString(16)}\\"",CustomNameVisible:true}`;

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
const x = document.getElementById("x");
const y = document.getElementById("y");
const z = document.getElementById("z");
const btnGenerateSummon = document.getElementById("summon");
const result = document.getElementById("result");
const btnCopy = document.getElementById("copy");

btnGenerateSummon.addEventListener("click", generateSummon);
btnCopy.addEventListener("click", copyCommand);

"use strict";

function generateSummon() {
  let field1 = first.value;
  let field2 = second.value;
  let field3 = third.value;
  let field4 = forth.value;
  let field5 = fifth.value;

  field1 = Number(field1);
  field2 = Number(field2);
  field3 = Number(field3);
  field4 = Number(field4);
  field5 = Number(field5);

  let UUIDMost = field2 > 0 ? field2 * secondFieldFiller : 0;
  UUIDMost += field3;
  let UUIDLeast = field4 > 0 ? field4 * forthFieldFiller : 0;
  UUIDLeast += field5;

  const command = `summon minecraft:armor_stand ${x.value} ${y.value} ${
    z.value
  } {UUIDMost:${UUIDMost}l,UUIDLeast:${UUIDLeast}l,NoGravity:true,CustomName:"\\"${0}-${field2.toString(
    16
  )}-${field3.toString(16)}-${field4.toString(16)}-${field5.toString(
    16
  )}\\"",CustomNameVisible:true}`;

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

const secondFieldFiller = 65536;
const forthFieldFiller = 281474976710656;

btnGenerateSummon.addEventListener("click", generateSummon);
btnCopy.addEventListener("click", copyCommand);

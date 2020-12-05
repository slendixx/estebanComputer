# execute at 0-2-0-0-5 as 0-2-0-0-5 if block ~ ~-1 ~ minecraft:light_gray_wool run function ec0:alu/regmanipulation/stepfw
#case 0
#op1=1, op2=1, Ci-1=1 => s=1, Ci=1
execute at 0-2-0-0-5 if block ~ ~-1 ~ minecraft:white_wool run execute if block ~ ~-1 ~1 minecraft:white_wool run execute if block ~ ~-1 ~2 minecraft:white_wool run function ec0:alu/add/add111t
#case 1
#op1=1, op2=0, Ci-1=1 => s=0, Ci=1
execute at 0-2-0-0-5 if block ~ ~-1 ~ minecraft:white_wool run execute if block ~ ~-1 ~1 minecraft:black_wool run execute if block ~ ~-1 ~2 minecraft:white_wool run function ec0:alu/add/add101t
#case 2
#op1=0, op2=1, Ci-1=1 => s=0, Ci=1
execute at 0-2-0-0-5 if block ~ ~-1 ~ minecraft:black_wool run execute if block ~ ~-1 ~1 minecraft:white_wool run execute if block ~ ~-1 ~2 minecraft:white_wool run function ec0:alu/add/add011t
#case 3
#op1=0, op2=0, Ci-1=1 => s=0, Ci=1
execute at 0-2-0-0-5 if block ~ ~-1 ~ minecraft:black_wool run execute if block ~ ~-1 ~1 minecraft:black_wool run execute if block ~ ~-1 ~2 minecraft:white_wool run function ec0:alu/add/add001t
#case 4
#op1=1, op2=1, Ci-1=0 => s=1, Ci=1
execute at 0-2-0-0-5 if block ~ ~-1 ~ minecraft:white_wool run execute if block ~ ~-1 ~1 minecraft:white_wool run execute if block ~ ~-1 ~2 minecraft:black_wool run function ec0:alu/add/add110t
#case 5
#op1=1, op2=0, Ci-1=0 => s=1, Ci=1
execute at 0-2-0-0-5 if block ~ ~-1 ~ minecraft:white_wool run execute if block ~ ~-1 ~1 minecraft:black_wool run execute if block ~ ~-1 ~2 minecraft:black_wool run function ec0:alu/add/add100t
#case 6
#op1=0, op2=1, Ci-1=0 => s=1, Ci=1
execute at 0-2-0-0-5 if block ~ ~-1 ~ minecraft:black_wool run execute if block ~ ~-1 ~1 minecraft:white_wool run execute if block ~ ~-1 ~2 minecraft:black_wool run function ec0:alu/add/add010t
#case 7
#op1=0, op2=0, Ci-1=0 => s=1, Ci=1
execute at 0-2-0-0-5 if block ~ ~-1 ~ minecraft:black_wool run execute if block ~ ~-1 ~1 minecraft:black_wool run execute if block ~ ~-1 ~2 minecraft:black_wool run function ec0:alu/add/add000t
execute at 0-2-0-0-5 as 0-2-0-0-5 run tp @s ~1 ~ ~
execute at 0-2-0-0-5 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-1-2-6-4 run setblock ~ ~-1 ~ minecraft:stone destroy
execute at 0-2-0-0-5 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-1-2-6-5 run setblock ~ ~-1 ~ minecraft:redstone_block destroy
execute at 0-2-0-0-5 as 0-2-0-0-5 if block ~ ~-1 ~ minecraft:gray_wool run function ec0:is/branch/call/clearcarry
execute at 0-2-0-0-5 as 0-2-0-0-5 if block ~ ~-1 ~ minecraft:gray_wool run tp @s 0-2-0-0-6
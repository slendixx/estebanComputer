execute at 0-2-0-0-0 as 0-2-0-0-0 if block ~ ~-1 ~ minecraft:light_gray_wool run
    tp @s ~1 ~ ~
#case 0
#op1=1, op2=1, Ci-1=1 => s=1, Ci=1
execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:white_wool run execute if block ~ ~-1 ~1 minecraft:white_wool run execute if block ~ ~-1 ~2 minecraft:white_wool run function ec0:alu/add/add_111
#case 1
#op1=1, op2=0, Ci-1=1 => s=0, Ci=1
execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:white_wool run execute if block ~ ~-1 ~1 minecraft:black_wool run execute if block ~ ~-1 ~2 minecraft:white_wool run function ec0:alu/add/add_101
#case 2
#op1=0, op2=1, Ci-1=1 => s=0, Ci=1
execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:black_wool run execute if block ~ ~-1 ~1 minecraft:white_wool run execute if block ~ ~-1 ~2 minecraft:white_wool run function ec0:alu/add/add_011
#case 3
#op1=0, op2=0, Ci-1=1 => s=0, Ci=1
execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:black_wool run execute if block ~ ~-1 ~1 minecraft:black_wool run execute if block ~ ~-1 ~2 minecraft:white_wool run function ec0:alu/add/add_001
#case 4
#op1=1, op2=1, Ci-1=0 => s=1, Ci=1
execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:white_wool run execute if block ~ ~-1 ~1 minecraft:white_wool run execute if block ~ ~-1 ~2 minecraft:black_wool run function ec0:alu/add/add_110
#case 5
#op1=1, op2=0, Ci-1=0 => s=1, Ci=1
execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:white_wool run execute if block ~ ~-1 ~1 minecraft:black_wool run execute if block ~ ~-1 ~2 minecraft:black_wool run function ec0:alu/add/add_100
#case 6
#op1=0, op2=1, Ci-1=0 => s=1, Ci=1
execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:black_wool run execute if block ~ ~-1 ~1 minecraft:white_wool run execute if block ~ ~-1 ~2 minecraft:black_wool run function ec0:alu/add/add_010
#case 7
#op1=0, op2=0, Ci-1=0 => s=1, Ci=1
execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:black_wool run execute if block ~ ~-1 ~1 minecraft:black_wool run execute if block ~ ~-1 ~2 minecraft:black_wool run function ec0:alu/add/add_000

execute at 0-2-0-0-0 as 0-2-0-0-0 run tp @s ~1 ~ ~

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-2-0-0-2 run setblock ~ ~-1 ~ minecraft:stone destroy

execute at 0-2-0-0-0 as 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run tp @s 0-2-0-0-1
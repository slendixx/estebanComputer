execute at 0-2-0-0-0 if block ~ ~-1 ~1 white_wool run function ec0:alu/op2c2/c21
execute at 0-2-0-0-0 if block ~ ~-1 ~1 black_wool run function ec0:alu/op2c2/c20

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-2-0-11-1 run setblock ~ ~-1 ~ minecraft:stone destroy
# execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-2-0-11-2 run setblock ~ ~-1 ~ minecraft:redstone_block destroy

execute at 0-2-0-0-0 as 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run tp @s 0-2-0-0-1
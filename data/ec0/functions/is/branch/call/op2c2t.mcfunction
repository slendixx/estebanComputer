execute at 0-2-0-0-5 if block ~ ~-1 ~1 white_wool run function ec0:alu/op2c2/c21t
execute at 0-2-0-0-5 if block ~ ~-1 ~1 black_wool run function ec0:alu/op2c2/c20t

execute at 0-2-0-0-5 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-1-2-5-2 run setblock ~ ~-1 ~ minecraft:stone destroy
execute at 0-2-0-0-5 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-1-2-5-3 run setblock ~ ~-1 ~ minecraft:redstone_block destroy

execute at 0-2-0-0-5 as 0-2-0-0-5 if block ~ ~-1 ~ minecraft:gray_wool run tp @s 0-2-0-0-6


# execute at 0-2-0-0-0 as 0-2-0-0-0 if block ~ ~-1 ~ minecraft:light_gray_wool run function ec0:alu/regmanipulation/stepfw

execute at 0-2-0-0-0 if block ~ ~-1 ~ white_wool run setblock ~ ~-1 ~1 white_wool

execute at 0-2-0-0-0 if block ~ ~-1 ~ black_wool run setblock ~ ~-1 ~1 black_wool

execute at 0-2-0-0-0 as 0-2-0-0-0 run function ec0:alu/regmanipulation/stepfw

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-2-0-c-0 run setblock ~ ~-1 ~ minecraft:stone destroy

execute at 0-2-0-0-0 as 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run tp @s 0-2-0-0-1
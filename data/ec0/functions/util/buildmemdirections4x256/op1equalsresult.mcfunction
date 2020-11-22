execute at 0-2-0-0-0 if block ~ ~-1 ~3 white_wool run setblock ~ ~-1 ~ white_wool

execute at 0-2-0-0-0 if block ~ ~-1 ~3 black_wool run setblock ~ ~-1 ~ black_wool

execute at 0-2-0-0-0 as 0-2-0-0-0 run tp @s ~1 ~ ~

execute at 0-2-0-0-0 if block ~ ~-1 ~ gray_wool run execute at 0-5-0-0-4 run setblock ~ ~-1 ~ stone destroy
execute at 0-2-0-0-0 if block ~ ~-1 ~ gray_wool run execute at 0-5-0-0-0 run setblock ~ ~-1 ~ redstone_block destroy
execute at 0-2-0-0-0 as 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run tp @s 0-2-0-0-1
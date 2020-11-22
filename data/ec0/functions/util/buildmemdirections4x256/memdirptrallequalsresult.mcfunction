execute at 0-2-0-0-0 if block ~ ~-1 ~3 white_wool run function ec0:util/buildmemdirections4x256/memdirptr1

execute at 0-2-0-0-0 if block ~ ~-1 ~3 black_wool run function ec0:util/buildmemdirections4x256/memdirptr0

execute at 0-2-0-0-0 as 0-2-0-0-0 run tp @s ~1 ~ ~

execute at 0-2-0-0-0 if block ~ ~-1 ~ gray_wool run execute at 0-5-0-0-2 run setblock ~ ~-1 ~ stone destroy
execute at 0-2-0-0-0 if block ~ ~-1 ~ gray_wool run execute at 0-5-0-0-3 run setblock ~ ~-1 ~ redstone_block destroy
execute at 0-2-0-0-0 as 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run tp @s 0-2-0-0-1




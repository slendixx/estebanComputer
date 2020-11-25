# execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:white_wool  run execute at 0-2-0-0-0 if block ~ ~-1 ~1 minecraft:white_wool run execute at 0-2-0-0-0 run setblock ~ ~-1 ~3 minecraft:white_wool destroy

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:white_wool run execute if block ~ ~-1 ~1 minecraft:white_wool run setblock ~ ~-1 ~3 minecraft:white_wool destroy

execute at 0-2-0-0-0 as 0-2-0-0-0 run tp @s ~1 ~ ~

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-2-0-3-0 run setblock ~ ~-1 ~ minecraft:stone destroy

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-2-0-3-1 run setblock ~ ~-1 ~ minecraft:redstone_block destroy

execute at 0-2-0-0-0 as 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run tp @s 0-2-0-0-1

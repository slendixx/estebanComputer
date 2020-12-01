execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:black_wool run execute at 0-2-0-0-0 if block ~ ~-1 ~1 minecraft:black_wool run execute at 0-2-0-0-0 run setblock ~ ~-1 ~3 minecraft:black_wool destroy

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-2-0-0-0 if block ~ ~-1 ~1 minecraft:black_wool run execute at 0-2-0-0-0 run setblock ~ ~-1 ~3 minecraft:black_wool destroy

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:black_wool run execute at 0-2-0-0-0 if block ~ ~-1 ~1 minecraft:white_wool run execute at 0-2-0-0-0 run setblock ~ ~-1 ~3 minecraft:black_wool destroy

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-2-0-0-0 if block ~ ~-1 ~1 minecraft:white_wool run execute at 0-2-0-0-0 run setblock ~ ~-1 ~3 minecraft:white_wool destroy

execute at 0-2-0-0-0 as 0-2-0-0-0 run tp @s ~1 ~ ~

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-2-0-9-0 run setblock ~ ~-1 ~ minecraft:stone destroy

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run function ec0:cu/ibr/runtestforibr

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run function ec0:alu/updatepsr

execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run tp 0-2-0-0-0 0-2-0-0-1

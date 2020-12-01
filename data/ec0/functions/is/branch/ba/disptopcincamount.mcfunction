# update the BRANCH STATE
execute at 0-1-0-0-4 run setblock ~ ~-1 ~ minecraft:white_wool destroy

# Link from 0-1-0-2-... to 0-1-0-4-...
# bit 0
execute at 0-1-0-2-0 if block ~ ~-1 ~ minecraft:black_wool run execute at 0-1-0-4-0 run setblock ~ ~-1 ~ minecraft:black_wool destroy
execute at 0-1-0-2-0 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-4-0 run setblock ~ ~-1 ~ minecraft:white_wool destroy
# bit 1
execute at 0-1-0-2-1 if block ~ ~-1 ~ minecraft:black_wool run execute at 0-1-0-4-1 run setblock ~ ~-1 ~ minecraft:black_wool destroy
execute at 0-1-0-2-1 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-4-1 run setblock ~ ~-1 ~ minecraft:white_wool destroy
# bit 2
execute at 0-1-0-2-2 if block ~ ~-1 ~ minecraft:black_wool run execute at 0-1-0-4-2 run setblock ~ ~-1 ~ minecraft:black_wool destroy
execute at 0-1-0-2-2 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-4-2 run setblock ~ ~-1 ~ minecraft:white_wool destroy
# bit 3
execute at 0-1-0-2-3 if block ~ ~-1 ~ minecraft:black_wool run execute at 0-1-0-4-3 run setblock ~ ~-1 ~ minecraft:black_wool destroy
execute at 0-1-0-2-3 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-4-3 run setblock ~ ~-1 ~ minecraft:white_wool destroy
# bit 4
execute at 0-1-0-2-4 if block ~ ~-1 ~ minecraft:black_wool run execute at 0-1-0-4-4 run setblock ~ ~-1 ~ minecraft:black_wool destroy
execute at 0-1-0-2-4 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-4-4 run setblock ~ ~-1 ~ minecraft:white_wool destroy
# bit 5
execute at 0-1-0-2-5 if block ~ ~-1 ~ minecraft:black_wool run execute at 0-1-0-4-5 run setblock ~ ~-1 ~ minecraft:black_wool destroy
execute at 0-1-0-2-5 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-4-5 run setblock ~ ~-1 ~ minecraft:white_wool destroy
# bit 6
execute at 0-1-0-2-6 if block ~ ~-1 ~ minecraft:black_wool run execute at 0-1-0-4-6 run setblock ~ ~-1 ~ minecraft:black_wool destroy
execute at 0-1-0-2-6 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-4-6 run setblock ~ ~-1 ~ minecraft:white_wool destroy
# bit 7
execute at 0-1-0-2-7 if block ~ ~-1 ~ minecraft:black_wool run execute at 0-1-0-4-7 run setblock ~ ~-1 ~ minecraft:black_wool destroy
execute at 0-1-0-2-7 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-4-7 run setblock ~ ~-1 ~ minecraft:white_wool destroy
# bit 8
execute at 0-1-0-2-8 if block ~ ~-1 ~ minecraft:black_wool run execute at 0-1-0-4-8 run setblock ~ ~-1 ~ minecraft:black_wool destroy
execute at 0-1-0-2-8 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-4-8 run setblock ~ ~-1 ~ minecraft:white_wool destroy
# bit 9
execute at 0-1-0-2-9 if block ~ ~-1 ~ minecraft:black_wool run execute at 0-1-0-4-9 run setblock ~ ~-1 ~ minecraft:black_wool destroy
execute at 0-1-0-2-9 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-4-9 run setblock ~ ~-1 ~ minecraft:white_wool destroy
# bit 10
execute at 0-1-0-2-a if block ~ ~-1 ~ minecraft:black_wool run execute at 0-1-0-4-a run setblock ~ ~-1 ~ minecraft:black_wool destroy
execute at 0-1-0-2-a if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-4-a run setblock ~ ~-1 ~ minecraft:white_wool destroy

execute at 0-1-2-7-0 run setblock ~ ~-1 ~ minecraft:stone destroy

function ec0:cu/pc/runpctoalu
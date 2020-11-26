# # mem module 0
# execute at 0-3-0-0-0 if block ~ ~-3 ~ minecraft:black_wool run execute if block ~1 ~-3 ~ minecraft:black_wool run execute at 0-3-3-0-0 run setblock ~ ~-1 ~ minecraft:redstone_block destroy
# # mem module 1
# execute at 0-3-0-1-0 if block ~ ~-6 ~ minecraft:white_wool run execute if block ~1 ~-6 ~ minecraft:black_wool run execute at 0-3-3-1-0 run setblock ~ ~-1 ~ minecraft:redstone_block destroy
# # mem module 2
# execute at 0-3-0-2-0 if block ~ ~-9 ~ minecraft:black_wool run execute if block ~1 ~-9 ~ minecraft:white_wool run execute at 0-3-3-2-0 run setblock ~ ~-1 ~ minecraft:redstone_block destroy
# # mem module 3
# execute at 0-3-0-3-0 if block ~ ~-12 ~ minecraft:white_wool run execute if block ~1 ~-12 ~ minecraft:white_wool run execute at 0-3-3-3-0 run setblock ~ ~-1 ~ minecraft:redstone_block destroy

# mem module 0
execute at 0-3-0-0-0 as 0-3-3-8-0 if block ~ ~-4 ~ minecraft:black_wool run execute if block ~1 ~-4 ~ minecraft:black_wool run function ec0:mem/memdeco/module0/rundecodemodule0
# mem module 1
execute at 0-3-0-1-0 if block ~ ~-7 ~ minecraft:white_wool run execute if block ~1 ~-7 ~ minecraft:black_wool run function ec0:mem/memdeco/module1/rundecodemodule1
# mem module 2
execute at 0-3-0-2-0 if block ~ ~-10 ~ minecraft:black_wool run execute if block ~1 ~-10 ~ minecraft:white_wool run function ec0:mem/memdeco/module2/rundecodemodule2
# mem module 3
execute at 0-3-0-3-0 if block ~ ~-13 ~ minecraft:white_wool run execute if block ~1 ~-13 ~ minecraft:white_wool run function ec0:mem/memdeco/module3/rundecodemodule3

execute at 0-3-3-8-0 run setblock ~ ~-1 ~ minecraft:stone destroy
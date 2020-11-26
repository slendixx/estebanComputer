# execute at 0-2-0-0-2 as 0-2-0-0-2 run tp @s ~1 ~ ~
# execute at 0-2-0-0-3 as 0-2-0-0-3 run tp @s ~1 ~ ~
execute at 0-2-0-0-5 as 0-2-0-0-5 run tp @s ~1 ~ ~
execute at 0-2-0-0-7 as 0-2-0-0-7 run tp @s ~1 ~ ~

execute at 0-2-0-0-2 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-2-0-3-2 run setblock ~ ~-1 ~ minecraft:stone destroy
execute at 0-2-0-0-2 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-2-0-3-3 run setblock ~ ~-1 ~ minecraft:redstone_block destroy

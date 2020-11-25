execute at 0-2-0-0-0 as 0-2-0-0-0 run tp @s ~1 ~ ~

execute at 0-2-0-0-0 if block ~ ~-1 ~1 white_wool run execute at 0-2-0-2-0 run setblock ~ ~-1 ~ stone destroy
execute at 0-2-0-0-0 if block ~ ~-1 ~1 white_wool run execute at 0-2-0-2-1 run setblock ~ ~-1 ~ redstone_block destroy
execute at 0-2-0-0-0 if block ~ ~-1 ~1 white_wool run execute at 0-2-0-0-0 as 0-2-0-0-0 run tp @s ~1 ~ ~


#execute at 0-2-0-0-0 if block ~ ~-1 ~ minecraft:gray_wool run execute at 0-2-0-10-0 run setblock ~ ~-1 ~ minecraft:stone destroy If op1 is 0, this line should jump to the last mcfunction on this chain (end the microfunction)
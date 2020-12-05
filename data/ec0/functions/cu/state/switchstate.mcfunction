execute at 0-1-0-0-3 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-0-3 run setblock ~ ~-1 ~ minecraft:black_wool destroy

execute at 0-1-0-0-1 if block ~ ~-1 ~ minecraft:white_wool run execute at 0-1-0-0-2 if block ~ ~-1 ~ minecraft:black_wool run function ec0:cu/state/cycle

execute as @p run say "Step complete"

execute at 0-1-0-0-3 if block ~ ~-1 ~ minecraft:white_wool run function ec0:cu/state/error

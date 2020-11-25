# summon minecraft:armor_stand 7 20 -1 {UUIDMost:655360l,UUIDLeast:0l,NoGravity:true,CustomName:"\"0-a-0-0-0\"",CustomNameVisible:true}
# summon minecraft:armor_stand 7 23 -1 {UUIDMost:655360l,UUIDLeast:1l,NoGravity:true,CustomName:"\"0-a-0-0-1\"",CustomNameVisible:true}
# summon minecraft:armor_stand 7 26 -1 {UUIDMost:655360l,UUIDLeast:2l,NoGravity:true,CustomName:"\"0-a-0-0-2\"",CustomNameVisible:true}
# summon minecraft:armor_stand 7 29 -1 {UUIDMost:655360l,UUIDLeast:3l,NoGravity:true,CustomName:"\"0-a-0-0-3\"",CustomNameVisible:true}

# execute at 0-a-0-0-0 run setblock ~ ~-1 ~ gray_wool destroy
# execute at 0-a-0-0-1 run setblock ~ ~-1 ~ gray_wool destroy
# execute at 0-a-0-0-2 run setblock ~ ~-1 ~ gray_wool destroy
# execute at 0-a-0-0-3 run setblock ~ ~-1 ~ gray_wool destroy

# execute at 0-a-0-0-0 as 0-a-0-0-0 run tp @s ~ ~ ~1
# execute at 0-a-0-0-1 as 0-a-0-0-1 run tp @s ~ ~ ~1
# execute at 0-a-0-0-2 as 0-a-0-0-2 run tp @s ~ ~ ~1
# execute at 0-a-0-0-3 as 0-a-0-0-3 run tp @s ~ ~ ~1

execute as 0-a-0-0-0 run kill @s
execute as 0-a-0-0-1 run kill @s
execute as 0-a-0-0-2 run kill @s
execute as 0-a-0-0-3 run kill @s


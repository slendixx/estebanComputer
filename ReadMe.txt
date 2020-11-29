******************************************************
Armor Stand (AS) Naming format: x-x-x-x-x
******************************************************

    · first field: unutilized
    · second field:  Computer structural component the AS belongs to
        0: system bus
        1: CU
        2: ALU
        3: Memory
        4: I/O
        5: GPU
    · third field: Internal section of the component the AS belongs to
    · forth field (optional): micro-operation the AS belongs to 
    · fifth field: AS number
    

******************************************************
AS index
******************************************************

system bus
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
0-0:
    1: CU


    2: ALU
        1-0: bit-lvl op1 register pointer nº0
        ...
        1-31: bit-lvl op1 register pointer nº31

        2-0: bit-lvl op2 register pointer nº0
        ...
        2-31: bit-lvl op2 register pointer nº31

        3-0: bit-lvl carry register pointer nº0
        ...
        3-31: bit-lvl carry register pointer nº31

        4-0: bit-lvl result register pointer nº0
        ...
        4-31: bit-lvl result register pointer nº31

        5-0: bit-lvl t0 register pointer nº0
        ...
        5-31: bit-lvl t0 register pointer nº31

        6-0: bit-lvl t1 register pointer nº0
        ...
        6-31: bit-lvl t1 register pointer nº31
        
        7-0: bit-lvl t2 register pointer nº0
        ...
        7-31: bit-lvl t2 register pointer nº31

        8-0: bit-lvl t3 register pointer nº0
        ...
        8-31: bit-lvl t3 register pointer nº31

    3:  Memory
        0-0: bit-lvl memory pointer nº0
        ...
        0-31: bit-lvl memory pointer nº31
    
CU
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
0-1-0: registers
    0: Computer state pointers:
        0: BOOT
        1: INSTRUCTION CYCLE
        2: HALT
        3: ERROR
        4: BRANCH
        5: SUBRUTINE
        6: IBR
            this state register determines whether or not there is an instruction in the IBR register. a value of 0x0000 in the IBR means there's no instruction there.
    1: PC
        0: bit-lvl register pointer nº0
        ...
        9: bit-lvl register pointer nº9
    2: IR
        0: bit-lvl register pointer nº0
        ...
        15: bit-lvl register pointer nº15
    3: IBR
        0: bit-lvl register pointer nº0
        ...
        15: bit-lvl register pointer nº15
    4: PC increase amount register
        0: bit-lvl register pointer nº0
        ...
        9: bit-lvl register pointer nº9
    5: Subrutine callback register
        0: bit-lvl register pointer nº0
        ...
        9: bit-lvl register pointer nº9


0-1-1: Instruction cycle:
    0: Read next instruction
        0: 'pctomar'
        1: 'rundecodememmoduleselector'
        2: 'ifmemready'{
            3: '00300toir'
        } else{
            # wait
        }
        4: '00300toibr'
        5: 'rundecodeoptype'
    1: Decode instruction
        0: decodeoptype
        1: 'opt00'
        2: 'opt01'
        3: 'opt10'
        4: 'opt11'
    2: Execute instruction
        0: #run whichever instruction
    3: Check for instruction in IBR
        0: testforibr
        1: if testforibr{
            ibrtoir
        } else{
            runincpc
        }
    4: Increase PC
        0: 'pctoalu': op1 = pc, op2 = pc inc amount
        1: incpc
        2: clearcarry
        3: resulttopc
        4: if BRANCH{
            5: resetpcincamount
        }

    5: check computer state
        0: if CYCLE{
            1: runrnextinstruction
        } else{
            #wait
        }

0-1-2: Instruction set implementation
    0: ld00
        0: 'ir11tomar'
        1: 'rundecodemoduleselector'
        2: 'ifmemready'{
            3: '00300to00210'
        } else{
            # wait
        }

        4: 'runtestforibr' 
        # continue with the instruction cycle


ALU
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
0-2-0: registers
    0-0: bit-lvl register pointer
    0-1: bit-lvl register pointer start pos
    0-2: bit-lvl mul result pointer
    0-3: bit-lvl mul result pointer position 
    0-4: bit-lvl mul result pointer start pos
    0-5: bit.lvl temporal register 0 pointer
    0-6: bit.lvl temporal register 0 pointer start pos
    0-7: bit.lvl temporal register 1 pointer
    0-8: bit.lvl temporal register 1 pointer start pos
    0-9: bit.lvl temporal register 2 pointer
    0-a: bit.lvl temporal register 2 pointer start pos
    0-b: bit.lvl temporal register 3 pointer
    0-c: bit.lvl temporal register 3 pointer start pos

    1 'add':
        0: 'add'
        1: 'clearcarry'

    2 'sub':
        0: 'lookforfirst1'
        1: 'c2'
        2: 'add'
        3: 'clearcarry'

    3 'mul':
        0: 'mul'
        1: 'addmulresult'
        2: 'stepmulresultptrs'
        3: 'clearcarry'
        4: 'testformulend'

    b 'op1equalsop2':
        0: 'runop1equalsop2'

    c 'op2equalsop1':       
        0: 'runop2equalsop1'
    d 'clearop1':
        0: 'clearop1'
    e 'clearop2':
        0: 'clearop2'
    f 'op1equalsresult':
        0: 'runop1equalsresult'
    10 'op1c2':
        0:  'lookforfirst1'
        1:  'c2'
    11 'op1c2':
        0:  'lookforfirst1'
        1:  'c2'
    12 'op2equalsresult':
        0: 'runop2equalsresult'
    13 'clearcarry':
        0: 'runclearcarry'

Memory
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
0-3-0: mem module decoder pointers:
    0-... :module 0
    1-... :module 1
    2-... :module 2
    3-... :module 3

0-3-1: mem decoder pointers:
    0:
        0: decoder 0 memory direction pointer
        1: decoder 0 bit-lvl direction pointer nº0
        ...
        8: decoder 0 bit-lvl direction pointer nº8
    1:
        0: decoder 0 memory direction pointer
        1: decoder 0 bit-lvl direction pointer nº0
        ...
        8: decoder 0 bit-lvl input pointer nº8
    2:
        0: decoder 0 memory direction pointer
        1: decoder 0 bit-lvl direction pointer nº0
        ...
        8: decoder 0 bit-lvl direction pointer nº8
    3:
        0: decoder 0memory direction pointer
        1: decoder 0 bit-lvl direction pointer nº0
        ...
        8: decoder 0 bit-lvl direction pointer nº8

    8: 
        0: bit-lvl input direction pointer nº0
        ...
        10: bit-lvl input direction pointer nº10
    
0-3-2:
    0-0: memory decoder result ptr 'decoresultptr'
    1-0: memory state READY: =1 indicates that the memory is ready to decode another direction, bc it has finished decoding the last one. =0 the memory is decoding a direction

0-3-3: functions
    0: decode mem module 0
        0: 'decodemodule0'
        1: 'testfordirmatch'
        2: 'ifdirmatch'{
            # memory direction found
            3: 'pointtoresult'
            4: 'dirptrstobegin'
        } else{
            # memory direction not yet found
            5: 'stepdirptrs'
        }
        6: 'resetdirmatchcond'
    1: decode mem module 1
        0: 'decodemodule1'
    2: decode mem module 2
        0: 'decodemodule2'
    3: decode mem module 3
        0: 'decodemodule3'

    8:  decode mem module selector
        0: 'decodemoduleselector'    
    9: decoder bit-lvl dir match pointers
        0: bit-lvl dir match pointer nº0
        ...
        7: bit-lvl dir match pointer nº7
    a-0: decoder dir match observer


GPU
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
utilities 'util'
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
0-5-0: 
    0 'buildmemdirections256':
        0: 'runbuildmemdirections256'
        1: 'add'
        2: 'memdirptrallequalsresult'
        3: 'memdirptrallnextdir'
        4: 'op1equalsresult'

******************************************************
mcfunction index
******************************************************

system bus 'bus'
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
CU 'cu'
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨

ALU 'alu'
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
addition 'add' DONE
    runadd
    add000
    add001
    add010
    add011
    add100
    add101
    add110
    add111

TODO
subtraction 'sub' 
multiplication 'mul'
division 'div'
rshift
lshift
abs
or
and
not
complement op1 to 2 'op1c2' DONE
complemnet op2 to 2 'op2c2' DONE

TODO
register manipulation 'regmanipulation' 
    step forward 'stepfw' DONE
    step backward 'stepbw' DONE
    op1 <- op2 'op1equalsop2'DONE
    op2 <- op1 'op2equalsop1'DONE
    op1 <- result DONE
    op2 <- result DONE
    bit-lvl ptr to begin BUG # Caused some functions to be ignored. has been removed.
    op1c2 DONE
    op2c2 DONE 
    op2equalsresult DONE
    clearcarry DONE

    
    

Memory 'mem'
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
links from bit-lvl mem pointer nº 0-31 to alu bit-lvl register pointers and back DONE
links between alu bit-lvl pointers TODO

GPU 'gpu'
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
utilities 'util'
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
DONE
init AS 'initas'
TODO
build 512 memory directions  'buildmemdirections512':
    builds 512 memory directions

******************************************************
instruction formats TODO
******************************************************
    instruction word length: 16 bits

    ·Arithmetic & logic instructions:

    ·data transfer instructions:

    ·branch instructions:
        call
        jumpl
        ba
        be
        bo
        bneg
    ·I/O:
        read number 'rn'
        read char 'rc'
        read string 'rs'
        print string 'ps'
        print number 'ps'
        
        some other graphic instruction/s

******************************************************
instruction set
******************************************************
·Arithmetic & logic instructions:
        add
        sub
        mul
        div
        rshift
        lshift
        abs
        or
        and
        not
        c2
    ·data transfer instructions:
        st
        ld
    ·branch instructions:
        call
        jumpl
        ba
        be
        bo
        bneg
    ·I/O:
        read number 'rn'
        read char 'rc'
        read string 'rs'
        print string 'ps'
        print number 'ps'
        
        some other graphic instruction

******************************************************
microprogram format
******************************************************

    ·single mcfunction microprogram called from command block: 
        create an mcfunction for the actual microprogram and a runner with name 'run' + mcfunctionName.mcfunction

    ·single mcfunction microprogram called from mcfunction:
        simply create an mcfunction

    ·multi-mcfunction microprogram: 
        create a subdir with the microprogram name. inside place a runner with its respective mcfunction &
        all the required mcfunctions.
        all the runner does is link to the next mcfunction.
        mcfunction linking is done by placing a redstone_block under the AS that represents the next mcfunction in the sequence & a
        stone block under AS of the mcfunction that has just finished execution.


******************************************************
Arithmetic details
******************************************************
    ·Negative numbers: represented with complement to the base (2).
    ·Division: slow division algorithm:
        if op2 == 0
            math error
        if sign(op2) != 1
            'op2c2'
            fd
        
        
******************************************************
instructions
******************************************************

op. type: 00 
Data Transfer
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
ld M(rs)
opt op  rd  K   rs
00  0   0   0   00000000000

ld K()
opt op  rd  K   const
00  0   0   1   00000000000

st
opt op  N/A N/A rd
00  1   0   0   00000000000


op. type: 01 
Arithmetic & logic
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
add
opt op   N/A
01  0000 0000000000

sub
opt op   N/A
01  0001 0000000000

mul
opt op   N/A
01  0010 0000000000

div
opt op   N/A
01  0011 0000000000

rshift
opt op   N/A
01  0100 0000000000

lshift
opt op   N/A
01  0101 0000000000

or
opt op   N/A
01  0101 0000000000

and
opt op   N/A
01  0101 0000000000

not
opt op   rd N/A
01  0101 0  000000000

not
opt op   rd N/A
01  0101 1  000000000

abs
opt op   rd N/A
01  0101 0  000000000

abs
opt op   rd N/A
01  0101 0  000000000

op. type: 10 
Branch
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨

call
opt op  rd
10  000 00000000000

jump
opt op  rd
10  001 00000000000

ba
opt op  rd
10  010 00000000000

be
opt op  rd
10  011 00000000000

bneg
opt op  rd
10  100 00000000000

bo
opt op  rd
10  101 00000000000


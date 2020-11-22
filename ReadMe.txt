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
CU
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
ALU
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
0-2-0: registers
    0-0: bit-lvl register pointer
    0-1: bit-lvl register pointer start pos
    0-2: bit-lvl register pointer end pos

    1 'add':
        0: 'runadd'

    2 'sub':
        0: 'runsub'

    b 'op1equalsop2':
        0: 'runop1equalsop2'

    c 'op2equalsop1':       
        0: 'runop2equalsop1'
    d 'op1equalsresult':
        0: 'runop1equalsresult'
    e 'op2equalsresult':
        0: 'runop2equalsresult'
    f 'op1equalsresult':
        0: 'runop1equalsresult'
    10 'op2equalsresult:
        0: 'runop2equalsresult'
Memory
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
0-3-0: registers
    0: bank 0 pointers
        0: dir pointer 0
        1: dir pointer 0 start pos
    1: bank 1 pointers
            0: dir pointer 1
            1: dir pointer 1 start pos
    2: bank 2 pointers
            0: dir pointer 2
            1: dir pointer 2 start pos
    3: bank 3 pointers
            0: dir pointer 3
            1: dir pointer 3 start pos

GPU
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
utilities 'util'
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
0-5-0: 'buildmemdirections256'
    0-0: 'runbuildmemdirections256'

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

TODO
register manipulation 'regmanipulation' 
    step forward 'stepfw' DONE
    step backward 'stepbw' DONE
    op1 <- op2 DONE
    op2 <- op1 DONE
    op1 <- result DONE
    op2 <- result TODO
    bit-lvl ptr to begin TODO


Memory 'mem'
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
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
instruction formats
******************************************************
    instruction word length: 32 bits

    ·Arithmetic & logic instructions:
        operation type 'opt': 2 bits
        operation 'op': 5 bits

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
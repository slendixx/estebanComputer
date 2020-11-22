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
0-2-0: operands
    0-0: bit-lvl pointer
    0-1: bit-lvl pointer start pos
    0-2: bit-lvl pointer end pos

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
    e 'op2equalsresult'
        0: 'runop2equalsresult'
Memory
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
GPU
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨

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
    op1 <- result TODO
    op2 <- result TODO
    bit-lvl ptr to begin TODO


Memory 'mem'
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
GPU 'gpu'
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
utilities 'util'
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
init AS 'initas'
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
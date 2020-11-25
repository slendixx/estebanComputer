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
    op1 <- op2 DONE
    op2 <- op1 DONE
    op1 <- result DONE
    op2 <- result DONE
    bit-lvl ptr to begin BUG # Caused some functions to be ignored. has been removed.
    op1c2 DONE
    op2c2 DONE 
    op2equalsresult DONE
    clearcarry DONE

    
    

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
        
        



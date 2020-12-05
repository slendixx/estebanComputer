#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define DIRECTIVE 0
#define LABEL 1
#define KEYWORD 2
#define SYMBOL 3
#define COMMENT 4

const int directionAmount = 1024;
const int lastDirection = 1023;
const int maxStringLength = 200;
typedef char String [200];

typedef struct{
	int tokenType;
	String value;
}Token;

typedef struct{
	int line;
	String errorMsg;
}Error;

typedef struct{
	String id;
	int size;
	int directionStart;
	int directionEnd;
}Symbol;

typedef Symbol SymbolTable [1024];

int getCharIndex(String line, char c);
void parse();
int lookForBegin();
void syntaxCheck();
int lineSyntaxCheck(String line);
int testForDirective();
int testForLabel();
int testForInstruction();
int testForSymbol();

void parseSymbols();

void translate();

String filename;


int main(){

	strcpy(filename,"test.txt");	
		
	
	
	
	int programPointer = 0;

	SymbolTable symbolTable;	
	
	String buffer;
	char * token;
	const char delim [2]= ".";
	token = strtok(filename,delim);
	
	printf("%s",token);
	
	parse();
	//translate();
	
}

int getCharIndex(String line, char c){
	for(int i = 0; i < strlen(line); i++){
		if(line[i] == c)
			return i;
	}	
	return -1;
}

void parse(){
	int begin = lookForBegin();
	syntaxCheck();
	printf("\n----------------------------------------");
	printf("\nNo syntax error detected.");
	//parseSymbols();
}

int lookForBegin(){
	FILE * source = fopen(filename,"a+");
	int begin = 0;
	String buffer;
	const char commentDelim [2] = "!"
	char * token;
	
	while(!feof(source)){
		fgets(buffer,maxStringLength,source);	
		token = strtok(buffer,commentDelim);
		//gotta find a way to find the .beg kw in the source file somehow
		if(strcmp(buffer,".beg\n") == 0){
			fclose(source);
			return begin;
		}
		if(strcmp(buffer,".beg \n") == 0){
			fclose(source);
			return begin;
		}
		if(strcmp(buffer,".beg\t\n") == 0){
			fclose(source);
			return begin;
		}
		if(strcmp(buffer,".beg\t\t\t\t\n") == 0){
			fclose(source);
			return begin;
		}
		begin++;
	}
	printf("\n----------------------------------------");
	printf("\nSyntax error: No .beg directive detected");
	printf("\nVerify that there are no characters after the .beg directive");
	
	fclose(source);
	exit(-1);
}

void syntaxCheck(){
	FILE * source = fopen(filename,"a+");	
	String line;
	int error;
	int lineCounter = 0;
	
	do{
		fgets(line,maxStringLength,source);	
		error = lineSyntaxCheck(line);
		if(error != 0){
			printf("\n------------------------------------------");
			printf("\nA syntax error has ocurred at line %d: \n",lineCounter);
			switch(error){
				case 1:
					printf("\\t expected\n");		
					break;
				case 2:
					printf("Numeric constant expected\n");		
					break;
			}
			fclose(source);
			exit(error);
		}
		
			++lineCounter;
	}while(!feof(source));
	
	
	fclose(source);
}

int lineSyntaxCheck(String line){
	int error = 0;
	error = testForDirective(line);
	//error = testForLabel(line);
	//error = testForInstruction(line);
	//error = testForSymbol(line);
	return error;
}
int testForDirective(String line){
	int error = 0;
	char ch = line[0];
	String buffer;
	
	if(ch == '.'){
		strncpy(buffer,line,4);
		if(strcmp(buffer,".beg") == 0){
			return 0; //No further syntax check required
		}
		if(strcmp(buffer,".end") == 0){
			return 0; //No further syntax check required
		}
		if(strcmp(buffer,".org") == 0){
			//check for a tab press
			if(line[4] == '\t'){
				
				switch(line[5]){
					case '0':
					case '1':
					case '2':
					case '3':
					case '4':
					case '5':
					case '6':
					case '7':
					case '8':
					case '9':	
						return 0; //Got a numeric constant
						break;
					default:
						return 2; //Numeric constant expected
				}
			} else{
				return 1; // \t expected
			}
		}
	}
	
	return 0; 
}
	

int testForLabel();
int testForInstruction();
int testForSymbol();
void parseSymbols(){
	
}



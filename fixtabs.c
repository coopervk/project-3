//Description:
//  Goes through a series of characters and replaces any tabs with double spaces
//Usage on Linux operating system:
//  gcc fixtabs.c
//  ./a.out < oldfile.txt > newfile.txt

#include <stdio.h>

int main(void) {
	char character;
	while((character=getchar()) != EOF)
		if(character=='\t')
			printf("  ");
		else
			printf("%c", character);

	return 0;
}

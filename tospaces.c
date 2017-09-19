//Description:
//  Goes through a series of characters and replaces any tabs with double spaces
//Usage on a GNU/Linux operating system:
//  gcc fixtabs.c
//  ./a.out < oldfile.txt > newfile.txt

#include <stdio.h>

int main(void) {
	char character;
	while((character=getchar()) != EOF)
		if(character=='\t')
			printf("  ");
		else
			putchar(character);

	return 0;
}

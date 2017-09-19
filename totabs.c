//Description:
//  Goes through a series of characters and replaces any double spaces with tabs
//Usage on a GNU/Linux operating system:
//  gcc fixtabs.c
//  ./a.out < oldfile.txt > newfile.txt

#include <stdio.h>

int main(void) {
	char character;
	short unsigned int prevcharspace=1;
	while(character=getchar()) {
		if(character==EOF)
			break;
		if(character==' ') {
			if(prevcharspace) {
				putchar('\t');
				prevcharspace = 0;
			}
			else
				prevcharspace = 1;
		}
		else {
			putchar(' ');
			putchar(character);
			prevcharspace = 0;
		}
	}

	return 0;
}

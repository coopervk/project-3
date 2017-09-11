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

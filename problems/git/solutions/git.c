#include <stdio.h>

int main() {
    char command = getchar();
    switch(c) {
        case 'i':
            puts("git status -s\n");
            break;
        case 's':
            puts("git add -A\n");
            puts("git commit -m \"Some changes\"\n");
            puts("git pull\n");
            puts("git push\n");
            break;
        case 'r':
            puts("git add -A\n");
            puts("git stash\n");
            puts("git pull\n");
            puts("git stash pop\n");
            break;
    }
    return 0;
}

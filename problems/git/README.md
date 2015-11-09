# [Git](http://www.spoj.com/BYU2015F/problems/GIT)

Solved by: [57](http://www.spoj.com/BYU2015F/ranks/GIT)

You can make post-contest submissions [here](http://www.spoj.com/problems/GIT).

## Solutions

This problem was a good starter problem, testing I/O and basic conditional logic.

```c
// C
#include <stdio.h>

int main() {
    char command = getchar();
    switch(c) {
        case 'i':
            puts("git status -s\n");
            break;
        case 'r':
            puts("git add -A\n");
            puts("git stash\n");
            puts("git pull\n");
            puts("git stash pop\n");
            break;
        case 's':
            puts("git add -A\n");
            puts("git commit -m \"Some changes\"\n");
            puts("git pull\n");
            puts("git push\n");
            break;
    }
    return 0;
}
```
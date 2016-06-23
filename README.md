# Implementation of test task using Node.js ###
 
### Installation:
    npm install

### Usage:

    node index.js method sum

- `method` - number of method to execute
    - 1 - common iteration O(n^4)
    - 2 - modification of first method, less then O(n^4) but still not so efficient
    - 3 - using hash maps of sums of every 2 numbers combination
- `sum` - sum of 4 digits

#### You can add numbers separated by comma to `numbers.txt`. 

Example:

    node index.js 3 42

Those two first methods was just for me to find right direction in solving this problem. 
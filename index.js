"use strict";

const
    fs = require('fs'),
    memwatch = require('memwatch-next');

let arr, S, result, iterations, file, method, hd, diff;

//Init data before test
file = fs.readFileSync('numbers.txt', 'utf8');
arr = file.split(',').map( s => Number(s.trim()) );
S = Number(process.argv[3]);    //sum for test
method = process.argv[2];   //one of three methods
iterations = 0;
result = null;

//Force Garbage collector for more precise result
memwatch.gc();

if(method === '1') {
    memwatch.gc();
    
    //Memory test
    hd = new memwatch.HeapDiff();
    findFourToSumPow4(arr, S);
    diff = hd.end();
    console.log("#".repeat(80), "\nMemory stats:");
    console.log(diff);
    console.log("#".repeat(80));

    iterations = 0;
    //Execution time test
    console.time('Execution time');
    findFourToSumPow4(arr, S);
    console.timeEnd('Execution time');
} else if(method === '2') {
    memwatch.gc();

    //Memory test
    hd = new memwatch.HeapDiff();
    findFourToSumPow4Modification(arr, S);
    diff = hd.end();
    console.log("#".repeat(80), "\nMemory stats:");
    console.log(diff);
    console.log("#".repeat(80));

    iterations = 0;
    //Execution time test
    console.time('Execution time');
    findFourToSumPow4Modification(arr, S);
    console.timeEnd('Execution time');
} else {
    memwatch.gc();

    //Memory test
    hd = new memwatch.HeapDiff();
    findFourToSumHash(arr, S);
    diff = hd.end();
    console.log("#".repeat(80), "\nMemory stats:");
    console.log(diff);
    console.log("#".repeat(80));

    iterations = 0;
    //Execution time test
    console.time('Execution time');
    findFourToSumHash(arr, S);
    console.timeEnd('Execution time');
}

console.log('Iterations: ', iterations);
console.log(result);






//O(n^4)
function findFourToSumPow4(arr, sum) {
    
    var i, j, k, l;

    for(i = 0; i < arr.length; i++) {
        for(j = 0; j < arr.length; j++) {
            for(k = 0; k < arr.length; k++) {
                for(l = 0; l < arr.length; l++) {
                    iterations++;
                    if(!unique(arr, i, j, k, l)) continue;
                    if( (arr[i] + arr[j] + arr[k] + arr[l]) === sum ) { 
                        result = [i, j, k, l];
                        return;
                    }
                }
            }
        }
    }

    function unique(arr, i, j, k, l) {
        return arr[i] !== arr[j] && arr[i] !== arr[k] && arr[i] !== arr[l] && arr[j] !== arr[k] && arr[j] !== arr[l] && arr[k] !== arr[l];
    }

}

// > O(n^2); < O(n^4)
function findFourToSumPow4Modification(arr, sum) {
    
    var i, j, k, l;

    for(i = 0; i < (arr.length - 3); i++) {
        for(j = i + 1; j < (arr.length - 2); j++) {
            for(k = j + 1; k < (arr.length - 1); k++) {
                for(l = k + 1; l < arr.length; l++) {
                    iterations++;
                    if(!unique(arr, i, j, k, l)) continue;
                    if( (arr[i] + arr[j] + arr[k] + arr[l]) === sum ) {
                        result = [i, j, k, l];
                        return;
                    }
                }
            }
        }
    }

    function unique(arr, i, j, k, l) {
        return arr[i] !== arr[j] && arr[i] !== arr[k] && arr[i] !== arr[l] && arr[j] !== arr[k] && arr[j] !== arr[l] && arr[k] !== arr[l];
    }
}

//O(n^2)
function findFourToSumHash(arr, sum) {
    
    var i, j, hashMap;

    hashMap = {};

    for(i = 0; i < (arr.length - 1); i++) {
        for(j = i + 1; j < arr.length; j++) {
            var pairSum = Number((arr[i] + arr[j]).toFixed(3));
            if(arr[i] !== arr[j]) hashMap[pairSum] = { i: i, j: j };
            iterations++;
        }
    }

    for(var hashSum in hashMap) {
        iterations++;
        var left = sum - Number(hashSum);
        if(hashMap[left] && unique(hashMap[hashSum], hashMap[left])) {
            result = [hashMap[hashSum].i, hashMap[hashSum].j, hashMap[left].i, hashMap[left].j];
            return;
        }

    }

    function unique(a, b) {
        return a.i !== b.i && a.i !== b.j && a.j !== b.i && a.j !== b.j;
    }

}
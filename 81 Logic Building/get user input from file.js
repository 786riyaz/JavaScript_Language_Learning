'use strict';

process.stdin.setEncoding('utf-8');

function calculate(a, b, c){
    //write the code to calculate a+b-c
    console.log((a + b) - c);
    
    
    
    //dont change the below code. If changed click on reset.
   
}


async function readInput() {
        let inputString = '';
        process.stdin.on('data', inputStdin => {
            inputString += inputStdin;
            const inputArr = inputString.split(/(?:\r\n|\r|\n)/g)
            console.log(inputArr);
            calculate(parseInt(inputArr[0]), parseInt(inputArr[1]), parseInt(inputArr[2]))
            process.exit();

        })

}
readInput();
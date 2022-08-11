function printSum(n) {
    let sum = 0;
    let j = 0;
    for (let i = 0; i < n; i++) {
        j = j + 5;
        sum = sum + j;
        console.log(j);
    }
    console.log(sum);
}

printSum(5);

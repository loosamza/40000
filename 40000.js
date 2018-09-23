let step = [1, 4, 5];
let n = 50;
let nstep = step.reverse();
let totalWay = 0;
let newArr = [];
Array.prototype.removeAllOf = function (value) {
    return this.filter(e => e !== value);
}

newArr = cal(nstep[0], [], 0, []);
newArr.forEach((e) => {
    totalWay += permutations(e);
});

console.log('number of way',totalWay);

function sum(total, num) {
    return total + num;
}
function multiplier(total, num) {
    return total * num;
}

function cal(e, arr, idx, resultArr) {
    let tempArr = arr;
    tempArr.push(e)
    if (tempArr.reduce(sum) < n) {
        return cal(e, tempArr, idx, resultArr);
    } else if (arr.reduce(sum) == n) {
        resultArr = checkDuplicate(tempArr, resultArr);
        if (tempArr[tempArr.length - 1] == 1) {
            let newArr = tempArr.removeAllOf(1);
            let popValue = newArr.pop();
            let nextIndex = nstep.indexOf(popValue) + 1;
            if (popValue > nstep[nextIndex]) {
                return cal(nstep[nextIndex], newArr, nextIndex, resultArr)
            }
        } else {
            let newArr = arr;
            let popValue = newArr.pop();
            let nextIndex = nstep.indexOf(popValue) + 1;
            return cal(nstep[nextIndex], newArr, nextIndex, resultArr)
        }
    } else {
        tempArr.pop();
        return cal(nstep[idx + 1], tempArr, idx + 1, resultArr);
    }
    return resultArr;
}

function checkDuplicate(arr1, arr2) {
    if (arr1.length === 0) {
        return arr2.push(arr1)
    } else {
        let isDup = [];
        for (let i = 0; i < arr2.length; i++) {
            if (JSON.stringify(arr2[i]) === JSON.stringify(arr1)) {
                isDup.push(true);
            } else {
                isDup.push(false);
            }
        }
        if (!isDup.includes(true)) {
            arr2.push(arr1);
        }
        return arr2;
    }
}

function factorial(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function permutations(array) {
    let counts = {};
    array.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
    let r = 1;
    for (let k in counts) {
        if (counts.hasOwnProperty(k)) {
            r *= factorial(counts[k])
        }
    }
    return factorial(array.length) / r;

}

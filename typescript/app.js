var n1 = document.getElementById("n1");
var n2 = document.getElementById("n2");
var buttonElement = document.querySelector("button");
var p = document.querySelector("p");
var numArr = [];
var textArr = [];
function add(n1, n2) {
    if (typeof n1 === "number" && typeof n2 === "number") {
        return n1 + n2;
    }
    else if (typeof n1 === "string" && typeof n2 === "string") {
        return n1 + " " + n2;
    }
    return +n1 + +n2;
}
function printObj(obj) {
    console.log(obj.val);
}
buttonElement.addEventListener("click", function () {
    {
        var n1Value = n1.value;
        var n2Value = n2.value;
        var resultNum = add(+n1Value, +n2Value);
        numArr.push(resultNum);
        var resultText = add(n1Value, n2Value);
        textArr.push(resultText);
        printObj({ val: resultNum });
        console.log(numArr, textArr);
    }
});
var promises = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("Resolved");
    }, 1000);
});
promises.then(function (result) {
    console.log(result);
});

const n1 = document.getElementById("n1")! as HTMLInputElement;
const n2 = document.getElementById("n2")! as HTMLInputElement;
const buttonElement = document.querySelector("button")!;
const p = document.querySelector("p")!;

const numArr: number[] = [];
const textArr: string[] = [];

function add(n1: number | string, n2: number | string) {
  if (typeof n1 === "number" && typeof n2 === "number") {
    return n1 + n2;
  } else if (typeof n1 === "string" && typeof n2 === "string") {
    return n1 + " " + n2;
  }
  return +n1 + +n2;
}

function printObj(obj: { val: number }) {
  console.log(obj.val);
}

buttonElement.addEventListener("click", () => {
  {
    const n1Value = n1.value;
    const n2Value = n2.value;
    const resultNum = add(+n1Value, +n2Value);
    numArr.push(resultNum as number);
    const resultText = add(n1Value, n2Value);
    textArr.push(resultText as string);
    printObj({ val: resultNum as number });
    console.log(numArr, textArr);
  }
});

const promises = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolved");
  }, 1000);
});

promises.then((result) => {
  console.log(result);
});

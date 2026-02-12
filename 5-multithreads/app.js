const {
  counterRandomNumbers,
  randomNumbers,
  splitSubArray,
} = require("./randomNumbers");
const { fork } = require("child_process");

function main() {
  console.log("Подсчёт Main");
  syncFunction();

  console.log("Подсчёт Fork");
  forkHandler();
}

function syncFunction(array) {
  performance.mark("sync start");
  counterRandomNumbers(randomNumbers());

  performance.mark("sync end");

  performance.measure("sync", "sync start", "sync end");
  console.log(performance.getEntriesByName("sync").pop().duration);
}

function forkFunction(array) {
  new Promise((resolve, reject) => {
    const forkProcess = fork("./fork.js");

    forkProcess.send({ array });

    forkProcess.on("message", (message) => {
      resolve(message);
    });
  });
}

const forkHandler = async () => {
    performance.mark("fork start");
  try {
    const subArray = splitSubArray(randomNumbers());

    const arrayForkPromises = [];

    for (let i = 0; i < subArray.length; i++) {
      arrayForkPromises.push(forkFunction(counterRandomNumbers(subArray[i])));
    }

    await Promise.all(arrayForkPromises).then((result) => console.log(result));
  } catch (error) {
    console.error(error.message);
  }
  performance.mark("fork end");

  performance.measure("fork", "fork start", "fork end");
  console.log(performance.getEntriesByName("fork").pop().duration);
};

main();

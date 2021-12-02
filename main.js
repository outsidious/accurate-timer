document.addEventListener("DOMContentLoaded", () => {
    const pause = document.getElementById("pause");
    const reset = document.getElementById("reset");
    const action = document.getElementById("action");
    const hoursElem = document.getElementById("hours");
    const minutesElem = document.getElementById("minutes");
    const secondsElem = document.getElementById("seconds");

    let timer = null;

    function incrementTime(time) {
        time.seconds = (time.seconds + 1) % 60;
        time.minutes = time.minutes + ((time.seconds === 0) % 60);
        time.hours =
            time.hours + (((time.minutes === 0) & (time.seconds === 0)) % 100);
    }

    function updateTime(time) {
        secondsElem.innerText = time.seconds;
        if (time.seconds < 10) {
            secondsElem.innerText = "0" + time.seconds;
        }
        minutesElem.innerText = time.minutes;
        if (time.minutes < 10) {
            minutesElem.innerText = "0" + time.minutes;
        }
        hoursElem.innerText = time.hours;
        if (time.hours < 10) {
            hoursElem.innerText = "0" + time.hours;
        }
    }

    function createTimer() {
        timer = setInterval(() => {
            incrementTime(time);
            updateTime(time);
        }, 1000);
    }

    let time = { hours: 0, minutes: 0, seconds: 0 };

    reset.addEventListener("click", () => {
        time = { hours: 0, minutes: 0, seconds: 0 };
        updateTime(time);
    });

    pause.addEventListener("click", () => {
        if (pause.innerText === "Stop") {
            pause.innerText = "Start";
            if (timer) clearInterval(timer);
        } else {
            pause.innerText = "Stop";
            createTimer();
        }
    });

    action.addEventListener("click", () => {
        console.log("Start action!");
        let counter = 0;
        const iterations = 1000000000 + Math.random() * 10000000;
        for (let i = 0; i < iterations; ++i) {
             ++counter;
        }
        console.log("Finish action!");
    });

    createTimer();
});

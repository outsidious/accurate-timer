function longAction() {
    console.log("Start action!");
    let counter = 0;
    const iterations = 5000000000 + Math.random() * 10000000;
    for (let i = 0; i < iterations; ++i) {
        ++counter;
    }
    console.log("Finish action!");
}

class BaseTimer {
    constructor() {
        this.time = { hours: 0, minutes: 0, seconds: 0 };
    }

    incrementTime(step = 1) {
        this.time.seconds = (this.time.seconds + step) % 60;
        this.time.minutes =
            this.time.minutes + Math.floor((this.time.seconds + step) / 60);
        this.time.hours =
            (this.time.hours + Math.floor(this.time.minutes / 60)) % 100;
        this.time.minutes %= 60;
    }

    updateTime() {
        this.timerElem.secondsElem.innerText = this.time.seconds;
        if (this.time.seconds < 10) {
            this.timerElem.secondsElem.innerText = "0" + this.time.seconds;
        }
        this.timerElem.minutesElem.innerText = this.time.minutes;
        if (this.time.minutes < 10) {
            this.timerElem.minutesElem.innerText = "0" + this.time.minutes;
        }
        this.timerElem.hoursElem.innerText = this.time.hours;
        if (this.time.hours < 10) {
            this.timerElem.hoursElem.innerText = "0" + this.time.hours;
        }
    }
}

class WrongTimer extends BaseTimer {
    constructor() {
        super();
        const wrongHoursElem = document.getElementById("wrong-hours");
        const wrongMinutesElem = document.getElementById("wrong-minutes");
        const wrongSecondsElem = document.getElementById("wrong-seconds");
        this.timerElem = {
            hoursElem: wrongHoursElem,
            minutesElem: wrongMinutesElem,
            secondsElem: wrongSecondsElem,
        };
        this.subscription = null;
    }

    step() {
        this.incrementTime();
        this.updateTime();
    }

    start() {
        this.subscription = setInterval(() => this.step(), 1000);
    }

    reset() {
        clearInterval(this.subscription);
        this.time = { hours: 0, minutes: 0, seconds: 0 };
        this.updateTime();
        this.start();
    }
}

class AccurateTimer extends BaseTimer {
    constructor() {
        super();
        const accurateHoursElem = document.getElementById("accurate-hours");
        const accurateMinutesElem = document.getElementById("accurate-minutes");
        const accurateSecondsElem = document.getElementById("accurate-seconds");
        this.timerElem = {
            hoursElem: accurateHoursElem,
            minutesElem: accurateMinutesElem,
            secondsElem: accurateSecondsElem,
        };
    }

    start() {
        this.prevMoment = new Date();
        this.subscription = setTimeout(() => this.step(), 1000);
    }

    reset() {
        clearTimeout(this.subscription);
        this.time = { hours: 0, minutes: 0, seconds: 0 };
        this.updateTime();
        this.start();
    }

    step() {
        const moment = new Date();
        const timeout = moment - this.prevMoment;
        //console.log(this.prevMoment);
        //console.log(moment);
        //console.log(timeout);
        this.incrementTime(Math.floor(timeout / 1000));
        this.updateTime();
        console.log(timeout % 1000);
        this.prevMoment = moment.getTime() + (timeout % 1000);
        this.subscription = setTimeout(() => {
            this.step();
        }, 1000 + (timeout % 1000));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const reset = document.getElementById("reset");
    const action = document.getElementById("action");

    const accurateTimer = new AccurateTimer();
    const wrongTimer = new WrongTimer();
    wrongTimer.start();
    accurateTimer.start();

    reset.addEventListener("click", () => {
        wrongTimer.reset();
        accurateTimer.reset();
    });

    action.addEventListener("click", longAction);
});

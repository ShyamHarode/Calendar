const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let selectMonth = document.getElementById("select-month");
let selectYear = document.getElementById("select-year");

const dropdownData = () => {
    let monthOption = "";
    let yearOption = "";

    for (let i = 0; i < 12; i++) {
        monthOption += `<option class="month" value=${i}>${months[i]}</option>`;
    }
    for (let i = 1990; i <= 2040; i++) {
        yearOption += `<option class="month" value=${i}>${i}</option>`;
    }
    selectMonth.innerHTML += monthOption;
    selectYear.innerHTML += yearOption;
};
dropdownData();

const date = new Date();
let set = new Set();

const renderCalendar = () => {
    date.setDate(1);
    // date.setMonth(0)

    const monthDays = document.querySelector(".days");
    const lastDay = new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getYear(), date.getMonth(), 0).getDate();
    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        if (set.has(i)) {
            days += `<div class="current" value=${i}>${i}</div>`;
        } else {
            days += `<div value=${i}>${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }
};
renderCalendar();

let setMonths = document.querySelector("#select-month");
setMonths.addEventListener("change", () => {
    if (setMonths.value !== "") date.setMonth(setMonths.value);
    renderCalendar();
    set.clear();
});

let setYears = document.querySelector("#select-year");
setYears.addEventListener("change", () => {
    if (setYears.value !== "") date.setYear(setYears.value);
    renderCalendar();
    set.clear();
});

let dateValue = document.querySelector("#date_input");
let setDates = document.querySelector("#btn");

setDates.addEventListener("click", (e) => {
    e.preventDefault();
    let x = Number(dateValue.value);

    if (set.has(x)) {
        set.delete(x);
    } else {
        set.add(x);
    }
    renderCalendar();
    dateValue.value = "";
});
const daysActualCurrent = [], arrayCreateTable = [], indicatedCourse = [];
const inputStartDate = document.querySelector(".inputStartDate");
const inputEndDate = document.querySelector(".inputEndDate");

const curList = document.querySelector(".curList");
curList.addEventListener('change', () => {
    console.log(curList.options.selectedIndex);
    const id = curList.options.selectedIndex;
    settingCalendar(id);
    indicatedCurrent(id);
})

inputStartDate.addEventListener('change', () => {
    indicatedCurrent(curList.options.selectedIndex);
})

inputEndDate.addEventListener('change', () => {
    indicatedCurrent(curList.options.selectedIndex);
})

function CreateCurList() {
    for (let i = 0; i <= daysActualCurrent.length - 1; i++) {
        if (new Date(daysActualCurrent[i].dateEnd) > new Date()) {
            curList.innerHTML += `<option>-${daysActualCurrent[i].name}-</option>`
            if(daysActualCurrent[i].abr == threeActualCurrent[0] ||
                daysActualCurrent[i].abr == threeActualCurrent[1] ||
                daysActualCurrent[i].abr == threeActualCurrent[2]){
                    threeActualCurrent.push({
                        abr: daysActualCurrent[i].abr,
                        id: daysActualCurrent[i].id,
                    })
                }
        }
    }
    threeCurrent();

}

function settingCalendar(id) {
    inputEndDate.max = daysActualCurrent[id].dateEnd.slice(0, 10);
    inputStartDate.max = daysActualCurrent[id].dateEnd.slice(0, 10);
    inputStartDate.min = daysActualCurrent[id].dateSt.slice(0, 10);
    inputEndDate.min = daysActualCurrent[id].dateSt.slice(0, 10);

    if (inputEndDate.value == '' || inputStartDate.value == '') {
        inputEndDate.value = daysActualCurrent[id].dateEnd.slice(0, 10);
        // inputStartDate.value = daysActualCurrent[id].dateStart.slice(0,10);
        inputStartDate.value = minusDate(new Date(daysActualCurrent[id].dateEnd), 6);

        if (daysActualCurrent[id].dateEnd.slice(0, 10) > todayDate()) {
            inputEndDate.max = todayDate();
            inputStartDate.max = todayDate();
            inputStartDate.value = minusDate(new Date(), 6);
            inputEndDate.value = todayDate();
        }

    }
}

function differenceDays() {
    const parseDate = new Date(inputStartDate.value);
    const parseDateTwo = new Date(inputEndDate.value);
    return (Math.floor((parseDateTwo.getTime() - parseDate.getTime()) / (1000 * 60 * 60 * 24)));
}

function plusDate(today, i) {
    today.setDate(today.getDate() + i);
    return String(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
}

function minusDate(today, i) {
    today.setDate(today.getDate() - i);
    return constructData(today);
}

function todayDate() {
    let today = new Date();
    return constructData(today);
}

function constructData(today) {
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function btns(a) {
    const id = curList.options.selectedIndex;
    inputEndDate.value = todayDate();
    if (new Date(daysActualCurrent[id].dateEnd) <= new Date()) {
        btnsCorrect(minusDate(new Date(daysActualCurrent[id].dateEnd), a), id);
    } else {
        btnsCorrect(minusDate(new Date(), a), id);
    }
    indicatedCurrent(id);
}

function btnsCorrect(dt, id) {
    if (new Date(dt) <= new Date(daysActualCurrent[id].dateSt)) {
        inputStartDate.value = daysActualCurrent[id].dateSt.slice(0, 10);
    } else
        inputStartDate.value = dt;
}

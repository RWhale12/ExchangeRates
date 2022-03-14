const worker3 = new Worker('script/worker2.js');
const massThreeCurrent = [], threeActualCurrent = ['USD', 'EUR', 'RUB'];
const header = document.querySelector('.threeHeader');

worker3.addEventListener('message', ({ data }) => {
    const div = document.createElement('div');

    const img = document.createElement('img')
    img.src = `img/${data.payload.Cur_Abbreviation}.png`;
    div.append(img);

    const p = document.createElement('p');
    p.innerText = `${data.payload.Cur_Abbreviation} ${data.payload.Cur_OfficialRate}`;
    div.append(p);

    header.append(div);
})

function threeCurrent() {
    for (let i = 0; i <= threeActualCurrent.length - 1; i++) {
        if (typeof threeActualCurrent[i] == "object") {
            worker3.postMessage({
                id: threeActualCurrent[i].id,
                date: todayDate(),
            })
        }
    }
}


const worker = new Worker('script/worker.js');

const table = document.createElement('table');
document.querySelector('.tableDiv').append(table);

let intervalCreate;

const worker2 = new Worker('script/worker2.js');
let i = 1;
worker2.addEventListener('message', ({ data }) => {
  arrayCreateTable.push({
    data: String(data.payload.Date).slice(0, 10),
    rate: data.payload.Cur_OfficialRate,
  })

})

const mapping = {
  currentRate: (payload) => {
    const result = payload.map(
      ({
        Cur_ID,
        Cur_Name,
        Cur_Scale,
        Cur_DateStart,
        Cur_DateEnd,
        Cur_Abbreviation,

      }) => {

        const newCur = {
          id: Cur_ID,
          dateSt: String(Cur_DateStart),
          dateEnd: String(Cur_DateEnd),
          abr: Cur_Abbreviation,
          name: Cur_Name,
        };

        if (new Date(Cur_DateEnd) <= new Date()) {
          daysActualCurrent.push(newCur);
        } else
          daysActualCurrent.unshift(newCur);

        return {
          Cur_ID,
          Cur_Name,
          Cur_Scale,
        };
      });
    CreateCurList();
  }
}

worker.addEventListener('message', ({ data }) => {
  mapping[data.msg](data.payload);
});

function indicatedCurrent(id) {
  arrayCreateTable.splice(0, arrayCreateTable.length);
  document.querySelector('.mainTwoDivDiagramm').innerHTML = ' ';
  for (let i = 0; i <= differenceDays(); i++) {
    table.innerText = '';
    worker2.postMessage({
      id: daysActualCurrent[id].id,
      startDate: plusDate(new Date(inputStartDate.value), i),
    })
  }

  document.querySelector('.spinner').style.display = 'flex';
  document.querySelector('.spinner2').style.display = 'flex';
  intervalCreate = setInterval(() => {
    console.log(arrayCreateTable[differenceDays()-1])
    if (arrayCreateTable[differenceDays()] != undefined)
      goCreateTableAndDiagramm();
  }, 100);

}

function goCreateTableAndDiagramm() {
  document.querySelector('.spinner').style.display = 'none';
  document.querySelector('.spinner2').style.display = 'none';
  google.charts.setOnLoadCallback(drawChart);
  CreateTable();
  console.log(arrayCreateTable);
  clearInterval(intervalCreate);
}

function CreateTable() {
  
  arrayCreateTable.sort(function (a, b) { return new Date(b.data) - new Date(a.data) });

  const trMain = document.createElement('tr');
  const th = document.createElement('th');
  th.innerText = 'Count';
  trMain.append(th);
  const th2 = document.createElement('th');
  th2.innerText = 'Date';
  trMain.append(th2);
  const th3 = document.createElement('th');
  th3.innerText = 'Course';
  trMain.append(th3);
  trMain.position = 'fixed';
  table.append(trMain);


  for (let i = 0; i <= arrayCreateTable.length - 1; i++) {
    const tr = document.createElement('tr');
    table.append(tr);
    addCol(tr, i+1);
    addCol(tr, arrayCreateTable[i].data);
    addCol(tr, arrayCreateTable[i].rate);
  }
}

function addCol(tr, element) {
  const td = document.createElement('td');
  td.innerText = element;
  tr.append(td);
}
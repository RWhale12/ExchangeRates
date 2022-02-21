const worker = new Worker('script/worker.js');

const table = document.createElement('table');
document.querySelector('.tableDiv').append(table);

let intervalCreate;

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

        // const tr = document.createElement('tr');
        // table.append(tr);

        // addCol(tr, Cur_ID);
        // addCol(tr, Cur_Name);
        // addCol(tr, Cur_Scale);
        const newCur = {
          id: Cur_ID,
          dateSt: String(Cur_DateStart),
          dateEnd: String(Cur_DateEnd),
          abr: Cur_Abbreviation,
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

  for (let i = 0; i <= differenceDays(); i++) {
    table.innerText = '';
    const worker2 = new Worker('script/worker2.js');

    worker2.addEventListener('message', ({ data }) => {
      arrayCreateTable.push({
        count: i + 1,
        data: String(data.payload.Date).slice(0, 10),
        rate: data.payload.Cur_OfficialRate,
      })
    })

    worker2.postMessage({
      id: daysActualCurrent[id].id,
      startDate: plusDate(new Date(inputStartDate.value), i),
    })
  }
intervalCreate = setInterval(() => {
  console.log(arrayCreateTable[differenceDays()-1])
  if(arrayCreateTable[differenceDays()-1] != undefined)
  goCreateTableAndDiagramm();
}, 100);

}

function goCreateTableAndDiagramm(){
  google.charts.setOnLoadCallback(drawChart);
  CreateTable();
  console.log(arrayCreateTable);
  clearInterval(intervalCreate);
}

function CreateTable() {
  arrayCreateTable.sort(function (a, b) { return a.count - b.count });

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
    addCol(tr, arrayCreateTable[i].count);
    addCol(tr, arrayCreateTable[i].data);
    addCol(tr, arrayCreateTable[i].rate);
  }
}

function addCol(tr, element) {
  const td = document.createElement('td');
  td.innerText = element;
  tr.append(td);
}
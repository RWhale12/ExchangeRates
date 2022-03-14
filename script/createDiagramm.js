function drawChart() {
    const cur = daysActualCurrent[curList.options.selectedIndex];
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Browser');
    data.addColumn('number', cur.abr);

    const chart = new google.visualization.AreaChart(document.querySelector('.mainTwoDivDiagramm'));
    const options = {'title':`Course ${daysActualCurrent[curList.options.selectedIndex].abr}`, 'width':580, 'height':500};
    chart.draw(data, options);

    for (let i = arrayCreateTable.length - 1; i >= 0; i--){
        setTimeout(() => {
            data.addRows([[String(arrayCreateTable[i].data), arrayCreateTable[i].rate]]);
            chart.draw(data, options);
        }, 400); 
    }
 }
 


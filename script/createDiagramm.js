function drawChart() {
    const cur = daysActualCurrent[curList.options.selectedIndex-1];
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Browser');
    data.addColumn('number', cur.abr);

    for (let i = 0; i <= arrayCreateTable.length - 1; i++){
        data.addRows([[String(arrayCreateTable[i].data), arrayCreateTable[i].rate]]);
    }
       
    // Set chart options
    var options = {'title':`Course ${daysActualCurrent[curList.options.selectedIndex-1].abr}`, 'width':600, 'height':500};

    // Instantiate and draw the chart.
    var chart = new google.visualization.AreaChart(document.querySelector('.mainTwoDiv'));
    chart.draw(data, options);
 }
 


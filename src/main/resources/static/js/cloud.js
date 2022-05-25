anychart.onDocumentReady(function() {
    var data = [
      {"x": "Mandarin chinese", "value": 200},
      {"x": "English", "value": 100},
      {"x": "Hindustani", "value": 300},
    ];

   // create a tag (word) cloud chart
    var chart = anychart.tagCloud(data);

     // set a chart title
    chart.title('긍정 워드클라우드')
    // set an array of angles at which the words will be laid out
    chart.angles([0])
    // enable a color range
    chart.colorRange(true);
    // set the color range length
    chart.colorRange().length('80%');

    // display the word cloud chart
    chart.container("container");
    chart.draw();

  });

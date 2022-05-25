function drawWord(keylist,valuelist,chartName){
    anychart.onDocumentReady(function() {
        
        var data = [
            [keylist[0], valuelist[0]],
            [keylist[1], valuelist[1]],
            [keylist[2], valuelist[2]]
          ];
      
       // create a tag (word) cloud chart
        var chart = anychart.tagCloud(data);
        
        chart.title('긍정 워드클라우드')
        // set an array of angles at which the words will be laid out
        chart.angles([0])
        // enable a color range
        chart.colorRange(true);
        // set the color range length
        chart.colorRange().length('80%');
      
        // display the word cloud chart
        chart.container(chartName);
        chart.draw();
      });
}

var myChart8 = drawWord(['Hello', 'world', 'normally'],[90, 70, 60],'myChart8' );
var myChart9 = drawWord(['Hello', 'world', 'normally'],[90, 70, 60],'myChart9' );
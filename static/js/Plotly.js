// Use the D3 library to read in samples.json.
var testSubID = d3.select("#selDataset")
d3.json("data/samples.json").then(function(data) {
    console.log(data);
    var subjectNames = data.names
    console.log(data.names)
    subjectNames.forEach(id => {
        testSubID.append("option").text (id).property("value")
    })
optionChanged(subjectNames[0])
});
	
    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // d3.selectAll("#selDataset").on("change", updatePlotly);

    function optionChanged(userInput) {
        
      d3.json("data/samples.json").then(function(data) {
        var demoData = data.metadata;
        console.log(demoData);
        var demoFilter = demoData.filter(mid => mid.id == userInput)
        var firstElement = demoFilter[0]
        var demoInfo = d3.select("#sample-metadata")
        demoInfo.html("")
        Object.entries(firstElement).forEach(([key, value]) => {
            demoInfo.append("p").text(`${key} - ${value}`).text

    });

        var samplesFilter = data.samples.filter(sid => sid.id == userInput)
        var firstSample = samplesFilter[0]
        var otuIds = firstSample.otu_ids.slice(0,10).reverse().map(ids=>(`Id:${ids}`));
        var sampleValues = firstSample.sample_values.slice(0,10).reverse();
        var  otuLabels = firstSample.otu_labels.slice(0,10).reverse();
        var trace1 = {
            x: sampleValues,
            y: otuIds,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        }
        var data = [trace1];
    
        var layout = {
          title: "OTU Chart"
         
        };
    
        Plotly.newPlot("bar", data, layout);  
    // creating trace for bubble chart
        // var bubbleFilter = data.samples.filter(bid => bid.id == userInput)
        var firstBubble = samplesFilter[0]
        console.log (firstBubble)
           var trace2 = {
            x: firstBubble.otu_ids,
            y: firstBubble.sample_values,
            text: firstBubble.otu_labels,
            mode: "markers",
            marker: {
                color: firstBubble.sample_values, size: firstBubble.otu_ids
              }
            
        }
        var bubbledata = [trace2];
    
        var bubblelayout = {
          title: "Bubble Chart",
          xaxis: {title: "OTU_IDS"},
          yaxis: {title: "SAMPLE VALUES"},
        //   height: 500, width: 800
         
        };
    
        Plotly.newPlot("bubble", bubbledata, bubblelayout); 
    
      });
  
    }
    
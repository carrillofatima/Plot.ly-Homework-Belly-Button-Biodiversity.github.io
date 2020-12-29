function metadataSample(sample) {
    d3.json("data/samples.json").then((data) => {
        var sampleInfo = data.sampleInfo;
        var samplesFilter = sampleInfo.filter(data => data.id == sample);
        var firstElement = samplesFilter[0];
        var demoInfo = d3.select("#sample-metadata");
        Object.entries(firstElement).forEach(([key, value]) => {
            demoInfo.append("p").text(`${key} - ${value}`).text
​
        })
    });
}
​
function optionChanged(userInput) {
        
    d3.json("data/samples.json").then(function(data) {
      var demoData = data.metadata;
      var demoFilter = demoData.filter(mid => mid.id == userInput)
      var firstElement = demoFilter[0];
      var userId = firstElement.otu_ids;
      var sample_values = firstElement.sample_values;
      var textValue = firstElement.otu_labels;
 
      var layout = {
          title: "Bubble Chart"
      };
      var trace = {
          x: userId,
          x: sample_values,
          mode: "marker",
          text: textValue,
          marker: {color: userId, size: sample_values}
​
        };
        Plotly.newPlot("bubble", trace, layout);
    });
}
​
function dropDown() {
    var idFilter = d3.select("#selDataset");
    d3.json("data/samples.json").then((data) => {
        var testSub = data.names;
        testSub.forEach(id => {
            idFilter.append("option").text (id).property("value")
            
        });
        var idInfo = testSub[0];
        metadataSample(idInfo);
        optionChanged(idInfo);
               
    });
​
    
}
function inputID(sampleSub) {
    metadataSample(sampleSub);
    optionChanged(sampleSub);
}
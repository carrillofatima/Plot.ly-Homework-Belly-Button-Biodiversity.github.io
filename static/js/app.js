//select reference to the dropdown Menu
var selData = d3.select("#selDataset");
// get data of names list to populate
d3.json("samples.json").then((data) => {
    data.names.forEach((name) => {
        selData
        .append("option")
        .text(name)
        .property("value"); 
    });
var namesID = data.names[0]
// Use the first sample from the list to build the initial plots, 

updatePlotly(namesID);
});
//D3 change option event handler 
function updatePlotly(namesID){
// Fetch new data each time a new sample is selected
d3.json("samples.json").then((data) => {
  //console.log to verify file was read
  console.log(data);
  var demoInfo = data.metadata;
  //add filter for ids
  var filteredData =demoInfo.filter(md => md.id == namesID);
  // fetch the first element
  var results = filteredData[0];
  //Add code for dropdown menu to populate the Demographic info
  var metadataPanel = d3.select("#sample-metadata"); 
  //clear list
  metadataPanel.html("");
  //append the demographic Info section
  Object.entries(results).forEach(([key, value]) => {
  //verify if the code is working
  var appendDemoInfo = metadataPanel.append("p")
  appendDemoInfo.text(`${key}: ${value}`);
  });
  //console.log(data);

  var results = data.samples.filter(ids => ids.id == namesID);
  //  fetch first element
  var results1 = results[0];
  console.log(results1);
  // slice for the top 10 and reverse the array to work with plotly 
  var topIds = results1.otu_ids.slice(0,10).reverse();

  var strtopIds = topIds.map(topIds=>(`Otu Id:${topIds}`))
  var topSamples = results1.sample_values.slice(0, 10).reverse();
  var toplabels = results1.otu_labels.slice(0, 10).reverse();  
  // console.log(toplabels);
  // console.log(topSamples);
  var yaxis = [strtopIds]
  console.log(yaxis);
  console.log(typeof(strtopIds))
//create Trace1 for Bar Chart data
var trace1 = {
  x: topSamples,
  y: strtopIds,
  text: toplabels,
  name: "OTU",
  type: "bar",
  orientation: "h"
};
//Bar Chart
var barData = [trace1];
//apply the group bar mode to the layout
var layout = {
  title: "Top 10 OTUs",
  xaxis:{title:" Sample Values"},
  autosize: false

};
//render the bar plot in the bar div tag
Plotly.newPlot("bar", barData, layout);
//Bubble Chart
//create trace2 for bubble chart
var trace2 = {
  x: results1.otu_ids,
  y: results1.sample_values,
  text: results1.otu_labels, 
  mode: "markers", 
  marker: {
      color:  results1.otu_ids,
      size:results1.sample_values
  }
}; 
// layout"
var layout_bubble = {
title: {text: " Belly Button Bubble Chart Sample Values"},
//title for x axis
xaxis:{title:" OTU IDs"},
yaxis:{title:"Sample Values"}


};
//capture the data and create the plot
var bubble_data = [trace2];
Plotly.newPlot("bubble",bubble_data, layout_bubble);
});
}

//Gauge attempt
var myGauge = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: results1.wfreq,
      title: { text: "<b>Belly Button Washing Frequency</b> <br>Scubs per Week"},
    //   height: 500,
    //   width: 500,
      type: "indicator",
      mode: "gauge+number",
    //   delta: { reference: 380 },
      gauge: {
        axis: { range: [null, 9] },
        steps: [
          { range: [0, 1], color: 'rgb(248, 243, 236)' },
		  { range: [1, 2], color: 'rgb(244, 241, 229)' },
		  { range: [2, 3], color: 'rgb(233, 230, 202)' },
		  { range: [3, 4], color: 'rgb(229, 231, 179)' },
		  { range: [4, 5], color: 'rgb(213, 228, 157)' },
		  { range: [5, 6], color: 'rgb(183, 204, 146)' },
		  { range: [6, 7], color: 'rgb(140, 191, 136)' },
		  { range: [7, 8], color: 'rgb(138, 187, 143)' },
		  { range: [8, 9], color: 'rgb(133, 180, 138)' },
        ],
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      hoverinfo: "label"
        // threshold: {
        //   line: { color: "red", width: 4 },
        //   thickness: 0.75,
        //   value: 490
        
      }
    }
  ];
  
  var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', myGauge, layout);


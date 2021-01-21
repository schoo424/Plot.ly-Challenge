    // Use `d3.json` to fetch the data for a sample
    // var url = "samples.json"

    

//function to build a chart
    function displayCharts (sampleID) {
        d3.json("samples.json").then(function(data){ 
            var sampleData = data.samples.filter(sample => sample.id == sampleID)[0]  //grab the first value
            console.log(sampleData.sample_values);

            //bar chart creation
            var chartData = [{
                x: sampleData.sample_values.slice(0,10).reverse(),
                y: sampleData.otu_ids.map(id => "OTU "+ id).slice(0,10).reverse(),
                text: sampleData.otu_labels.slice(0,10).reverse(),
                type: "bar", 
                orientation: "h"           
            
            }]

            var chartLayout = {
                title: "First 10 Bacterial Cultures Found"

            }

            Plotly.newPlot("bar", chartData, chartLayout);
            
            //bubble chart creation:
            
            var trace1 = {
                x: sampleData.otu_ids,
                y: sampleData.sample_values,
                text: sampleData.otu_labels,
                mode: 'markers',
                marker: {
                  size: sampleData.sample_values,
                  color: sampleData.otu_ids  //--> figure out the colors
                }
              };
              
              var bubbleData = [trace1];
              
              var layout = {
                title: 'Marker Size',
                showlegend: false,
                height: 600,
                width: 1200 //increase this later to make it easier to read
              };
              
              Plotly.newPlot("bubble", bubbleData, layout);

        });
        
    }

//BONUS: gauge chart creation:

    function createGauge (sampleID) {
        d3.json("samples.json").then(function(data){ 
        var gaugeData = data.metadata.filter(sample => sample.id == sampleID)[0]  //grab the first value
        // console.log(gaugeData.wfreq);
      
        // var gauge = [
        // {
        //     domain: { x: [0, 1], y: [0, 1] },
        //     value: gaugeData.wfreq,
        //     title: { text: "Speed" },
        //     type: "indicator",
        //     mode: "gauge+number"
        // }
        // ];

        // var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
      
        // Plotly.newPlot('gauge', gauge, layout);  
        
        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: gaugeData.wfreq,
              title: { text: "Belly Button Washing Frequency" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 380 },
              gauge: {
                axis: { range: [null, 10] },
                steps: [
                  { range: [0, 250], color: "lightgray" },
                  { range: [250, 400], color: "gray" }
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: 490
                }
              }
            }
          ];
          
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', data, layout);
        
    });
    };

                
// populate the demographic info panel

    function metadataBuild (sampleID) {       
        d3.json("samples.json").then(function(data){ 
        var panelData = data.metadata.filter(sample => sample.id == sampleID)[0]  //grab the first value
        console.log(panelData);

        // Use d3 to select the panel with id of `#sample-metadata`
        updatePanel = d3.select("#sample-metadata");

        // // Use `.html("") to clear any existing metadata
        updatePanel.html("");        

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: use d3 to append new tags for each key-value in the metadata

        Object.entries(panelData).forEach(([key, value]) => {
            updatePanel.append("h6").text(`${key}:${value}`);                    
        });
    });
    
    };


//build the drop-down menu
    function init() {
        dropdown = d3.select("#selDataset")

        d3.json("samples.json").then(function(data){ 
        data.names.forEach((ID)=>
        {
            dropdown.append("option").text(ID).property("value", ID)
        })
        console.log(data);

        optionChanged(data.names[0]);
    });    

    }


    function optionChanged(ID) {
        console.log(ID);
        displayCharts(ID);
        metadataBuild(ID);
        createGauge(ID);
    }

    init();


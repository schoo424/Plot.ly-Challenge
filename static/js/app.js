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
                width: 600 //height and width may not be needed, confirm this later
              };
              
              Plotly.newPlot("bubble", bubbleData, layout);
        });
        
    }

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

    }

    init();


//write a function to iterate over the dataset --> use unpack?
    // function unpack(rows, index) {
    //     var myArray = rows.map(function(row) {
    //         return row[index];
    //     });
    // };
    
    //plot charts

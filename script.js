$(document).ready(function(){ // run once DOM is ready

	var margin = { // initialise margin variables
		top : 20,
		right : 30,
		bottom : 20,
		left : 60
	};
    
    var width = 800 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;

	var x = d3.scaleLog().range([0, width]); // x scale
	var y = d3.scaleLinear().range([height, 0]); // y scale
    var r = d3.scaleLinear().range([0.5, 0.7]); // radius scale
    
    var xValue = function(d){return d.GDP;};
    var yValue = function(d) {return d.LifeExp;};
    var pValue = function(d) {return d.Population;};

    // create array of slider values to match years of data
    var sliderValues = [1900, 1910, 1920, 1930, 1940, 1950];
    for(i=1951; i <= 2015; i++){
        sliderValues.push(i);
    }
    
    // set up fill colour
    var cValue = function(d) {return d.Region;};
    var color = d3.scaleOrdinal(d3.schemeCategory10); 

    // add the tooltip area to the webpage for bubble name & values
    var tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);	
    
    
	var xAxis = d3.axisBottom()
		.scale(x)
        .ticks(20, ",.1s")
        .tickSize(6,0);

	var yAxis = d3.axisLeft()
		.scale(y)
    
	var svg = d3.select("#chart")
		.append("svg")
			.attr("class", "chart")
			.attr("viewBox", "0 0 725 600")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g") // apply transformation to all child elements of the chart
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // move coordinate space to the right by margin.left down by margin.top

	d3.csv("Gapminder_All_Time.csv", function(error, data) {

//        
//        // Generate the visualisation
//		generateVis();
        
        
        // change strings into number format
       data.forEach(function(d) {
            d.GDP = +d["GDP"];
		    d.LifeExp = +d["LifeExp"];
		    d.Population = +d["Population"];
		    d.Region = d["Region"];
            d.Year = +d["Year"];
            d.Government = d["Government"]
		  });
        
        var selectYear = function(data, year){
            yearData = data.filter(function(row){
                if(row.Year == year){;
                    return row;
                }
            })
            return yearData;
        }     
        
        // set scale domain
		x.domain([d3.min(data, xValue), d3.max(data, xValue)]);
		y.domain([d3.min(data, yValue), d3.max(data, yValue)]);

		//x axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
        
        //text label for the x-axis
		svg.append("text")
                .style("text-anchor", "middle")
				.attr("class", "label")
				.attr("x", width - 400)
				.attr("y", 590)
				.text("GDP");

		//y axis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
        
		svg.append("text")
				.attr("class", "label")
				.attr("transform", "rotate()")
				.attr("y", 250)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Avgerage Life Expectancy");
        
        //legend y position
		var LYP = 300, 
			LXP = 565;
        
        
		// color legend
		// Africa
        svg.append("rect")
            .attr("x", LXP-10)
            .attr("y", LYP+8)
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", "rgb(148, 103, 189)")
            .attr("stroke", "#000");
        svg.append("text")
            .attr("class", "label")
            .attr("x", LXP + 15)
            .attr("y", LYP + 20)
            .style("text-anchor", "start")
            .text(function(d) {return "Africa";});
        
        // Asia
		svg.append("rect")
            .attr("x", LXP-10)
            .attr("y", LYP + 38)
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", "rgb(31, 119, 180)")
            .attr("stroke", "#000");
		svg.append("text")
            .attr("class", "label")
            .attr("x", LXP + 15)
            .attr("y", LYP + 50)
            .style("text-anchor", "start")
            .text(function(d) {return "Asia";});
        
        // Australia
		svg.append("rect")
            .attr("x", LXP-10)
            .attr("y", LYP + 68)
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", "rgb(227, 119, 194)")
            .attr("stroke", "#000");
		svg.append("text")
            .attr("class", "label")
            .attr("x", LXP + 15)
            .attr("y", LYP + 80)
            .style("text-anchor", "start")
            .text(function(d) {return "Australia";});
        
        // Central America
		svg.append("rect")
            .attr("x", LXP-10)
            .attr("y", LYP + 98)
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", "rgb(140, 86, 75)")
            .attr("stroke", "#000");
		svg.append("text")
            .attr("class", "label")
            .attr("x", LXP + 15)
            .attr("y", LYP + 110)
            .style("text-anchor", "start")
            .text(function(d) {return "Central America";});
        
        // Europe
		svg.append("rect")
            .attr("x", LXP-10)
            .attr("y", LYP + 128)
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", "rgb(44, 160, 44)")
            .attr("stroke", "#000");
		svg.append("text")
            .attr("class", "label")
            .attr("x", LXP + 15)
            .attr("y", LYP + 140)
            .style("text-anchor", "start")
            .text(function(d) {return "Europe";});
        
        // North America
		svg.append("rect")
            .attr("x", LXP-10)
            .attr("y", LYP + 158)
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", "rgb(255, 127, 14)")
            .attr("stroke", "#000");
		svg.append("text")
            .attr("class", "label")
            .attr("x", LXP + 15)
            .attr("y", LYP + 170)
            .style("text-anchor", "start")
            .text(function(d) {return "North America";});
        
        // Oceania
		svg.append("rect")
            .attr("x", LXP-10)
            .attr("y", LYP + 188)
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", "rgb(127, 127, 127)")
            .attr("stroke", "#000");
		svg.append("text")
            .attr("class", "label")
            .attr("x", LXP + 15)
            .attr("y", LYP + 200)
            .style("text-anchor", "start")
            .text(function(d) {return "Oceania";});
        
        // South America
		svg.append("rect")
            .attr("x", LXP-10)
            .attr("y", LYP + 218)
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", "rgb(214, 39, 40)")
            .attr("stroke", "#000");
		svg.append("text")
            .attr("class", "label")
            .attr("x", LXP + 15)
            .attr("y", LYP + 230)
            .style("text-anchor", "start")
            .text(function(d) {return "South America";});
		
      
        var initialData = (selectYear(data, 1900).sort(function(a,b){ 
                                // display smaller dots in front
                                return b.Population - a.Population;
                        }));
        
        
        // Display 
        svg.selectAll(".dot")
            .data(initialData)
            .enter().append("circle")
            .attr("cx", function(d) {
                    return x(d.GDP);
                        })
            .attr("cy", function(d) {
                    return y(d.LifeExp);
                })
            .attr("r", function(d) {
                    return r((Math.sqrt(d.Population)/200));
                })
            .style("fill", function(d) {    
                    return color(cValue(d));
                })
            .style("stroke", "black")
            .on("mouseover", function(d) {
                            tooltip.transition()
                                   .duration(200)
                                   .style("opacity", .9);
                            tooltip.html(d["Country"] + "<br/> ( Population: " + pValue(d) + ")")
                                   .style("left", (d3.event.pageX + 5) + "px")
                                   .style("top", (d3.event.pageY - 28) + "px");	
             })
             .on("mouseout", function(d) {
                            tooltip.transition()
                                   .duration(500)
                                   .style("opacity", 0);
            });
            
        
        function update(data){
            
            svg.selectAll("circle")
                .data(data.sort(function(a,b){
                            return b.Population - a.Population;
                        }))
                .exit().remove(); // remove unnecessary circles
                        
            svg.selectAll("circle")
                .data(data.sort(function(a,b){
                            return b.Population - a.Population;
                        }))
                .transition() // update circle positions
                .duration(5)
                .attr("cx", function(d) {
                            return x(d.GDP);
                        })
                .attr("cy", function(d) {
                        return y(d.LifeExp);
                    })
//                .attr("p", function(d) {
//                        return p(d.Population);
//                    })
                .attr("r", function(d) {
                        return r((Math.sqrt(d.Population)/200));
                    })
                .style("fill", function(d) {
                        return color(cValue(d));
                    })                   
        }
            
           
		var running = false;
		var timer;
        

		$("button").on("click", function() { //when the button is clicked
		
			var duration = 500;
			var	maxstep = 2015;
			var	minstep = 1900;
			
			if (running) { 
                // if already going, stop and clear the timer
			
				$("button").html("Play"); // show play on the button
				running = false;
				clearInterval(timer);
				
			} 

			else if (running == false) { 
                //if not running, play animation
			
				$("button").html("Pause"); // show pause on the button
				
				sliderValue = $("#slider").val(); //get the value of the slider
				
				timer = setInterval( function(){
						if (sliderValue < maxstep){
							sliderValue = sliderValues[(sliderValues.indexOf(sliderValue))+1];
							$("#slider").val(sliderValue);
							$('#range').html(sliderValue); // write sliderValue to screen
						}
						$("#slider").val(sliderValue);
                        var yearData = (selectYear(data, sliderValue));
						update(yearData);
					
				}, duration);
				running = true; // set running to true
					
			}

		});

		$("#slider").on("change", function(){
            sliderValue = $("#slider").val(); //get the value 
            if (sliderValue < 1950){
                    // round values for which there is no data
                    sliderValue = Math.ceil(sliderValue/10)*10; 
                }
            
			var yearData = (selectYear(data, sliderValue));
            update(yearData);
			$("#range").html($("#slider").val());
			clearInterval(timer);
			$("button").html("Play");
		});
	});
});
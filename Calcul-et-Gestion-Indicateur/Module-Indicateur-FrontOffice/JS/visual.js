function drowGauge(id, val, TypeA, TypeB){

        var svg = d3.select(id)
                .append("svg:svg")
                .attr("width", 400)
                .attr("height", 400);


        var gauge = iopctrl.arcslider()
                    .radius(120)
                    .events(false)
                    .indicator(iopctrl.defaultGaugeIndicator);
                    gauge.axis().orient("in")
                    .normalize(true)
                    .ticks(6)
                    .tickSubdivide(3)
                    .tickSize(10, 8, 10)
                    .tickPadding(5)
                    .scale(d3.scale.linear()
                            .domain([-1, 1])
                            .range([-Math.PI/2, Math.PI/2]));

                    svg.append("g")
                    .attr("class", "segdislay")
                    .attr("transform", "translate(130, 200)")
                    .append("text")
                          .attr("transform", "translate(-15,0)")
                          .style("text-anchor", "end")
                          .text(TypeA);

                    svg.append("g")
                    .attr("class", "notes")
                    .attr("transform", "translate(130, 200)")
                    .append("text")
                        .attr("transform","translate(200,0)")
                        .style("text-anchor","end")
                        .text(TypeB);

                    svg.append("g")
                    .attr("class", "gauge")
                    .call(gauge);

        gauge.value(val);
 
    }


function drowBars(panel ,donnee, m ){ 

                var margin = {top: 20, right: 20, bottom: 30, left: 40},
                    width = 1180 - margin.left - margin.right,
                    height = 480 - margin.top - margin.bottom;

                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .6);

                var y = d3.scale.linear()
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .ticks(10, "")
                    .orient("left");

                   var max = m;
                var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    var name = d.label;
                    var quo = (d.val / max)* 100;
                    var pers = quo.toFixed(3);
                    return "<strong>"+ d.label +":</strong> <span style='color:red'>" + d.val + " fois</span><strong> soit </strong> <span style='color:red'>" + pers + " %</span>";
                  });

                var svg = d3.select(panel).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    svg.call(tip);
                
                  x.domain(donnee.map(function(d) { return d.label; }));
                  y.domain([0, max]);

                  svg.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis);

                  svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                    .append("text")
                      .attr("transform", "rotate(0)")
                      .attr("y", 10)
                      .attr("dy", "-2em")
                      .attr("dx", "2em")
                      .style("text-anchor", "end")
                      .text("number");


                  svg.selectAll(".bar")
                      .data(donnee)
                    .enter().append("rect")
                      .attr("class", "bar")
                      .attr("x", function(d) { return x(d.label); })
                      .attr("width", x.rangeBand())
                      .attr("y", function(d) { return y(d.val); })
                      .attr("height", function(d) { return height - y(d.val); })
                      .on('mouseover',tip.show)
                      .on('mouseout',tip.hide);

}

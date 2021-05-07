var dataset=[ 5, 10, 15, 20, 25 ];

d3.select("body") //选择 DOM 中的 body 元素，把它交给连缀方法中的下一个方法。
.selectAll("p")//选择 DOM 中的所有p。因为还没有段落，所以返回空元素。
.data(dataset)//解析并数出数据值。 dataset 数组中有 5 个值，因而此后的所有方法都将执行五遍，每次针对一个值。
.enter()//分析当前选择的DOM 元素和传给它的数据，如果数据值比对应的 DOM 元素多，就创建一个新的占位元素。
.append("p")//取得由 enter() 创建的空占位元素，并把一个 p 元素追加到相应的 DOM 中。
.text("New paragraph!");//取得新创建的 p 元素，插入文本值。



//柱形图
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
// 宽度和高度
var w = 500;
var h = 100;
var barPadding = 1; 
// 创建 SVG 元素
var svg = d3.select("body")
.append("svg")
.attr("width", w)
.attr("height", h);

svg.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr("x", function(d, i) { return i * (w / dataset.length); })
.attr("y", function(d) { return h - (d * 4); })
.attr("width", (w/dataset.length) - barPadding)
.attr("height", function(d) { return d * 4; })
.attr("fill", function(d) { return "rgb(0, 0, " + (d * 10) + ")";}
);




//散点图
var dataset = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
    ];
// 大小参数设置
var svg_w = 960;
var svg_h = 500;
var margin = {top: 20, right: 20, bottom:
    30, left: 40},
    width = svg_w - margin.left - margin.right,
    height = svg_h - margin.top - margin.bottom;

// 创建 SVG 元素
var svg = d3.select("body")
.append("svg")
.attr("width", svg_w)
.attr("height", svg_h);

//比例尺
var xScale = d3.scaleLinear()
.domain([0, d3.max(dataset, function(d) { return d[0]; })])
.range([0, width]);
var yScale = d3.scaleLinear()
.domain([0, d3.max(dataset, function(d) { return d[1]; })])
.range([height, 0]);

//画circle
var g_circle=svg.append("g")
.attr("transform", "translate("+ margin.left + ","+ margin.top + ")")
.attr("class", "g_circle")
var myCircle=g_circle.selectAll("circle") 
.data(dataset)
.enter()
.append("circle")
.attr("cx", function(d) {
return xScale(d[0]);
})
.attr("cy", function(d) {
return yScale(d[1]);
})
.attr("r", 2)
.attr("fill", "black")


//画坐标轴
var xAxis = d3.axisBottom(xScale)
.ticks(5); // 粗略地设置刻度线的数量
g_circle.append("g")
.attr("class", "x_axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis)


var yAxis = d3.axisLeft(yScale)
.ticks(5); // 粗略地设置刻度线的数量
g_circle.append("g")
.attr("class", "y_axis")
.attr("transform", "translate(0,0)")
.call(yAxis)



//brush
g_circle.call(d3.brush()
                .extent([[0,0], [width,height] ] )
        .on("end", updateChart))
// Each time the brush selection changes, trigger the'updateChart' function)


function updateChart(){ 
    extent = d3.event.selection           
    myCircle.attr("r", function(d){ 
         if(extent==null){return 2}
         if(isBrushed(extent, xScale(d[0]), yScale(d[1]))) {return 4}
         else {return 2}
         })
}     

function isBrushed(brush_coords, cx, cy){ 
    var x0 = brush_coords[0][0], 
        x1 = brush_coords[1][0], 
        y0 = brush_coords[0][1], 
        y1 = brush_coords[1][1]; 
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }
var array_data = [];
      // 一句话定义了众多变量， 定义了块儿的位置、宽高、小格子的边长等等与布局有关的变量
      var margin = { top: 50, right: 0, bottom: 100, left: 150 },
          width = 960 - margin.left - margin.right,        // 所有格子区域的宽度，即Heatmap的宽度
          height = 1830 - margin.top - margin.bottom,
          gridSize = Math.floor(width / 24),    // 求地板，即去掉小数部分，width分成24份
          legendElementWidth = gridSize * 2,    // 底下长条的长度，是格子边长的两倍
          buckets = 11,        // 一共11种颜色级别
          colors = ["#5E4FA2","#3288BD","##66C2A5","#ABDDA4","#E6F598","#FFFFBF","#FEE08B","#FDAE61","#F46D43","#D53E4F","#9E0142"], 
          // alternatively colorbrewer.YlGnBu[9]
          // days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          //times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
          tests = ["G","MIN","PTS","FGM","FGA","FGP","FTM","FTA","FTP","3PM","3PA","3PP","ORB","DRB","TRB","AST","STL","BLK","TO","PF"];
          // 函数，读取 CSV 文件
          d3.csv("ball_data.csv", //function(d) {}, function(error, data) {} );
          
            // 每一行的数据
            /*function(d) {
              return {
                day: +d.day,
                hour: +d.hour,
                value: +d.value
              };
            },*/
            
            function(error, data) {
                /*if(error){  
                    console.log(error);  
                }  
                console.log(csvdata);*/
              // colorScale：颜色级别
              var colorScale = d3.scale.quantile()        // 按分位数取值，可使每个区域内元素个数相等
                  .domain([0, buckets - 1, d3.max(data, function (d) { return d.G; })])  // 定义域
                  // domain([0, n, 数据的最大值]);
                  .range(colors);    // 值域：是颜色数组，函数的返回值是代表某种颜色的字符串
              
              // 设置chart，svg
              var svg = d3.select("#chart").append("svg") // 选择“chart”（就是div），加入一个svg，设置属性跟div一样大
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")    // 在svg内加入一个g（group组），并设置元素g的显示位置
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                
              // 编辑姓名行
              var dayLabels = svg.selectAll(".nameLabel")
                  .data(data)
                  .enter()    // 为data中每一项创建一个".dayLabel"
                  .append("text")    // 为days中每一项创建一的".dayLabel"添加文本，下面全是设置文本的属性
                    .text(function (d, i) { return data[i].name; })
                    .attr("x", 0)
                    .attr("y", function (d, i) { return i * gridSize; })
                    .style("text-anchor", "end")
                    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
                    .attr("class", function (d, i) 
                            { return ((i >= 0 && i <= 4) ? "nameLabel mono axis axis-workweek" : "nameLabel mono axis"); }
                        );
     
              // 编辑测试项行
              var timeLabels = svg.selectAll(".testLabel")
                  .data(tests)
                  .enter().append("text")
                    .text(function(d) { return d; })
                    .attr("x", function(d, i) { return i * gridSize; })
                    .attr("y", 0)
                    .style("text-anchor", "middle")
                    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
                    .attr("class", function(d, i) { 
                            return ((i >= 7 && i <= 16) ? "testLabel mono axis axis-worktime" : "testLabel mono axis"); }
                         );
              
                // 画出格子，暂不涂色，color[0]
                for (var i = 0; i < 50; i++){
                    array_data[i*20] = data[i].G;
                    array_data[i*20+1] = data[i].MIN;
                    array_data[i*20+2] = data[i].PTS;
                    array_data[i*20+3] = data[i].FGM;
                    array_data[i*20+4] = data[i].FGA;
                    array_data[i*20+5] = data[i].FGP;
                    array_data[i*20+6] = data[i].FTM;
                    array_data[i*20+7] = data[i].FTA;
                    array_data[i*20+8] = data[i].FTP;
                    array_data[i*20+9] = data[i].P3PM;
                    array_data[i*20+10] = data[i].P3PA;
                    array_data[i*20+11] = data[i].P3PP;
                    array_data[i*20+12] = data[i].ORB;
                    array_data[i*20+13] = data[i].DRB;
                    array_data[i*20+14] = data[i].TRB;
                    array_data[i*20+15] = data[i].AST;
                    array_data[i*20+16] = data[i].STL;
                    array_data[i*20+17] = data[i].BLK;
                    array_data[i*20+18] = data[i].TO;
                    array_data[i*20+19] = data[i].PF;
              }

              
              var heatMap = svg.selectAll(".score")
                  .data(array_data)
                  .enter()        // 为data中每一项创建一个".hour"
                  .append("rect")
                  .attr("x", function(d, i){ return (i % 20)*gridSize;})
                  .attr("y", function(d, i){ return parseInt(i / 20)*gridSize;})
                  .attr("rx", 6)
                  .attr("ry", 6)
                  .attr("class", "hour bordered")
                  .attr("width", gridSize)
                  .attr("height", gridSize)
                  .style("fill", "#FFFFFF");
                
              // duration(1000) 在1000ns也就是1s内将格子图上色
              heatMap.transition().duration(1000)
                  .style("fill", function(d) { return colorScale(d); });
                
              // 鼠标停留显示value
              heatMap.append("title").text(function(d) { return d.G; });
                  
              // legend 是一个有7个组的什么东西，，，
              var legend = svg.selectAll(".legend")
                  .data([0].concat(colorScale.quantiles()), function(d) { return d; })    // 由data获得的元素个数为7
                  .enter().append("g")	
                  .attr("class", "legend");
    
              legend.append("rect")
                .attr("x", function(d, i) { return legendElementWidth * i; })
                .attr("y", height)
                .attr("width", legendElementWidth)
                .attr("height", gridSize / 2)
                .style("fill", function(d, i) { return colors[i]; });
    
              legend.append("text")
                .attr("class", "mono").
                .text(function(d) { return ">= "+Math.round(d); })
                .attr("x", function(d, i) { return legendElementWidth * i; })
                .attr("y", height + gridSize);
          });



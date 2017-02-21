require.config({
			paths:{
				echarts:'echarts/dist'
				}
		});
		require(
				[
					'echarts',
					'echarts/chart/gauge'
					],
					function(ec){
					var jsondata;
					var page = $j("#main_param").attr("page");
					var listener = $j("#main_param").attr("listener");
					//var params = $j("#main_param").attr("params");
					var url = getContextName() + "?service=ajaxDirect/1/" + page + '/' + page + '/javascript/';
					if (page != null) url += "&pagename=" + page;
					if (listener != null) url += "&eventname=" + listener;
					//if (params != null) url += '&' + params;
					url += "&random=" + getRandomParam();
					
					$j.ajax({
						type:"post",
						url:url,
			            dataType:"xml",
			            success:function(result){
					
					    jsondata = eval("("+$j(result).text()+")");
					
		          		var value = jsondata[0].value.split(",");
		          		var pointName = jsondata[0].key.split(",");
						var myChart = ec.init(document.getElementById('main'));
						var option = {
							    tooltip : {
					        formatter: "{a} <br/>{b} : {c}%"
					    },
					    toolbox: {
					        show : true,
					        feature : {
					            mark : {show: true},
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    series : [
					        {
					            name:pointName[0],
					            type:'gauge',
					            splitNumber: 10,       // 分割段数，默认为5
					            axisLine: {            // 坐标轴线
					                lineStyle: {       // 属性lineStyle控制线条样式
					                    color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']], 
					                    width: 8
					                }
					            },
					            axisTick: {            // 坐标轴小标记
					                splitNumber: 10,   // 每份split细分多少段
					                length :12,        // 属性length控制线长
					                lineStyle: {       // 属性lineStyle控制线条样式
					                    color: 'auto'
					                }
					            },
					            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
					                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					                    color: 'auto'
					                }
					            },
					            splitLine: {           // 分隔线
					                show: true,        // 默认显示，属性show控制显示与否
					                length :30,         // 属性length控制线长
					                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
					                    color: 'auto'
					                }
					            },
					            pointer : {
					                width : 5
					            },
					            title : {
					                show : true,
					                offsetCenter: [0, '-40%'],       // x, y，单位px
					                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					                    fontWeight: 'bolder'
					                }
					            },
					            detail : {
					                formatter:'{value}%',
					                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					                    color: 'auto',
					                    fontWeight: 'bolder'
					                }
					            },
					            data:[{value: value[0], name: jsondata[0].CHART_NAME}]
					        }
					    ]
					};
						
					    myChart.setOption(option,true);
					    myChart.setTheme(jsondata[0].THEME);
					    var i = 0;
							//myChart.setOption(option);
							//clearInterval(timeTicket);
					    if(pointName.length !=1){
							timeTicket = setInterval(function (){
								if(i==0){
									i=1;
								}else if (i > pointName.length -1){
									i=0;
								}
							    option.series[0].data[0].value = value[i];
							    option.series[0].name = pointName[i];
							    myChart.setOption(option,true);
							    i = i+1;
							},2000);
					    }

						}});			
					
				}
				);
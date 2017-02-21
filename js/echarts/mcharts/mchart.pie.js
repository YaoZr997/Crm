require.config({
			paths:{
				echarts:'echarts/dist'
				}
		});
		require(
				[
					'echarts',
					'echarts/chart/pie'
					//'echarts/chart/funnel'
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
					          		var key = jsondata[0].key.split(",");
					          		var datas = [];
					          		for(var i=0;i<value.length;i++){
					          			var obj = {};
					          			obj.value = value[i];
					          			obj.name = key[i];
					          			datas.push(obj);
					          		}
					                var myChart = ec.init(document.getElementById('main'));
									var option = {
											title : {
										        text: jsondata[0].CHART_NAME,
										        subtext: jsondata[0].SUB_CHART_NAME,
										        x:'center'
										    },
										    tooltip : {
										        trigger: 'item',
										        formatter: "{a} <br/>{b} : {c} ({d}%)"
										    },
										    legend: {
										        x : 'center',
										        y : 'bottom',
										        data:jsondata[0].key.split(",")
										    },
										    toolbox: {
										        show : true,
										        feature : {
										            mark : {show: true},
										            dataView : {show: true, readOnly: false},
										            magicType : {
										                show: true, 
										                //type: ['pie', 'funnel']
										                type: ['pie']
										            },
										            restore : {show: true},
										            saveAsImage : {show: true}
										        }
										    },
										    calculable : true,
										    series : [
										        {
										            name:'半径模式',
										            type:'pie',
										            radius : [20, 110],
										            center : ['25%', 200],
										            roseType : 'radius',
										            width: '40%',       // for funnel
										            max: 40,            // for funnel
										            itemStyle : {
										                normal : {
										                    label : {
										                        show : false
										                    },
										                    labelLine : {
										                        show : false
										                    }
										                },
										                emphasis : {
										                    label : {
										                        show : true
										                    },
										                    labelLine : {
										                        show : true
										                    }
										                }
										            },
										            data:datas
										        },
										        {
										            name:'面积模式',
										            type:'pie',
										            radius : [30, 110],
										            center : ['75%', 200],
										            roseType : 'area',
										            x: '50%',               // for funnel
										            max: 40,                // for funnel
										            sort : 'ascending',     // for funnel
										            data:datas
										        }
										    ]
									};
							myChart.setOption(option);
							myChart.setTheme(jsondata[0].THEME);
						}});	
				}
				);
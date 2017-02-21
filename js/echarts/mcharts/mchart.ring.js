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
					var yAxisData = '';
					var yAxisDataUse;
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
						var pieYAxis = 30;
						var funelYAxis = 15;
						var labelTop = {
							    normal : {
							        label : {
							            show : true,
							            position : 'center',
							            formatter : '{b}',
							            textStyle: {
							                baseline : 'bottom'
							            }
							        },
							        labelLine : {
							            show : false
							        }
							    }
							};
							var labelFromatter = {
							    normal : {
							        label : {
							            formatter : function (params){
							                return 100 - params.value + '%'
							            },
							            textStyle: {
							                baseline : 'top'
							            }
							        }
							    }
							};
							var labelBottom = {
							    normal : {
							        color: '#ccc',
							        label : {
							            show : true,
							            position : 'center'
							        },
							        labelLine : {
							            show : false
							        }
							    },
							    emphasis: {
							        color: 'rgba(0,0,0,0)'
							    }
							};
						var radius = [40, 55];
						for(var i = 1;i < jsondata.length;i++)
						{
							var j;
							if(i > 5){
								pieYAxis = 70;
								funelYAxis = 55;
								j = i - 5;
								
							}
							else
							{
								j = i;
							}
							var ringdata = jsondata[i].YAXIS.split(";");
							var everydata = "{"
					            +"type : 'pie',"
					            +"center : ['"+(j*20-10)+"%', '"+pieYAxis+"%'],"
					            +"radius : radius,"
					            +"y: '"+funelYAxis+"%',"   // for funnel
					            +"x: '"+(j*20-20)+"%'," // for funnel
					            +"itemStyle : labelFromatter,"
					            +"data : ["
					            +"    {name:'"+ringdata[0].split(",")[0]+"', value:"+ringdata[0].split(",")[1]+",itemStyle:labelBottom},"
					            +"    {name:'"+ringdata[1].split(",")[0]+"', value:"+ringdata[1].split(",")[1]+",itemStyle:labelTop}"
					            +"]"
					        +"},";
							yAxisData = yAxisData + everydata;
						}
						yAxisDataUse = yAxisData.substring(0,yAxisData.length-1);
						var myChart = ec.init(document.getElementById('main'));
						var option = {
							    legend: {
					        x : 'center',
					        y : 'center',
					        data:jsondata[0].XAXIS.split(",")
					    },
					    title : {
					        text: jsondata[0].CHART_NAME,
					        subtext: jsondata[0].SUB_CHART_NAME,
					        x: 'center'
					    },
					    toolbox: {
					        show : true,
					        feature : {
					            dataView : {show: true, readOnly: false},
					            magicType : {
					                show: true, 
					                //type: ['pie', 'funnel'],
					                type: ['pie'],
					                option: {
					                    funnel: {
					                        width: '20%',
					                        height: '30%',
					                        itemStyle : {
					                            normal : {
					                                label : {
					                                    formatter : function (params){
					                                        return 'other\n' + params.value + '%\n'
					                                    },
					                                    textStyle: {
					                                        baseline : 'middle'
					                                    }
					                                }
					                            }
					                        } 
					                    }
					                }
					            },
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    series : eval("["+yAxisDataUse+"]")
					};
						myChart.setOption(option);
						myChart.setTheme('macarons');
				
					}});
					});
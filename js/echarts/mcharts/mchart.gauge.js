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
					            splitNumber: 10,       // �ָ������Ĭ��Ϊ5
					            axisLine: {            // ��������
					                lineStyle: {       // ����lineStyle����������ʽ
					                    color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']], 
					                    width: 8
					                }
					            },
					            axisTick: {            // ������С���
					                splitNumber: 10,   // ÿ��splitϸ�ֶ��ٶ�
					                length :12,        // ����length�����߳�
					                lineStyle: {       // ����lineStyle����������ʽ
					                    color: 'auto'
					                }
					            },
					            axisLabel: {           // �������ı���ǩ�����axis.axisLabel
					                textStyle: {       // ��������Ĭ��ʹ��ȫ���ı���ʽ�����TEXTSTYLE
					                    color: 'auto'
					                }
					            },
					            splitLine: {           // �ָ���
					                show: true,        // Ĭ����ʾ������show������ʾ���
					                length :30,         // ����length�����߳�
					                lineStyle: {       // ����lineStyle�����lineStyle������������ʽ
					                    color: 'auto'
					                }
					            },
					            pointer : {
					                width : 5
					            },
					            title : {
					                show : true,
					                offsetCenter: [0, '-40%'],       // x, y����λpx
					                textStyle: {       // ��������Ĭ��ʹ��ȫ���ı���ʽ�����TEXTSTYLE
					                    fontWeight: 'bolder'
					                }
					            },
					            detail : {
					                formatter:'{value}%',
					                textStyle: {       // ��������Ĭ��ʹ��ȫ���ı���ʽ�����TEXTSTYLE
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
import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

function Graph({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)' // Mostra o nome, valor e porcentagem
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    data: data.map((item) => ({
                        ...item,
                        itemStyle: {
                            color: item.color // Cor definida no próprio item dos dados
                        }
                    })),
                    animationType: 'bounce',
                    animationEasing: 'bounceOut',
                    animationDuration: 3000,
                    label: {
                        show: true,
                        color: 'black',
                        fontSize: 14,
                        fontWeight: 'bold'
                    },
                    labelLine: {
                        show: false
                    }
                }
            ]
        };

        chart.setOption(option);

        return () => {
            chart.dispose();
        };
    }, [data]);

    return (
        <div style={{ height: '600px', width: '800px' }} ref={chartRef}></div>
    );
}

export default Graph;
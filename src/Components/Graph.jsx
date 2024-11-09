import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

function Graph({ data, type }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        let option = {};

        if (type === 'bar') {
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: data.map(item => item.name),
                    axisLabel: {
                        color: '#333',
                        fontSize: 12,
                        interval: 0,
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: '#333',
                        fontSize: 12
                    }
                },
                series: [
                    {
                        type: 'bar',
                        data: data.map(item => item.value),
                        itemStyle: {
                            color: params => {
                                return data[params.dataIndex].color;
                            }
                        },
                        animationType: 'bounce',
                        animationEasing: 'bounceOut',
                        animationDuration: 3000,
                        label: {
                            show: true,
                            color: 'black',
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    }
                ]
            };
        } else if (type === 'pie') {
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: data.map(item => ({
                            ...item,
                            itemStyle: {
                                color: item.color
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
                            show: true
                        }
                    }
                ]
            };
        } else if (type === 'stackedLine') {
            option = {
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: data.map(item => item.name)
                },
                xAxis: {
                    type: 'category',
                    data: data[0]?.categories || [],
                    axisLabel: {
                        interval: 0,
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: data.map(item => ({
                    name: item.name,
                    type: 'line',
                    stack: 'total',
                    data: item.values,
                    itemStyle: {
                        color: item.color
                    },
                    label: {
                        show: true,
                        position: 'top'
                    },
                    areaStyle: {} // Para o efeito de preenchimento abaixo da linha
                }))
            };
        }

        chart.setOption(option);

        // Função de redimensionamento para tornar o gráfico responsivo
        const handleResize = () => {
            chart.resize();
        };

        // Adiciona o evento de redimensionamento
        window.addEventListener('resize', handleResize);

        return () => {
            chart.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, [data, type]);

    return (
        <div style={{ height: '400px', width: '100%' }} ref={chartRef}></div>
    );
}

export default Graph;

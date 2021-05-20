export const chartSettings = (values) => { return {
  chart: {},
  series: [
    {
      type: 'timeseries',
      name: 'average mood',
      data: values?.map(v => { return {
        x: v.timestamp,
        y: v.values,
      } }),
      color: '#ffffff',
    }
  ],
  yaxis: {
    min: -1,
    max: 1,
    tickAmount: 11,
    labels: {
      formatter: (v => { return Math.floor(v * 10) / 10 }),
      style: {
        colors: 'white'
      }
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: "MMM 'yy",
        day: 'dd MMM',
        hour: 'HH:mm',
        minute: 'HH:mm'
      },
      style: {
        colors: 'white'
      }
    }
  },
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'butt',
    width: 3,
    dashArray: 0,      
  },
  grid: {
    show: true,
    borderColor: '#90A4AE',
    strokeDashArray: 0,
    position: 'back',
    xaxis: {
      lines: { show: false }
    },
    yaxis: {
      lines: { show: true } 
    },
    row: {
      colors: ['#00bec4', '#00bec4', '#00bec4', '#00bec4', '#00bec4', '#fa6e6e', '#fa6e6e', '#fa6e6e', '#fa6e6e', '#fa6e6e', '#fa6e6e'],
      opacity: 0.5
    }
  }
}}

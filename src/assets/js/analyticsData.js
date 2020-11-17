/*=========================================================================================
  File Name: analyticsData.vue
  Description: Data shown by charts
  ----------------------------------------------------------------------------------------
  Item Name: Croxx Talent
==========================================================================================*/

export default {
  supportTrackerRadialBar: {
    chartOptions: {
      plotOptions: {
        radialBar: {
          size: 158,
          offsetY: -30,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "65%"
          },
          track: {
            background: "rgba(0,0,0,0)",
            strokeWidth: "100%"
          },
          dataLabels: {
            value: {
              offsetY: 30,
              color: "#99a2ac",
              fontSize: "2rem"
            }
          }
        }
      },
      colors: ["#0040a1"],
      fill: {
        type: "gradient",
        gradient: {
          // enabled: true,
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ea5455"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 2
      },
      chart: {
        sparkline: {}
      },
      labels: ["CV Completion Progress"]
    }
  }
};

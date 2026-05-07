import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function BikeTypesChart({ bikes }) {
  const types = {};

  bikes.forEach((bike) => {
    types[bike.type] = (types[bike.type] || 0) + 1;
  });

  const data = {
    labels: Object.keys(types),

    datasets: [
      {
        data: Object.values(types),

        backgroundColor: [
          "#6b8f5e",
          "#a1bc98",
          "#d9b95b",
          "#c95c54",
          "#7b9ea8",
        ],
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Pie data={data} options={options} />;
}

export default BikeTypesChart;

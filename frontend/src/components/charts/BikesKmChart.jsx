import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BikesKmChart({ bikes }) {
  const data = {
    labels: bikes.map((bike) => `${bike.brand} ${bike.model}`),

    datasets: [
      {
        label: "Kilometers",

        data: bikes.map((bike) => bike.totalKm),

        backgroundColor: "#6b8f5e",

        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default BikesKmChart;

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ComponentsStatusChart({ components }) {
  const good = components.filter((c) => c.status === "good").length;

  const warning = components.filter((c) => c.status === "warning").length;

  const expired = components.filter((c) => c.status === "expired").length;

  const data = {
    labels: ["Good", "Warning", "Expired"],

    datasets: [
      {
        data: [good, warning, expired],

        backgroundColor: ["#6b8f5e", "#d9b95b", "#c95c54"],

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

export default ComponentsStatusChart;

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

function LifespanChart({ components }) {
  const data = {
    labels: components.map((component) => component.name),

    datasets: [
      {
        label: "Remaining KM",

        data: components.map((component) => component.remainingKm),

        backgroundColor: components.map((component) => {
          if (component.status === "expired") return "#c95c54";

          if (component.status === "warning") return "#d9b95b";

          return "#6b8f5e";
        }),

        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    indexAxis: "y",

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default LifespanChart;

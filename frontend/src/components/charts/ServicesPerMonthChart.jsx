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

function ServicesPerMonthChart({ services }) {
  const components = {};

  services.forEach((service) => {
    const componentName = service.component?.name || "Unknown";

    components[componentName] = (components[componentName] || 0) + 1;
  });

  const data = {
    labels: Object.keys(components),

    datasets: [
      {
        label: "Services",

        data: Object.values(components),

        backgroundColor: "#6b8f5e",

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

export default ServicesPerMonthChart;

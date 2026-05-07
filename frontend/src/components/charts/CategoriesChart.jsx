import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoriesChart({ components }) {
  const categories = {};

  components.forEach((component) => {
    categories[component.category] = (categories[component.category] || 0) + 1;
  });

  const data = {
    labels: Object.keys(categories),

    datasets: [
      {
        data: Object.values(categories),

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

  return <Doughnut data={data} options={options} />;
}

export default CategoriesChart;

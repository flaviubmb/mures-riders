import { useEffect, useState } from "react";

import BikesKmChart from "../../components/charts/BikesKmChart";
import ComponentsStatusChart from "../../components/charts/ComponentsStatusChart";
import BikeTypesChart from "../../components/charts/BikeTypesChart";
import CategoriesChart from "../../components/charts/CategoriesChart";
import LifespanChart from "../../components/charts/LifeSpanChart";

import {
  FaBicycle,
  FaRoute,
  FaScrewdriverWrench,
  FaToolbox,
} from "react-icons/fa6";

import "./../../styles/dashboard.css";

function DashboardPage() {
  const [bikes, setBikes] = useState([]);
  const [components, setComponents] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDashboardData = async () => {
      try {
        const [bikesRes, componentsRes, servicesRes] = await Promise.all([
          fetch("http://localhost:3000/api/bikes", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          fetch("http://localhost:3000/api/components", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          fetch("http://localhost:3000/api/services", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const bikesData = await bikesRes.json();

        const componentsData = await componentsRes.json();

        const servicesData = await servicesRes.json();

        setBikes(bikesData.data.bikes);

        setComponents(componentsData.data.components);

        setServices(servicesData.data.services);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboardData();
  }, []);

  const totalKm = bikes.reduce((sum, bike) => sum + (bike.totalKm || 0), 0);

  const dueComponents = components.filter(
    (component) =>
      component.status === "warning" || component.status === "expired"
  );

  return (
    <div className="container">
      <div className="header">
        <div className="description">
          <h2 className="page-title">Dashboard</h2>

          <p className="page-description">
            Analytics and maintenance overview.
          </p>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <div className="icon">
            <FaBicycle size={50} color="#a1bc98" />
          </div>

          <div className="card-info">
            <h3 className="card-title">Total Bikes</h3>

            <p className="card-description">{bikes.length}</p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <FaRoute size={50} color="#a1bc98" />
          </div>

          <div className="card-info">
            <h3 className="card-title">Total KM</h3>

            <p className="card-description">{totalKm}</p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <FaToolbox size={50} color="#a1bc98" />
          </div>

          <div className="card-info">
            <h3 className="card-title">Components</h3>

            <p className="card-description">{components.length}</p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <FaScrewdriverWrench size={50} color="#a1bc98" />
          </div>

          <div className="card-info">
            <h3 className="card-title">Services</h3>

            <p className="card-description">{services.length}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-top">
            <h3 className="dashboard-title">Total Kilometers per Bike</h3>
          </div>

          <div className="dashboard-chart">
            <BikesKmChart bikes={bikes} />
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-top">
            <h3 className="dashboard-title">Bike Types</h3>
          </div>

          <div className="dashboard-chart">
            <BikeTypesChart bikes={bikes} />
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-top">
            <h3 className="dashboard-title">Components Status</h3>
          </div>

          <div className="dashboard-chart">
            <ComponentsStatusChart components={components} />
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-top">
            <h3 className="dashboard-title">Categories</h3>
          </div>

          <div className="dashboard-chart">
            <CategoriesChart components={components} />
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-top">
            <h3 className="dashboard-title">Remaining Lifespan</h3>
          </div>

          <div className="dashboard-chart">
            <LifespanChart components={components} />
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-top">
            <h3 className="dashboard-title">Service Due Soon</h3>
          </div>

          <div className="warnings">
            {dueComponents.length === 0 ? (
              <p>No components need service.</p>
            ) : (
              dueComponents.map((component) => (
                <div
                  key={component._id}
                  className={`warning-card ${component.status}`}
                >
                  <strong>{component.name}</strong>

                  <p>
                    Remaining: {component.remainingKm}
                    km
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBicycle,
  FaPlus,
  FaRegTrashCan,
  FaPen,
  FaEye,
  FaRoute,
  FaScrewdriverWrench,
} from "react-icons/fa6";

import "./../../styles/get.css";

function GetComponents() {
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchComponents = async () => {
      const res = await fetch("http://localhost:3000/api/components", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setComponents(data.data.components);
    };

    fetchComponents();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/components/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setComponents((prev) => prev.filter((component) => component._id !== id));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="description">
          <h2 className="page-title">Components</h2>
          <p className="page-description">
            Manage all your components, mileage and maintenance in one place.
          </p>
        </div>
        <button
          className="btn add-btn"
          onClick={() => navigate(`/components/add`)}
        >
          <FaPlus size={16} />
          Add component
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <div className="icon">
            <FaBicycle size={50} color="#a1bc98" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Total components</h3>
            <p className="card-description">{components.length}</p>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <FaRoute size={50} color="#a1bc98" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Total distance</h3>
            <p className="card-description">2000</p>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <FaScrewdriverWrench size={50} color="#a1bc98" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Service due</h3>
            <p className="card-description">0</p>
          </div>
        </div>
      </div>
      {components.map((component) => (
        <div key={component._id} className="components">
          <div className="info">
            <h3 className="bike-brand">
              {component.bike.brand} {component.bike.model}{" "}
              {component.bike.wheelSize}
            </h3>
            <p className="bike-type">
              <FaBicycle size={16} />
              {component.bike.type}
            </p>
            <p className="component-name">
              Component: {component.type} - {component.name}
            </p>
            <p className="component-lifespan">
              Lifespan: {component.lifespanKm} km
            </p>
            <p className="component-used-km">Used: {component.usedKm} km</p>
            <p className="component-installed-km">
              Installed: {component.installedAtKm} km
            </p>
            <p className="component-installed-date">
              Installed Date:{" "}
              {new Date(component.installedAtDate).toLocaleDateString("ro-RO")}
            </p>
          </div>
          <div className="buttons">
            <button
              className="btn view-btn"
              onClick={() => navigate(`/components/${component._id}`)}
            >
              <FaEye size={16} />
              View
            </button>

            <button
              className="btn edit-btn"
              onClick={() => navigate(`/components/${component._id}/edit`)}
            >
              <FaPen size={16} />
              Edit
            </button>

            <button
              className="btn delete-btn"
              onClick={() => handleDelete(component._id)}
            >
              <FaRegTrashCan size={16} />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetComponents;

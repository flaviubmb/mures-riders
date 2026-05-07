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

function GetServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchServices = async () => {
      const res = await fetch("http://localhost:3000/api/services", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setServices(data.data.services);
    };

    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/services/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setServices((prev) => prev.filter((service) => service._id !== id));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="description">
          <h2 className="page-title">Services</h2>
          <p className="page-description">
            Manage all your services, mileage and maintenance in one place.
          </p>
        </div>
        <button
          className="btn add-btn"
          onClick={() => navigate(`/services/add`)}
        >
          <FaPlus size={16} />
          Add service
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <div className="icon">
            <FaBicycle size={50} color="#a1bc98" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Total services</h3>
            <p className="card-description">{services.length}</p>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <FaRoute size={50} color="#a1bc98" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Total distance</h3>
            <p className="card-description">0</p>
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
      {services.map((service) => (
        <div key={service._id} className="services">
          <div className="bike-info">
            <h3 className="bike-brand">
              {service.bike.brand} {service.bike.model}
            </h3>
            <p className="bike-type">
              <FaBicycle size={16} />
              {service.bike.type}
            </p>
            <p>Component: {service.component.name} </p>
            <p>Description: {service.description} </p>
            <p>Date: {new Date(service.date).toLocaleDateString()}</p>
          </div>
          <div className="buttons">
            <button
              className="btn view-btn"
              onClick={() => navigate(`/services/${service._id}`)}
            >
              <FaEye size={16} />
              View
            </button>

            <button
              className="btn edit-btn"
              onClick={() => navigate(`/services/${service._id}/edit`)}
            >
              <FaPen size={16} />
              Edit
            </button>

            <button
              className="btn delete-btn"
              onClick={() => handleDelete(service._id)}
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

export default GetServices;

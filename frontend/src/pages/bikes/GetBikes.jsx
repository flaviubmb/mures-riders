import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../../styles/get.css";
import {
  FaBicycle,
  FaPlus,
  FaRegTrashCan,
  FaPen,
  FaEye,
  FaRoute,
  FaScrewdriverWrench,
} from "react-icons/fa6";

function GetBikes() {
  const navigate = useNavigate();
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchBikes = async () => {
      const res = await fetch("http://localhost:3000/api/bikes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBikes(data.data.bikes);
    };

    fetchBikes();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/bikes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setBikes((prev) => prev.filter((bike) => bike._id !== id));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="description">
          <h2 className="page-title">Bikes</h2>
          <p className="page-description">
            Manage all your bikes, mileage and maintenance in one place.
          </p>
        </div>
        <button className="btn add-btn" onClick={() => navigate(`/bikes/add`)}>
          <FaPlus size={16} />
          Add bike
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <div className="icon">
            <FaBicycle size={50} color="#a1bc98" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Total bikes</h3>
            <p className="card-description">{bikes.length}</p>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <FaRoute size={50} color="#a1bc98" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Bikes total km</h3>
            <p className="card-description">
              {bikes
                .reduce((acc, bike) => acc + bike.totalKm, 0)
                .toLocaleString("ro-RO")}{" "}
              km
            </p>
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
      {bikes.map((bike) => (
        <div key={bike._id} className="bikes">
          <div className="info">
            <h3 className="bike-brand">
              {bike.brand} {bike.model} {bike.wheelSize}
            </h3>
            <p className="bike-type">
              <FaBicycle size={16} />
              {bike.type}
            </p>
            <p className="bike-km">
              Total distance: {bike.totalKm.toLocaleString("ro-RO")} km
            </p>
          </div>

          <div className="buttons">
            <button
              className="btn view-btn"
              onClick={() => navigate(`/bikes/${bike._id}`)}
            >
              <FaEye size={16} />
              View
            </button>

            <button
              className="btn edit-btn"
              onClick={() => navigate(`/bikes/${bike._id}/edit`)}
            >
              <FaPen size={16} />
              Edit
            </button>

            <button
              className="btn delete-btn"
              onClick={() => handleDelete(bike._id)}
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

export default GetBikes;

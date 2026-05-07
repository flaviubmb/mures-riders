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
  FaClock,
} from "react-icons/fa6";

function GetRides() {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchRides = async () => {
      const res = await fetch("http://localhost:3000/api/rides", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setRides(data.data.rides);
    };

    fetchRides();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/rides/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setRides((prev) => prev.filter((ride) => ride._id !== id));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="description">
          <h2 className="page-title">Rides</h2>
          <p className="page-description">
            Manage all your rides, in one place.
          </p>
        </div>
        <button className="btn add-btn" onClick={() => navigate(`/rides/add`)}>
          <FaPlus size={16} />
          Add ride
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <div className="icon">
            <FaBicycle size={50} color="#a1bc98" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Total rides</h3>
            <p className="card-description">{rides.length}</p>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <FaRoute size={50} color="#a1bc98" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Total distance</h3>
            <p className="card-description">
              {rides
                .reduce((acc, ride) => acc + ride.distance, 0)
                .toLocaleString("ro-RO")}{" "}
              km
            </p>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <FaClock size={50} color="#a1bc98" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Total duration</h3>
            <p className="card-description">
              {rides
                .reduce((acc, ride) => acc + ride.duration, 0)
                .toLocaleString("ro-RO")}{" "}
              h
            </p>
          </div>
        </div>
      </div>
      {rides.map((ride) => (
        <div key={ride._id} className="rides">
          <div className="bike-info">
            <div></div>
            <div className="info">
              <h3 className="bike-brand">
                {ride.bike.brand} {ride.bike.model} {ride.bike.wheelSize}
              </h3>
              <p className="bike-type">
                <FaBicycle size={16} />
                {ride.bike.type}
              </p>
              <p className="ride-distance">Distance: {ride.distance} km</p>
              <p className="ride-duration">Duration: {ride.duration} h</p>
              <p className="ride-avgSpeed">
                Average Speed: {(ride.distance / ride.duration).toFixed(1)} km/h
              </p>
              <p className="ride-date">
                Date: {new Date(ride.date).toLocaleDateString("ro-RO")}
              </p>
            </div>
          </div>
          <div className="buttons">
            <button
              className="btn view-btn"
              onClick={() => navigate(`/rides/${ride._id}`)}
            >
              <FaEye size={16} />
              View
            </button>

            <button
              className="btn edit-btn"
              onClick={() => navigate(`/rides/${ride._id}/edit`)}
            >
              <FaPen size={16} />
              Edit
            </button>

            <button
              className="btn delete-btn"
              onClick={() => handleDelete(ride._id)}
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

export default GetRides;

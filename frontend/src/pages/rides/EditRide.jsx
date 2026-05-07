import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./../../styles/edit.css";

function EditRide() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [bike, setBike] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchRide = async () => {
      const res = await fetch(`http://localhost:3000/api/rides/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const ride = data.data.ride;

      setBike(ride.bike);
      setDistance(ride.distance);
      setDuration(ride.duration);
    };

    fetchRide();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    const rideData = {
      distance: Number(distance),
      duration: Number(duration),
      date,
    };

    const res = await fetch(`http://localhost:3000/api/rides/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rideData),
    });

    if (res.ok) {
      navigate("/rides");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/rides/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      navigate("/rides");
    }
  };

  return (
    <div className="container edit-container">
      <form onSubmit={handleSubmit} className="edit-bike-form">
        <div className="description">
          <h2 className="page-title">Edit your bike</h2>
        </div>
        <p className="bike-brand">
          {bike && `${bike.brand} ${bike.model} ${bike.wheelSize}`}
        </p>
        <div>
          <label>Ride distance: </label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Distance..."
          />
        </div>

        <div>
          <label>Ride duration: </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration..."
          />
        </div>

        <div>
          <label>Ride date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date..."
          />
        </div>

        <button type="submit" className="btn edit-btn edit-submit-btn">
          Save changes
        </button>

        <button
          type="button"
          className="btn delete-btn edit-delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </form>
    </div>
  );
}

export default EditRide;

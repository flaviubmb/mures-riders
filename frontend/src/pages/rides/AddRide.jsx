import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/add.css";

function AddRide() {
  const navigate = useNavigate();

  const [bikes, setBikes] = useState([]);
  const [bike, setBike] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchBikes = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/bikes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBikes(data.data.bikes);
    };

    fetchBikes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    const rideData = {
      bike,
      distance: Number(distance),
      duration: Number(duration),
      date,
    };

    const res = await fetch("http://localhost:3000/api/rides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rideData),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      navigate("/rides");
    }
  };

  return (
    <div className="container add-container">
      <form onSubmit={handleSubmit} className="add-ride-form">
        <div className="description">
          <h2 className="page-title">Add a ride</h2>
          <p className="page-description">Add a ride to your bike.</p>
        </div>
        <div>
          <label>Choose a bike: </label>
          <select value={bike} onChange={(e) => setBike(e.target.value)}>
            <option value="">Select a bike</option>
            {bikes.map((bike) => (
              <option key={bike._id} value={bike._id}>
                {bike.brand} {bike.model} {bike.wheelSize}
              </option>
            ))}
          </select>
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
          <label>Ride distance: </label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Distance..."
          />
        </div>

        <div>
          <label>Ride date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn add-btn">
          Add Ride
        </button>
      </form>
    </div>
  );
}

export default AddRide;

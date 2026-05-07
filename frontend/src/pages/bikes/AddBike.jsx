import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/add.css";

function AddBike() {
  const navigate = useNavigate();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [wheelSize, setWheelSize] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    const bikeData = {
      brand,
      model,
      type,
      wheelSize,
    };

    try {
      const res = await fetch("http://localhost:3000/api/bikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bikeData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        navigate("/bikes");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container add-container">
      <form onSubmit={handleSubmit} className="add-bike-form">
        <div className="description">
          <h2 className="page-title">Add a bike</h2>
          <p className="page-description">Add a bike on your garage.</p>
        </div>
        <div>
          <label>Brand: </label>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand..."
          />
        </div>

        <div>
          <label>Model: </label>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Model.."
          />
        </div>

        <div>
          <label htmlFor="wheelSize">Wheel size: </label>
          <select
            value={wheelSize}
            onChange={(e) => setWheelSize(e.target.value)}
          >
            <option value="" disabled>
              Select wheel size...
            </option>
            <option value='20"'>20"</option>
            <option value='24"'>24"</option>
            <option value='26"'>26"</option>
            <option value='27.5"'>27.5"</option>
            <option value='28"'>28"</option>
            <option value='29"'>29"</option>
          </select>
        </div>

        <div>
          <label htmlFor="type">Type: </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="" disabled>
              Select bike type...
            </option>
            <option value="Mountain Bike">Mountain Bike</option>
            <option value="Road Bike">Road Bike</option>
            <option value="E-Bike">E-Bike</option>
            <option value="BMX">BMX</option>
          </select>
        </div>

        <button type="submit" className="btn add-btn">
          Add bike
        </button>
      </form>
    </div>
  );
}

export default AddBike;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./../../styles/edit.css";

function EditBike() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("Mountain Bike");
  const [wheelSize, setWheelSize] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchBike = async () => {
      const res = await fetch(`http://localhost:3000/api/bikes/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const bike = data.data.bike;

      setBrand(bike.brand);
      setModel(bike.model);
      setType(bike.type);
      setWheelSize(bike.wheelSize);
    };

    fetchBike();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("type", type);
    formData.append("wheelSize", wheelSize);

    try {
      const res = await fetch(`http://localhost:3000/api/bikes/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) navigate("/bikes");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/bikes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      navigate("/bikes");
    }
  };

  return (
    <div className="container edit-container">
      <form onSubmit={handleSubmit} className="edit-bike-form">
        <div className="description">
          <h2 className="page-title">Edit your bike</h2>
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
            placeholder="Model..."
          />
        </div>

        <div>
          <label>Type: </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Mountain Bike">Mountain Bike</option>
            <option value="Road Bike">Road Bike</option>
            <option value="E-Bike">E-Bike</option>
            <option value="BMX">BMX</option>
          </select>
        </div>

        <div>
          <label>Wheel size: </label>
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

export default EditBike;

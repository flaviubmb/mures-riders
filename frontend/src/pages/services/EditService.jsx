import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function EditService() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [bike, setBike] = useState(null);
  const [component, setComponent] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchService = async () => {
      const res = await fetch(`http://localhost:3000/api/services/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const service = data.data.service;

      setBike(service.bike);
      setComponent(service.component.name);
      setDescription(service.description);
      setDate(service.date);
    };

    fetchService();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    const serviceData = {
      bike,
      component: component,
      description,
      date,
    };

    const res = await fetch(`http://localhost:3000/api/services/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });

    if (res.ok) {
      navigate("/services");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/services/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      navigate("/services");
    }
  };

  return (
    <div>
      <h1>Edit a Service</h1>

      {bike && (
        <p>
          Bike: {bike.brand} {bike.model}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Component:</label>
          <input
            type="text"
            value={component}
            onChange={(e) => setComponent(e.target.value)}
          />
        </div>

        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit">Save changes</button>
      </form>

      <Link onClick={handleDelete}>Delete</Link>
    </div>
  );
}

export default EditService;

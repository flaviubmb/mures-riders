import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function GetService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

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
      setService(data.data.service);
    };

    fetchService();
  }, [id]);

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

  if (!service) return <p>Loading...</p>;

  return (
    <div>
      <h1>Service details</h1>
      <p>
        Bike: {service.bike.brand} {service.bike.model}
      </p>
      <p>Component: {service.component.name} </p>
      <p>Description: {service.description} </p>
      <p>Date: {new Date(service.date).toLocaleDateString()}</p>

      <Link to={`/services/${service._id}/edit`}>Edit</Link>
      {" | "}
      <Link onClick={handleDelete}>Delete</Link>
    </div>
  );
}

export default GetService;

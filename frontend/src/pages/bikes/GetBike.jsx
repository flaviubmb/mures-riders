import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function GetBike() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);

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
      setBike(data.data.bike);
    };

    fetchBike();
  }, [id]);

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

  if (!bike) return <p>Loading...</p>;

  return (
    <div>
      <h1>Bike details</h1>
      <p>Brand: {bike.brand}</p>
      <p>Model: {bike.model}</p>
      <p>Type: {bike.type}</p>
      <p>Total km: {bike.totalKm} km</p>

      <Link to={`/bikes/${bike._id}/edit`}>Edit</Link>
      {" | "}
      <Link onClick={handleDelete}>Delete</Link>
    </div>
  );
}

export default GetBike;

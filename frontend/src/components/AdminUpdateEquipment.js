import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminUpdateEquipment = () => {
  const [equipment, setEquipment] = useState(null);
  const [error, setError] = useState(null);
  const { equipmentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/equipment/${equipmentId}`);
        const data = await response.json();
        if (response.ok) {
          setEquipment(data);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching equipment details:", error);
        setError(error);
      }
    };
    fetchData();
  }, [equipmentId]);

  const handleInputChange = (event) => {
    setEquipment({
      ...equipment,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/equipment/${equipmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipment),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Update success:", data);
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating equipment:", error);
      setError("Error updating equipment:", error);
    }
  };

  return (
    <div className="content-wrapper admin">
      {equipment && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>Edit equipment:</h3>

          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={equipment.title}
            onChange={handleInputChange}
            required
          />

          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={equipment.image}
            onChange={handleInputChange}
            required
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={equipment.description}
            onChange={handleInputChange}
            required
          ></textarea>

          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={equipment.price}
            onChange={handleInputChange}
            required
          />

          <label>Availability:</label>
          <select
            name="availability"
            value={equipment.availability}
            onChange={handleInputChange}
            required
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>

          <label>Draft:</label>
          <select
            name="draft"
            value={equipment.draft}
            onChange={handleInputChange}
            required
          >
            <option value={true}>Draft</option>
            <option value={false}>Not draft</option>
          </select>

          <button type="submit">Update</button>
        </form>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AdminUpdateEquipment;

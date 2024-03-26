import { useState } from "react";
import { useEquipmentContext } from "../hooks/useEquipmentContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const AdminResForm = () => {
  const { dispatch } = useEquipmentContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState(true);
  const [draft, setDraft] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Admin should be logged in");
      return;
    }
    const equipment = { title, image, price, description, availability, draft };
    const response = await fetch("/api/equipment", {
      method: "POST",
      body: JSON.stringify(equipment),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      navigate("/");
      dispatch({ type: "CREATE_EQUIPMENT", payload: json });
    }
  };

  return (
    <div className="content-wrapper admin">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>Add new equipment:</h3>
        <label>Title:</label>
        <input
          name="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label>Availability:</label>
        <select
          name="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          required
        >
          <option value={true}>Available</option>
          <option value={false}>Not Available</option>
        </select>

        <label>Draft:</label>
        <select
          name="draft"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          required
        >
          <option value={true}>Draft</option>
          <option value={false}>Not draft</option>
        </select>

        <button>Add equipment</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default AdminResForm;

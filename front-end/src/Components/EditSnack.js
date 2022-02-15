import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function EditSnack() {
  let { id } = useParams();
  const [snack, setSnack] = useState({
    name: "",
    fiber: 0,
    protein: 0,
    added_sugar: 0,
    is_healthy: null,
    image: "",
  });

  const API = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setSnack({ ...snack, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`${API}/snacks/${id}`)
      .then((res) => {
        setSnack(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API}/snacks/${id}`, snack)
      .then(() => {
        navigate(`/snacks`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckboxChange = (e) => {
    setSnack({ ...snack, is_healthy: !snack.is_healthy });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Snack Name:</label>
        <input
          id="name"
          value={snack.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name.."
          required
        />
        <label htmlFor="image">Snack Image:</label>
        <input
          id="image"
          type="text"
          value={snack.image}
          onChange={handleTextChange}
        />
        <label htmlFor="fiber">Fiber:</label>
        <input
          id="fiber"
          type="number"
          name="fiber"
          value={snack.fiber}
          onChange={handleTextChange}
        />
        <label htmlFor="protein">Protein:</label>
        <input
          id="protein"
          type="number"
          onChange={handleTextChange}
          value={snack.protein}
        />
        <label htmlFor="added_sugar">Added Sugar:</label>
        <input
          id="added_sugar"
          type="number"
          onChange={handleTextChange}
          value={snack.added_sugar}
        />
        <label htmlFor="is_healthy">Healthy:</label>
        <input
          id="is_healthy"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={snack.is_healthy}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default EditSnack;

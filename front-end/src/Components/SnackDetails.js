import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function SnackDetails() {
  const [snack, setSnack] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/snacks/${id}`)
      .then((res) => {
        setSnack(res.data.payload);
      })
      .catch(() => {
        navigate("/not-found");
      });
  }, [id, navigate]);

  const handleDelete = () => {
    axios
      .delete(`${API}/snacks/${id}`)
      .then((res) => {
        navigate("/snacks");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article>
      <aside>
        <h4>Snack Health</h4>
      </aside>
      <div>
        <h5>{snack.name}</h5>
        <img src={snack.image} alt="snack"></img>
        <h6>Protein: {snack.protein}</h6>
        <h6>Fiber: {snack.fiber}</h6>
        <h6>Added Sugar: {snack.added_sugar}</h6>
      </div>
      <div>
        <Link to={"/snacks"}>
          <button>Back</button>
        </Link>
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default SnackDetails;

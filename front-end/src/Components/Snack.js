import { Link } from "react-router-dom";
import HeartHealth from "./HeartHealth";

function Snack({ snack, id }) {
  return (
    <div className="Snack">
      <a href={`/snacks/${id}`}>
        <h4>
          {snack.is_healthy ? (
            <img src={snack.image} alt="healthy food"></img>
          ) : (
            <img src={snack.image} alt="unhealthy food"></img>
          )}
          <HeartHealth snackHealth={snack.is_healthy} />
          {snack.name}
        </h4>
      </a>
    </div>
  );
}

export default Snack;

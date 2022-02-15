function Snack({ snack }) {
  return (
    <div>
      <img src={snack.image} alt="snack"></img>
      {snack.name}
      Healthy: {snack.is_healthy}
    </div>
  );
}

export default Snack;

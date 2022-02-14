function Snack({ snack }) {
  return (
      <div>
        Healthy: {snack.is_healthy}
      <img src={snack.image} alt="snack"></img>
      {snack.name}
    </div>
  );
}

export default Snack;

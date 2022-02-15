function Snack({ snack }) {
  return (
    <div class="card">
      <img src={snack.image} alt="image" style="width:100%" />
      <div class="container">
        <h4>
          <b>{snack.name}</b>
        </h4>
        {snack.is_healthy}
      </div>
    </div>
  );
}

export default Snack;

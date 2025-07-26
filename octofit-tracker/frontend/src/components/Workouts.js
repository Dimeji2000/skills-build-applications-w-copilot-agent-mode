import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('https://organic-fishstick-jvwj9679v5jc5jvw-8000.app.github.dev/api/workouts')
      .then(res => res.json())
      .then(data => setWorkouts(data));
  }, []);

    const [show, setShow] = useState(false);
    const [newWorkout, setNewWorkout] = useState("");

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setWorkouts([...workouts, { id: Date.now(), name: newWorkout }]);
      setNewWorkout("");
      handleClose();
    };

    return (
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title mb-4">Workouts</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map(workout => (
                <tr key={workout.id}>
                  <td>{workout.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-danger" onClick={handleShow}>Add Workout</button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formWorkoutName">
                  <Form.Label>Workout Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newWorkout}
                    onChange={e => setNewWorkout(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="danger" type="submit">Add</Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
  );
}

export default Workouts;

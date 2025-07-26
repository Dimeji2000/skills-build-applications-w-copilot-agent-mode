import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function Activities() {
  const [activities, setActivities] = useState([]);
  const [show, setShow] = useState(false);
  const [newActivity, setNewActivity] = useState("");

  useEffect(() => {
    fetch('https://organic-fishstick-jvwj9679v5jc5jvw-8000.app.github.dev/api/activities')
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example POST, replace with your backend logic
    setActivities([...activities, { id: Date.now(), name: newActivity }]);
    setNewActivity("");
    handleClose();
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Activities</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity.id}>
                <td>{activity.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success" onClick={handleShow}>Add Activity</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Activity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formActivityName">
                <Form.Label>Activity Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newActivity}
                  onChange={e => setNewActivity(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit">Add</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Activities;

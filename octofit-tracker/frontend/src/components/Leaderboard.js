import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [show, setShow] = useState(false);
  const [newEntry, setNewEntry] = useState({ name: '', score: '' });

  useEffect(() => {
    fetch('https://organic-fishstick-jvwj9679v5jc5jvw-8000.app.github.dev/api/leaderboard')
      .then(res => res.json())
      .then(data => setLeaderboard(data));
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLeaderboard([...leaderboard, { id: Date.now(), ...newEntry }]);
    setNewEntry({ name: '', score: '' });
    handleClose();
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Leaderboard</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(entry => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-info" onClick={handleShow}>Add Entry</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Leaderboard Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEntryName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newEntry.name}
                  onChange={e => setNewEntry({ ...newEntry, name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEntryScore">
                <Form.Label>Score</Form.Label>
                <Form.Control
                  type="number"
                  value={newEntry.score}
                  onChange={e => setNewEntry({ ...newEntry, score: e.target.value })}
                  required
                />
              </Form.Group>
              <Button variant="info" type="submit">Add</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Leaderboard;

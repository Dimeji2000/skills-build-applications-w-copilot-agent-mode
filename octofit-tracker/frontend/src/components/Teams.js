import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('https://organic-fishstick-jvwj9679v5jc5jvw-8000.app.github.dev/api/teams')
      .then(res => res.json())
      .then(data => setTeams(data));
  }, []);

  const [show, setShow] = useState(false);
  const [newTeam, setNewTeam] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTeams([...teams, { id: Date.now(), name: newTeam }]);
    setNewTeam("");
    handleClose();
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Teams</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.id}>
                <td>{team.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-warning" onClick={handleShow}>Add Team</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formTeamName">
                <Form.Label>Team Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newTeam}
                  onChange={e => setNewTeam(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="warning" type="submit">Add</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Teams;

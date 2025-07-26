import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://organic-fishstick-jvwj9679v5jc5jvw-8000.app.github.dev/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, { id: Date.now(), name: newUser }]);
    setNewUser("");
    handleClose();
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Users</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={handleShow}>Add User</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newUser}
                  onChange={e => setNewUser(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">Add</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Users;

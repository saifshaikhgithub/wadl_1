import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cns_marks: "",
    wadl_marks: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Handle update
      axios.put(`http://localhost:8080/update/${editUserId}`, formData)
        .then(response => {
          setUsers(users.map(user => user._id === editUserId ? response.data : user));
          setFormData({
            name: "",
            email: "",
            cns_marks: "",
            wadl_marks: ""
          });
          setEditMode(false);
          setEditUserId(null);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // Handle create
      axios.post('http://localhost:8080/store', formData)
        .then(response => {
          setUsers([...users, response.data]);
          setFormData({
            name: "",
            email: "",
            cns_marks: "",
            wadl_marks: ""
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      cns_marks: user.cns_marks,
      wadl_marks: user.wadl_marks
    });
    setEditMode(true);
    setEditUserId(user._id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/delete/${id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:8080/getuser')
      .then(response => setUsers(response.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Filter users with more than 20 marks in wadl_marks
  const filteredUsers = users.filter(user => user.wadl_marks > 20);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">CNS Marks</label>
              <input type="number" className="form-control" name="cns_marks" value={formData.cns_marks} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">WADL Marks</label>
              <input type="number" className="form-control" name="wadl_marks" value={formData.wadl_marks} onChange={handleChange} />
            </div>
            {editMode ? (
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update</button>
            ) : (
              <button type="submit" className="btn btn-primary">Submit</button>
            )}
          </form>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CNS marks</th>
                <th>WADL marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.cns_marks}</td>
                  <td>{user.wadl_marks}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <h2>Students with WADL marks greater than 20</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CNS marks</th>
                <th>WADL marks</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.cns_marks}</td>
                  <td>{user.wadl_marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
const url = "https://jsonplaceholder.typicode.com/users";

const getDetails = async () => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default function App() {

  const [expandedRows, setExpandedRows] = useState([]);
  const [expandState, setExpandState] = useState({});
  const handleEpandRow = (event, userId) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(userId);
  
    let obj = {};
    isRowExpanded ? (obj[userId] = false) :  (obj[userId] = true);
    setExpandState(obj);
  
    // If the row is expanded, we are here to hide it. Hence remove
    // it from the state variable. Otherwise add to it.
    const newExpandedRows = isRowExpanded ?
          currentExpandedRows.filter(id => id !== userId) :
          currentExpandedRows.concat(userId);
  
    setExpandedRows(newExpandedRows);
  }

  let [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    getDetails().then((res) => {
      setUsers(res);
    });
  }, []);
  return (
    <div className="App">
      <br></br>
      <table className="customers">
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
        {users.map((user) => {
          return (
            <><tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button className="button" type="button" onClick={event => handleEpandRow(event, user.id)}><span>
                  {expandState[user.id] ?
                    'Hide Details' : 'View Details'}
                </span></button>
              </td>
            </tr><>
            {
              expandedRows.includes(user.id) ?
              <tr>
                <td colspan="4">
                  <div style={{backgroundColor: '#343A40', color: '#FFF', padding: '10px'}}>
                    <h3>Personal Details </h3>
                    <ul>
                      <li>
                        <span><b>Name:</b></span> {' '}
                        <span> { user.name } </span>
                      </li>
                      <li>
                        <span><b>Email:</b></span> {' '}
                        <span> { user.email } </span>
                      </li>
                      <li>
                        <span><b>Address:</b></span> {' '}
                        <span>{user.address.street} {','} {user.address.suite} {','} {user.address.city} {','} {user.address.zipcode} </span>
                      </li>
                      <li>
                        <span><b>Phone:</b></span> {' '}
                        <span> { user.phone } </span>
                      </li>
                      <li>
                        <span><b>Website:</b></span> {' '}
                        <span> { user.website } </span>
                      </li>
                    </ul>
                    <h3>Company Details</h3>
                    <ul>
                    <li>
                        <span><b>Name:</b></span> {' '}
                        <span> { user.company.name } </span>
                      </li>
                      <li>
                        <span><b>Catch Phrase:</b></span> {' '}
                        <span> { user.company.catchPhrase } </span>
                      </li>
                      <li>
                        <span><b>BS:</b></span> {' '}
                        <span> { user.company.bs } </span>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr> : null
            }
            </></>
          );
        })}
      </table>
      <br></br>
      <div className="footer">
      <p>
        Developed by: <br></br>
        <b>Parag Vishnu Panzade </b><br></br><br></br>
        Contact:
        +91 9881226607 | panzadeparag@gmail.com<br></br>
        <a href="https://www.linkedin.com/in/paragpanzade">LinkedIn</a> | <a href="https://github.com/paragpanzade">GitHub</a>
      </p>
      </div>
    </div>
  );
}

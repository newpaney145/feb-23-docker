// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import InternList from './InternList';
import AddInternForm from './AddInternForm';
import EditInternForm from './EditInternForm';
// import Navbar from './Navbar';

function App() {
  const [interns, setInterns] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentIntern, setCurrentIntern] = useState({});

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const response = await axios.get('http://localhost:3001/internmembers');
      setInterns(response.data);
    } catch (error) {
      console.error('Error fetching interns:', error);
    }
  };

  const addIntern = async (intern) => {
    try {
      await axios.post('http://localhost:3001/internmembers', intern);
      fetchInterns();
    } catch (error) {
      console.error('Error adding intern:', error);
    }
  };

  const deleteIntern = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/internmembers/${id}`);
      fetchInterns();
    } catch (error) {
      console.error('Error deleting intern:', error);
    }
  };

  const editIntern = (intern) => {
    setEditing(true);
    setCurrentIntern(intern);
  };

  const updateIntern = async (id, updatedIntern) => {
    try {
      await axios.put(`http://localhost:3001/internmembers/${id}`, updatedIntern);
      setEditing(false);
      fetchInterns();
    } catch (error) {
      console.error('Error updating intern:', error);
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    setCurrentIntern({});
  };

  return (
    <div style={{ marginInline: "5em" }} className="App">
      <h1>Intern Management System</h1>
      <InternList interns={interns} deleteIntern={deleteIntern} editIntern={editIntern} />
      {editing ? (
        <EditInternForm intern={currentIntern} updateIntern={updateIntern} cancelEdit={cancelEdit} />
      ) : (
        <AddInternForm addIntern={addIntern} />
      )}
    </div>
  );
}

//   return (
//     <div style={{ marginInline: "5em" }} className="App">
//       <h1>Intern Management System</h1>
//       <BrowserRouter>
//       <ul>
//         <li>
//           <link to="/InternList">Internlist</link>
//         </li>
//       </ul>
      
//       <Routes>
//         <Route path="/Internlist" element={<InternList />}>
//         </Route>
//       </Routes>
//       </BrowserRouter>
//       {/* <InternList interns={interns} deleteIntern={deleteIntern} editIntern={editIntern} /> */}

//       {editing ? (
//         <EditInternForm intern={currentIntern} updateIntern={updateIntern} cancelEdit={cancelEdit} />
//       ) : (
//         <AddInternForm addIntern={addIntern} />
//       )}
//     </div>
//   );
// } 

export default App;
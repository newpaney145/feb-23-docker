import React from 'react';

function InternList({ interns, deleteIntern, editIntern }) {
  return (
    <div>
      <h2>Interns</h2>
      <ul>
        {interns.map((intern) => (
          <li style={{ display: "flex", gap: "10px", alignItems: "center", padding: "5px" }} key={intern.id}>
            {intern.name} - {intern.address} - {intern.dob} - {intern.selectionstatus}
            <button onClick={() => editIntern(intern)}>Edit</button>
            <button onClick={() => deleteIntern(intern.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InternList;

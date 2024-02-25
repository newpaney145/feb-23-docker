import React, { useState } from 'react';

function AddInternForm({ addIntern }) {
  const initialFormState = { name: '', address: '', dob: '', selectionstatus: '' };
  const [intern, setIntern] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIntern({ ...intern, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("start form validation");
    if (!intern.name || !intern.address || !intern.dob || !intern.selectionstatus) return;
    console.log("validation from end");
    console.log(intern);
    addIntern(intern);
    setIntern(initialFormState);
  };

  return (
    <form style={{ display: "flex", flexDirection: "column", marginBottom:"1em" }} onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" name="name" value={intern.name} onChange={handleChange} />
      <label>Address</label>
      <input type="text" name="address" value={intern.address} onChange={handleChange} />
      <label>DOB</label>
      <input type="date" name="dob" value={intern.dob} onChange={handleChange} />
      <label>Selection Status</label>
      <input type="text" name="selectionstatus" value={intern.selectionstatus} onChange={handleChange} />
      <div style={{ marginTop: "2rem" }}>
      <button>Add Intern</button>
      </div>
    </form> 
  );
}

export default AddInternForm;

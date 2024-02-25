import React, { useState, useEffect } from 'react';

function EditInternForm({ intern, updateIntern, cancelEdit }) {
  const [updatedIntern, setUpdatedIntern] = useState(intern);

  useEffect(() => {
    setUpdatedIntern(intern);
  }, [intern]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedIntern({ ...updatedIntern, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!updatedIntern.name || !updatedIntern.address || !updatedIntern.dob || !updatedIntern.selectionstatus) return;
    updateIntern(intern.id, updatedIntern);
  };

  return (
    <form style={{ display: "flex", flexDirection: "column", marginBottom:"1em" }} onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" name="name" value={updatedIntern.name} onChange={handleChange} />
      <label>Address</label>
      <input type="text" name="address" value={updatedIntern.address} onChange={handleChange} />
      <label>DOB</label>
      <input type="text" name="dob" value={updatedIntern.dob} onChange={handleChange} />
      <label>Selection Status</label>
      <input type="text" name="selectionstatus" value={updatedIntern.selectionstatus} onChange={handleChange} />
      <button>Update Intern</button>
      <button onClick={cancelEdit}>Cancel</button>
    </form>
  );
}

export default EditInternForm;

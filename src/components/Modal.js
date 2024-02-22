import React from 'react';
import './CustomModal.css';

const CustomModal = ({
    opAdd,
    show,
    handleClose,
    code,
    email,
    setEmail,
    address1,
    setAddress1,
    address2,
    setAddress2,
    name,
    setName,
    mobile,
    setMobile,
    maritalStatus,
    setMaritalStatus,
    stateId,
    setStateId,
    handleStateChange,
    stateOptions,
    gender,
    setGender,
    cityId,
    setCityId,
    cityOptions,
    isActive,
    handleActiveChange,
    handleSave,
    handleUpdate,
    isEmailValid,
    isNameValid,
    isMobileValid
}) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`} role="dialog" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">{opAdd? `Add` : `Edit: ${name}`}</h4>
                    </div>
                    <div className="modal-body">
                        <table className="custom-table">
                            <tbody>
                                {!opAdd?
                                <tr>
                                    <td>Code:</td>
                                    <td>
                                        <input type="text" className="form-control" id="not-editable" value={code} />
                                    </td>
                                </tr>
                                :
                                <div></div>
                                }
                                <tr>
                                    <td>Email:</td>
                                    <td>
                                        <input type="text" className="form-control" placeholder="Enter Email:" value={email} 
                                        onChange={(e) => {  const newEmail = e.target.value;
                                                            setEmail(newEmail); 
                                                            isEmailValid(newEmail);}} />
                                        <div id="emailV"></div>
                                    </td>
                                    <td>Name:</td>
                                    <td>
                                        <input type="text" className="form-control" placeholder="Enter Name:" value={name} 
                                        onChange={(e) => {  const newName = e.target.value;
                                                            setName(newName); 
                                                            isNameValid(newName); }} />
                                        <div id="nameV"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Mobile:</td>
                                    <td>
                                        <input type="text" className="form-control" placeholder="Enter Mobile:" value={mobile} 
                                        onChange={(e) => {  const newMobile = e.target.value;
                                                            setMobile(newMobile);
                                                            isMobileValid(newMobile); }}  />
                                        <div id="mobileV"></div>
                                    </td>
                                    <td>Address 1:</td>
                                    <td>
                                        <input type="text" className="form-control" placeholder="Enter Address1:" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Address 2:</td>
                                    <td>
                                        <input type="text" className="form-control" placeholder="Enter Address2:" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                                    </td>
                                    <td>Marital Status:</td>
                                    <td>
                                        <select className="form-control" value={maritalStatus} onChange={(e) => { setMaritalStatus(parseInt(e.target.value)); }}>
                                            <option value={4}>--Select Marital Status--</option>
                                            <option value={0}>Single</option>
                                            <option value={1}>Married</option>
                                            <option value={2}>Separated</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>State/UTs:</td>
                                    <td>
                                        <select className="form-control" value={stateId} onChange={(e) => { setStateId(parseInt(e.target.value)); handleStateChange(parseInt(e.target.value)); }}>
                                            <option value="">--Select State--</option>
                                            {stateOptions}
                                        </select>
                                    </td>
                                    <td>City:</td>
                                    <td>
                                        <select className="form-control" value={cityId} onChange={(e) => setCityId(parseInt(e.target.value))}>
                                            <option value="">--Select City--</option>
                                            {cityOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td colSpan="3">
                                        <input type="radio" name="gender" value="0" checked={gender === 0} onChange={(e) => { setGender(parseInt(e.target.value)); }} /> Male &nbsp;
                                        <input type="radio" name="gender" value="1" checked={gender === 1} onChange={(e) => { setGender(parseInt(e.target.value)); }} /> Female
                                    </td>
                                </tr>
                                <tr>
                                    <td>IsActive:</td>
                                    <td colSpan="3">
                                        <input type="checkbox" checked={isActive === 1 ? true : false} onChange={(e) => handleActiveChange(e)} value={isActive} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <div id="validation"></div>
                        <button type="button" className="styled-button-delete" onClick={handleClose}> Close </button>
                        <button className="styled-button" onClick={opAdd ? handleSave : handleUpdate}> Save </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;


// import React from 'react';

// const CustomModal = ({ add, handleClose, email, setEmail, address1, setAddress1, address2, setAddress2, name, setName, mobile, setMobile, maritalStatus, setMaritalStatus, stateId, setStateId, handleStateChange, stateOptions, gender, setGender, cityId, setCityId, cityOptions, isActive, handleActiveChange, handleSave, isEmailValid, isNameValid, isMobileValid }) => {
//     return (
//         <div className={`modal ${add ? 'show' : ''}`} role="dialog" style={{ display: add ? 'block' : 'none' }}>
//             <div className="modal-dialog" role="document">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <button type="button" className="close" onClick={handleClose} aria-label="Close">
//                             <span aria-hidden="true">&times;</span>
//                         </button>
//                         <h4 className="modal-title">Add</h4>
//                     </div>
//                     <div className="modal-body">
//                         <div className="horizontal">
//                             <div className="vertical">
//                                 <label>Email:</label>
//                                 <input type="text" className="form-control" placeholder="Enter Email:" value={email} onChange={(e) => { setEmail(e.target.value); isEmailValid(email); }} />
//                                 <div id="emailV"></div>

//                                 <label>Name:</label>
//                                 <input type="text" className="form-control" placeholder="Enter Name:" value={name} onChange={(e) => { setName(e.target.value); isNameValid(name); }} />
//                                 <div id="nameV"></div>

//                                 <label>Mobile:</label>
//                                 <input type="text" className="form-control" placeholder="Enter Mobile:" value={mobile} onChange={(e) => { setMobile(e.target.value); isMobileValid(mobile); }} />
//                                 <div id="mobileV"></div>

//                                 <label>State/Union Territory:</label>
//                                 <select className="form-control" value={stateId} onChange={(e) => { setStateId(parseInt(e.target.value)); handleStateChange(parseInt(e.target.value)); }}>
//                                     <option value="">--Select State--</option>
//                                     {stateOptions}
//                                 </select>

//                                 <label>City:</label>
//                                 <select className="form-control" value={cityId} onChange={(e) => setCityId(parseInt(e.target.value))}>
//                                     <option value="">--Select City--</option>
//                                     {cityOptions}
//                                 </select>
//                             </div>
//                             <div className="vertical">
//                                 <label>Address 1:</label>
//                                 <input type="text" className="form-control" placeholder="Enter Address1:" value={address1} onChange={(e) => setAddress1(e.target.value)} />

//                                 <label>Address 2:</label>
//                                 <input type="text" className="form-control" placeholder="Enter Address2:" value={address2} onChange={(e) => setAddress2(e.target.value)} />

//                                 <label>Marital Status:</label>
//                                 <select className="form-control" value={maritalStatus} onChange={(e) => { setMaritalStatus(parseInt(e.target.value)); }}>
//                                     <option value={4}>--Select Marital Status--</option>
//                                     <option value={0}>Single</option>
//                                     <option value={1}>Married</option>
//                                     <option value={2}>Separated</option>
//                                 </select><br/>

//                                 <label>Gender:  </label>
//                                 <input type="radio" name="gender" value="0" checked={gender === 0} onChange={(e) => { setGender(parseInt(e.target.value)); }} /> Male &nbsp;
//                                 <input type="radio" name="gender" value="1" checked={gender === 1} onChange={(e) => { setGender(parseInt(e.target.value)); }} /> Female

//                                 <br/>
//                                 <input type="checkbox" checked={isActive === 1 ? true : false} onChange={(e) => handleActiveChange(e)} value={isActive} />
//                                 <label>IsActive</label>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="modal-footer">
//                         <div id="validation"></div>
//                         <button type="button" onClick={handleClose}> Close </button>
//                         <button onClick={handleSave}> Save </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CustomModal;

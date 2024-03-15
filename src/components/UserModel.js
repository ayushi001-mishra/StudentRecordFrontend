import React from 'react';
 
const UserModel = ({
    opAdd,
    show,
    handleClose,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    isLocked,
    setIsLocked,
    securityQuestionId,
    setSecurityQuestionId,
    answerId,
    setAnswerId,
    roleId,
    setRoleId,
    handleSave,
    handleUpdate,
    isEmailValid
}) => {
    return (
    <div className={`modal ${show ? 'show' : ''}`} role="dialog" style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" onClick={() => { handleClose()}} aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">{opAdd ? `Add` : `Edit: ${name}`}</h4>
            </div>
        <div className="modal-body">
        <table className="custom-table" style={{width:"500px"}}>
        <tbody>
                <tr>
                    <td>Name:</td>
                    <td colSpan={3}>
                        <input type="text" className="form-control" placeholder="Enter Name:" value={name}
                        onChange={(e) => {const newName = e.target.value;
                        setName(newName);}} />
                    </td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td colSpan={3}>
                    <input type="text" className="form-control" placeholder="Enter Email:" value={email}
                    onChange={(e) => { const newEmail = e.target.value; setEmail(newEmail); isEmailValid(newEmail); }} />
                    <div id="emailV"></div>
                    </td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td colSpan={3}>
                    <input type="password" className="form-control" placeholder="Enter Password:" value={password}
                     onChange={(e) => {setPassword(e.target.value) }} />
                    </td>
                </tr>
                <tr>
                    <td>Is Locked:</td>
                    <td colSpan={3}>
                    <input type="checkbox" checked={isLocked} onChange={(e) => setIsLocked(e.target.checked)} />
                    </td>
                </tr>
                <tr>
                    <td>Security Question:</td>
                        <td colSpan={3}><select className="form-control" value={securityQuestionId} onChange={(e) => setSecurityQuestionId(parseInt(e.target.value))}>
                         </select>
                    </td>
                </tr>
                <tr>
                    <td>Answer:</td>
                    <td colSpan={3}>
                        <input type="text" className="form-control" placeholder="Enter Answer:" value={answerId}
                        onChange={(e) => { setAnswerId(parseInt(e.target.value) || 0); }}/>
                    </td>
                </tr>
                <tr>
                    <td>Role:</td>
                    <td colSpan={3}>
                        <input type="text" className="form-control" placeholder="Enter Role Id:" value={roleId}
                        onChange={(e) => { setRoleId(parseInt(e.target.value) || 0 ); }}/>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
            <div className="modal-footer">
                <div id="validation"></div>
                    <button className="styled-button" onClick={opAdd ? handleSave : handleUpdate}> Save </button>
                </div>
            </div>
        </div>
    </div>
    );
};
 
export default UserModel;


import React from 'react';
 
const Student=({userName, userRole, setIsLoggedIn})=>{
    return(
        <div className="student-container">
            <p>
                hello {userName}, you have logged-in as {userRole}
            </p>
            <button onClick={()=>setIsLoggedIn(false)}>Logout</button>
        </div>
    );
}
 
export default Student;
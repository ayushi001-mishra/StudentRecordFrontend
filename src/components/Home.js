import React, {useState, useEffect, Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, Row, Col, Table} from 'react-bootstrap';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {validateData} from './validate';

const Home = ()=> {

    //for edit model
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //for add model
    const [add, setAdd] = useState(false);
    const handleCloseAdd = () => setAdd(false);
    const handleShowAdd = () => setAdd(true);

    //add fields
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [stateId, setStateId] = useState(0);
    const [cityId, setCityId] = useState(0);
    const [gender, setGender] = useState(2); 
    const [maritalStatus, setMaritalStatus] = useState(4); 
    const [isActive, setIsActive] = useState(0);
    const [createdBy, setCreatedBy] = useState(0);
    const [createdOn, setCreatedOn] = useState('');
    const [modifiedBy, setModifiedBy] = useState(0);
    const [modifiedOn, setModifiedOn] = useState('');


    //edited fields
    const [editId, editSetId] = useState('');
    const [editCode, editSetCode] = useState('');
    const [editName, editSetName] = useState('');
    const [editEmail, editSetEmail] = useState('');
    const [editMobile, editSetMobile] = useState('');
    const [editAddress1, editSetAddress1] = useState('');
    const [editAddress2, editSetAddress2] = useState('');
    const [editStateId, editSetStateId] = useState(0);
    const [editCityId, editSetCityId] = useState(0);
    const [editGender, editSetGender] = useState(2); 
    const [editMaritalStatus, editSetMaritalStatus] = useState(4); 
    const [editIsActive, editSetIsActive] = useState(0);
    const [editCreatedBy, editSetCreatedBy] = useState(0);
    const [editCreatedOn, editSetCreatedOn] = useState('');
    const [editModifiedBy, editSetModifiedBy] = useState(0);
    const [editModifiedOn, editSetModifiedOn] = useState('');
    
    //for state and city dropdown display 
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]); 

    //for student record
    const [data, setData] = useState([]);

    //selected ids for validation
    const [selectedIds, setSelectedIds] = useState([]);

    //to check if edited email/mobile is different from orginial one or not
    const [emailOfEditStudent, setEmailOfEditStudent]=useState('');
    const [mobileOfEditStudent, setMobileOfEditStudent]=useState('');

    //get current date
    const currentDate = new Date().toISOString();

    useEffect(()=>{
        getData();

        axios.get('https://localhost:7277/api/State')
        .then((result) => {
            setStates(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const getData = () =>{
        axios.get('https://localhost:7277/api/Student')
        .then((result)=>{
            const activeStudents = result.data.filter(student => student.isActive === 1);
            setData(activeStudents);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const checkEmail = async (emailPara) => {
        try {
          const response = await axios.get(`https://localhost:7277/api/Student/CheckEmail/${emailPara}`);
        //   const result = response.data;
        //   setEmailExists(result.exists);
          return response.data.exists;
        } catch (error) {
          console.error('Error checking email:', error);
        }
      };
      
      const checkMobile = async (mobilePara) => {
        try {
          const response = await axios.get(`https://localhost:7277/api/Student/CheckMobile/${mobilePara}`);
        //   const result = response.data;
        //   setMobileExists(result.exists);
          return response.data.exists;
        } catch (error) {
          console.error('Error checking mobile number:', error);
        }
      };

    const handleSave = async () =>{
        const data = {
            "code": code,
            "name": name,
            "email": email,
            "mobile": mobile,
            "address1": address1,
            "address2": address2,
            "isActive": isActive,
            "stateId": stateId,
            "cityId": cityId,
            "gender": gender,
            "maritalStatus": maritalStatus,
            "createdBy": createdBy,
            "createdOn": currentDate,
            "modifiedBy": modifiedBy,
            "modifiedOn": currentDate
        }

        const validationError = validateData(data);
        if (validationError) {
            document.getElementById("validation").innerHTML = validationError;
            return;
        }
     
        try {
            const emailExists = await checkEmail(email);
            if (emailExists) {
                document.getElementById("validation").innerHTML ="Email already exists.";
                return;
            }

            const mobileExists = await checkMobile(mobile);
            if (mobileExists) {
                document.getElementById("validation").innerHTML ="Mobile number already exists.";
                return;
            }

            await axios.post('https://localhost:7277/api/Student', data);
            getData();
            clear();
            handleCloseAdd();
            //toast emitter
            toast.success('Student added.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.error('Error occurred while saving:', error);
            //toast emitter
            toast.error(error.message || 'An error occurred while saving.');
        }
    };

    //clear the fields present in model
    const clear = () =>{
        setCode('');
        setName('');
        setEmail('');
        setMobile('');
        setAddress1('');
        setAddress2('');
        setIsActive(0);
        setGender(2);
        setMaritalStatus(4);
        setStateId(0);
        setCityId(0);
        setCreatedBy(0);
        setCreatedOn('');
        setModifiedBy(0);
        setModifiedOn('');

        editSetCode('');
        editSetName('');
        editSetEmail('');
        editSetMobile('');
        editSetAddress1('');
        editSetAddress2('');
        editSetIsActive(0);
        editSetGender(2);
        editSetMaritalStatus(4);
        editSetStateId(0);
        editSetCityId(0);
        editSetCreatedBy(0);
        editSetCreatedOn('');
        editSetModifiedBy(0);
        editSetModifiedOn('');
        editSetId('');

        setEmailOfEditStudent('');
        setMobileOfEditStudent('');

    }

    //open add model when add button clicked
    const handleAdd = ()=>{
        handleShowAdd();
    }

    const handleEdit = (id) =>{
        handleShow();
        axios.get(`https://localhost:7277/api/Student/${id}`)
        .then((result)=>{
            editSetCode(result.data.code);
            editSetName(result.data.name);
            editSetEmail(result.data.email);
            editSetMobile(result.data.mobile);
            editSetAddress1(result.data.address1);
            editSetAddress2(result.data.address2);
            editSetIsActive(result.data.isActive);
            editSetGender(result.data.gender);
            editSetMaritalStatus(result.data.maritalStatus);
            editSetStateId(result.data.stateId);
            editSetCityId(result.data.cityId);
            editSetCreatedBy(result.data.createdBy);
            editSetCreatedOn(result.data.createdOn);
            editSetModifiedBy(result.data.modifiedBy);
            editSetModifiedOn(result.data.modifiedOn);
            editSetId(id);

            setEmailOfEditStudent(result.data.email);
            setMobileOfEditStudent(result.data.mobile);
                
        })
        .catch((error)=>{
            toast.error(error);
        })
    }

    const handleUpdate = () =>{
        const data = {
            "code": editCode,
            "name": editName,
            "email": editEmail,
            "mobile": editMobile,
            "address1": editAddress1,
            "address2": editAddress2,
            "isActive": editIsActive,
            "gender": editGender,
            "maritalStatus": editMaritalStatus,
            "stateId": editStateId,
            "cityId": editCityId,
            "createdBy": editCreatedBy,
            "createdOn": editCreatedOn,
            "modifiedBy": editModifiedBy,
            "modifiedOn": currentDate
        }

        const validationError = validateData(data);
        if (validationError) {
            document.getElementById("validation").innerHTML = validationError;
            return;
        }

        const emailExists=checkEmail(editEmail);
        if (emailOfEditStudent!=editEmail && emailExists) {
            document.getElementById("validation").innerHTML = "Email already exists."
            return;
        }

        const mobileExists=checkEmail(editMobile);
        if (mobileOfEditStudent!=editMobile && mobileExists) {
            document.getElementById("validation").innerHTML = "Mobile already exists."
            return;
        }

        axios.put(`https://localhost:7277/api/Student/${editId}`, data)
        .then((result)=>{
            getData();
            clear();
            handleClose();
            toast.success('Student Updated.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
        .catch((error)=>{
            toast.error(error);
        })
    }

    const handleDeleteSelected = () => {
        if(selectedIds.length==0){
            window.alert("Select atleast one student record to delete.");
        }
        else if(window.confirm("Are you sure?")===true){
            selectedIds.forEach(async (id) => {
            try {
                await  handleDelete(id);
            } catch (error) {
                console.error(`Error deleting record with ID ${id}:`, error);
            }
            });
            setSelectedIds([]);
            toast.success('Selected Student(s) Deleted.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    };

    const handleDelete = (id) =>{
        axios.delete(`https://localhost:7277/api/Student/${id}`)
        .then((result)=>{
            if(result.status===200){
                getData();
            }
        })
        .catch((error)=>{
            toast.error(error);
        })
    }
    
    const handleSelectedDeactive = () => {
        if(selectedIds.length==0){
            window.alert("Select atleast one student record to deactivate.");
        }
        else if(window.confirm("Are you sure?")===true){
            selectedIds.forEach(async (id) => {
            try {
                await  handleDeactivate(id);
            } catch (error) {
                console.error(`Error deleting record with ID ${id}:`, error);
            }
            });
            setSelectedIds([]);
            toast.success('Selected Deactivated.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    };

    const handleDeactivate = (id) =>{
        axios.patch(`https://localhost:7277/api/Student/${id}`, [{"op": "replace","path": "/isActive","value": 0}])
        .then((result)=>{
            if(result.status===200){
                getData();
            }
        })
        .catch((error)=>{
            toast.error(error);
        })
    }

    //when a record is selected
    const handleCheckboxChange = (id) => {
        const newSelectedIds = selectedIds.includes(id)
          ? selectedIds.filter((selectedId) => selectedId !== id)
          : [...selectedIds, id];
    
        setSelectedIds(newSelectedIds);
    };

    const handleActiveChange=(e)=>{
        if(e.target.checked){
            setIsActive(1);
        }
        else{
            setIsActive(0);
        }
    }

    const handleEditActiveChange=(e)=>{
        if(e.target.checked){
            editSetIsActive(1);
        }
        else{
            editSetIsActive(0);
        }
    }

    const handleEditMaritalStatusChange = (e) => {
        editSetMaritalStatus(parseInt(e.target.value));
    }

     const handleStateChange = (stateId) => {
        axios.get(`https://localhost:7277/api/City/FromState/${stateId}`)
            .then((result) => {
                setCities(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const stateOptions = states.map((state) => (
        <option key={state.sId} value={state.sId}>{state.name}</option>
    ));

    const cityOptions = cities.map((city) => (
        <option key={city.cId} value={city.cId}>{city.name}</option>
    ));

    return(
        <Fragment>
            <h1 style={{padding:"20px"}}>Manage Student</h1>
            <button className="btn btn-primary" onClick={handleAdd}>Add</button> &nbsp;
            <button className="btn btn-danger" onClick={handleDeleteSelected}>Delete</button> &nbsp;
            <button className="btn btn-danger" onClick={handleSelectedDeactive}>Deactivate</button> &nbsp;

            <ToastContainer/>

            {/*model for add*/}
            <Modal show={add} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                <Modal.Title>Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                    <Col>
                        <label>Email:</label>
                        <input type="text" className="form-control" placeholder="Enter Email:" 
                        value={email} onChange={(e)=> setEmail(e.target.value)} />
                    </Col>
                    <Col>
                        <label>Address 1:</label>
                        <input type="text" className="form-control" placeholder="Enter Address1:" 
                        value={address1} onChange={(e)=> setAddress1(e.target.value)} />
                    </Col> 
                </Row>
                <Row> 
                    <Col>
                        <label>Name:</label>
                        <input type="text" className="form-control" placeholder="Enter Name:" 
                        value={name} onChange={(e)=> setName(e.target.value)} />
                    </Col> 
                    <Col>
                        <label>Address 2:</label>
                        <input type="text" className="form-control" placeholder="Enter Address2:" 
                        value={address2} onChange={(e)=> setAddress2(e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Mobile:</label>
                        <input type="text" className="form-control" placeholder="Enter Mobile:" 
                        value={mobile} onChange={(e)=> setMobile(e.target.value)} />
                    </Col>
                    <Col>
                        <label>Marital Status:</label><br />
                        <select className="form-control" value={maritalStatus} 
                        onChange={(e) => {setMaritalStatus(parseInt(e.target.value));}}>
                            <option value={4}>--Select Marital Status--</option>
                            <option value={0}>Single</option>
                            <option value={1}>Married</option>
                            <option value={2}>Separated</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>State/Union Territory:</label><br />
                        <select className="form-control" value={stateId} onChange={(e) => {
                            setStateId(parseInt(e.target.value));
                            handleStateChange(parseInt(e.target.value));
                        }}>
                            <option value="">--Select State--</option>
                            {stateOptions}
                        </select>
                    </Col>
                    <Col>
                        <label>Gender:  </label><br/>
                        <input type="radio" name="gender" value="0" checked={gender === 0} 
                        onChange={(e) => {setGender(parseInt(e.target.value));}} /> Male &nbsp;
                        <input type="radio" name="gender" value="1" checked={gender === 1} 
                        onChange={(e) => {setGender(parseInt(e.target.value));}} /> Female
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>City:</label><br />
                        <select className="form-control" value={cityId} 
                        onChange={(e) => setCityId(parseInt(e.target.value))}>
                            <option value="">--Select City--</option>
                            {cityOptions}
                        </select>
                    </Col>
                    <Col>
                        <input type="checkbox" checked={isActive === 1 ? true : false} onChange={(e)=> handleActiveChange(e)} value={isActive} />
                        <label>IsActive</label>
                    </Col>
                </Row>
                </Modal.Body>
                <Modal.Footer>
                    <div id="validation"></div>
                    <Button variant="secondary" onClick={handleCloseAdd}> Close </Button>
                    <Button className="btn btn-primary" onClick={()=> { handleSave();}}> Save </Button>
                </Modal.Footer>
            </Modal>

            {/*Table to show records*/}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Select</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Address1</th>
                    <th>Address2</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Gender</th>
                    <th>Marital Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data && data.length > 0 ?
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}
                                    />
                                    </td>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.address1}</td>
                                    <td>{item.address2}</td>
                                    <td>{item.stateName}</td>
                                    <td>{item.cityName}</td>
                                    <td>{item.gender === 0 ? "Male" : "Female"}</td>
                                    <td>{item.maritalStatus === 0 ? "Single" : (item.maritalStatus === 1 ? "Married" : "Separated")}</td>
                                    <td colSpan={2}>
                                        <button className="btn btn-primary" onClick={()=>{handleStateChange(item.stateId); handleEdit(item.id);}}>Edit</button> &nbsp;
                                        {/* <button className="btn btn-danger" onClick={()=>handleDelete(item.id)}>Delete</button> */}
                                    </td>
                                </tr>   
                            )
                        })
                        :
                        "No records"
                }
                </tbody>
            </Table>

            {/*model for edit */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit: {editName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                    <Col>
                        <label>Code:</label>
                        <input type="text" className="form-control" id="not-editable" placeholder="Enter Code:" 
                        value={editCode} contentEditable="false"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Email:</label>
                        <input type="text" className="form-control" placeholder="Enter Email:" 
                        value={editEmail} onChange={(e)=> editSetEmail(e.target.value)} />
                    </Col>
                    <Col>
                        <label>Address 1:</label>
                        <input type="text" className="form-control" placeholder="Enter Address1:" 
                        value={editAddress1} onChange={(e)=> editSetAddress1(e.target.value)} />
                    </Col>
                </Row>
                <Row>   
                    <Col>
                        <label>Name:</label>
                        <input type="text" className="form-control" placeholder="Enter Name:" 
                        value={editName} onChange={(e)=> editSetName(e.target.value)} />
                    </Col>
                    <Col>
                            <label>Address 2:</label>
                            <input type="text" className="form-control" placeholder="Enter Address2:" 
                            value={editAddress2} onChange={(e)=> editSetAddress2(e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Mobile:</label>
                        <input type="text" className="form-control" placeholder="Enter Mobile:" 
                        value={editMobile} onChange={(e)=> editSetMobile(e.target.value)} />
                    </Col>
                    <Col>
                        <label>Marital Status:</label><br />
                        <select className="form-control" value={editMaritalStatus} onChange={handleEditMaritalStatusChange}>
                            <option value={4}>--Select Marital Status--</option>
                            <option value={0}>Single</option>
                            <option value={1}>Married</option>
                            <option value={2}>Separated</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>State:</label><br />
                        <select className="form-control" value={editStateId} onChange={(e) => {
                            editSetStateId(parseInt(e.target.value));
                            handleStateChange(parseInt(e.target.value)); 
                        }}>
                            <option value="">--Select State--</option>
                            {stateOptions}
                        </select>
                    </Col>                                
                    <Col>
                        <label>Gender:</label>
                        <input type="radio" name="editGender" value="0" checked={editGender === 0}
                         onChange={(e) => {editSetGender(parseInt(e.target.value));}} /> Male &nbsp;
                        <input type="radio" name="editGender" value="1" checked={editGender === 1} 
                         onChange={(e) => {editSetGender(parseInt(e.target.value));}} /> Female
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>City:</label><br />
                        <select className="form-control" value={editCityId} 
                         onChange={(e) => editSetCityId(parseInt(e.target.value))}>
                            <option value="">--Select City--</option>
                            {cityOptions}
                        </select>
                    </Col>
                    <Col>
                        <input type="checkbox" checked={editIsActive === 1? true : false} onChange={(e)=> handleEditActiveChange(e)} value={editIsActive} />
                        <label>IsActive</label>
                    </Col>
                </Row>

                </Modal.Body>
                <Modal.Footer>
                    <div id="validation"></div>
                    <Button variant="secondary" onClick={handleClose}> Close </Button>
                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default Home;
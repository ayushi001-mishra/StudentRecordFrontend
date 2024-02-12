import React, {useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CRUD = ()=> {

    //for edit
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //for add
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
    const [isActive, setIsActive] = useState(0);

    //edited fields
    const [editId, editSetId] = useState('');
    const [editCode, editSetCode] = useState('');
    const [editName, editSetName] = useState('');
    const [editEmail, editSetEmail] = useState('');
    const [editMobile, editSetMobile] = useState('');
    const [editAddress1, editSetAddress1] = useState('');
    const [editAddress2, editSetAddress2] = useState('');
    const [editIsActive, editSetIsActive] = useState(0);

    const [data, setData] = useState([]);

    useEffect(()=>{
        getData();
    }, []);

    const getData = () =>{
        axios.get('https://localhost:7277/api/Student')
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleSave = () =>{
        const data = {
            "code": code,
            "name": name,
            "email": email,
            "mobile": mobile,
            "address1": address1,
            "address2": address2,
            "isActive": isActive
        }

        axios.post('https://localhost:7277/api/Student', data)
        .then((result)=>{
            getData();
            clear();
            handleCloseAdd();
            //toast emitter
            toast.success('Student added.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
        .catch((error)=>{
            toast.error(error);
        })
    }

    //clear the fields present in model
    const clear = () =>{
        setCode('');
        setName('');
        setEmail('');
        setMobile('');
        setAddress1('');
        setAddress2('');
        setIsActive(0);
        editSetCode('');
        editSetName('');
        editSetEmail('');
        editSetMobile('');
        editSetAddress1('');
        editSetAddress2('');
        editSetIsActive(0);
        editSetId('');

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
            editSetId(id);
        })
        .catch((error)=>{
            toast.error(error);
        })
    }

    const handleUpdate = () =>{
        const data = {
            "id": editId,
            "code": editCode,
            "name": editName,
            "email": editEmail,
            "mobile": editMobile,
            "address1": editAddress1,
            "address2": editAddress2,
            "isActive": editIsActive
        }

        axios.put(`https://localhost:7277/api/Student/${editId}`, data)
        .then((result)=>{
            getData();
            clear();
            handleClose();
            toast.success('Student Updated.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
        .catch((error)=>{
            toast.error(error);
        })
    }

    const [selectedIds, setSelectedIds] = useState([]);

    const handleDeleteSelected = () => {
        if(window.confirm("Are you sure?")==true){
            selectedIds.forEach(async (id) => {
            try {
                await  handleDelete(id);
            } catch (error) {
                console.error(`Error deleting record with ID ${id}:`, error);
            }
            });
            setSelectedIds([]);
            toast.success('Selected Student(s) Deleted.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
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

    return(
        <Fragment>
            <h1 style={{padding:"20px"}}>Manage Students</h1>
            <button className="btn btn-primary" onClick={handleAdd}>Add</button>
            <button className="btn btn-danger" onClick={handleDeleteSelected}>Delete</button>

            <ToastContainer/>

            {/*model for add*/}
            <Modal show={add} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                <Modal.Title>Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col><input type="text" className="form-control" placeholder="Enter Name:" 
                        value={name} onChange={(e)=> setName(e.target.value)} /></Col>
                    </Row>
                    <Row>    
                        <Col><input type="text" className="form-control" placeholder="Enter Email:" 
                        value={email} onChange={(e)=> setEmail(e.target.value)} /></Col>
                    </Row>
                    <Row> 
                        <Col><input type="text" className="form-control" placeholder="Enter Mobile:" 
                        value={mobile} onChange={(e)=> setMobile(e.target.value)} /></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" className="form-control" placeholder="Enter Address1:" 
                        value={address1} onChange={(e)=> setAddress1(e.target.value)} /></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" className="form-control" placeholder="Enter Address2:" 
                        value={address2} onChange={(e)=> setAddress2(e.target.value)} /></Col>
                    </Row>
                    <Row>
                        <Col><input type="checkbox"
                            checked={isActive == 1 ? true : false}
                            onChange={(e)=> handleActiveChange(e)} value={isActive}
                        />
                            <label>IsActive</label>
                        </Col>
                    </Row>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}> Close </Button>
                    <Button className="btn btn-primary" onClick={()=> handleSave()}> Save </Button>
                </Modal.Footer>
            </Modal>

            {/*Table to show records*/}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Select</th>
                    <th>id</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Address1</th>
                    <th>Address2</th>
                    <th>isActive</th>
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
                                    <td>{item.id}</td>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.address1}</td>
                                    <td>{item.address2}</td>
                                    <td>{item.isActive}</td>
                                    <td colSpan={2}>
                                        <button className="btn btn-primary" onClick={()=>handleEdit(item.id)}>Edit</button> &nbsp;
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
                <Modal.Title>Modified / Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col><input type="text" className="form-control" placeholder="Enter Id:" 
                        value={editId} onChange={(e)=> editSetId(e.target.value)} /></Col><br/>
                    </Row>
                    <Row>
                        <Col><input type="text" className="form-control" placeholder="Enter Code:" 
                        value={editCode} onChange={(e)=> editSetCode(e.target.value)} /></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" className="form-control" placeholder="Enter Name:" 
                        value={editName} onChange={(e)=> editSetName(e.target.value)} /></Col>
                    </Row>
                    <Row>    
                        <Col><input type="text" className="form-control" placeholder="Enter Email:" 
                        value={editEmail} onChange={(e)=> editSetEmail(e.target.value)} /></Col>
                    </Row>
                    <Row> 
                        <Col><input type="text" className="form-control" placeholder="Enter Mobile:" 
                        value={editMobile} onChange={(e)=> editSetMobile(e.target.value)} /></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" className="form-control" placeholder="Enter Address1:" 
                        value={editAddress1} onChange={(e)=> editSetAddress1(e.target.value)} /></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" className="form-control" placeholder="Enter Address2:" 
                        value={editAddress2} onChange={(e)=> editSetAddress2(e.target.value)} /></Col>
                    </Row>
                    <Row>
                        <Col><input type="checkbox"
                            checked={editIsActive == 1? true : false}
                            onChange={(e)=> handleEditActiveChange(e)} value={editIsActive}
                        />
                            <label>IsActive</label>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Close </Button>
                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default CRUD;
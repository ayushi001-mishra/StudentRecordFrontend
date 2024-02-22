import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {validateData} from './Validate';
import {baseURL, baseURLStudent} from '../configurations';
import CustomModal from './Modal';
import Navbar from './Navbar';

const Home = ()=> {

    //for edit model
    const [edit, setEdit] = useState(false);
    const handleCloseEdit = () =>setEdit(false);
    const handleShowEdit = () => setEdit(true);

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

        axios.get(baseURL+'/State')
        .then((result) => {
            setStates(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const getData = () =>{
        axios.get(baseURLStudent)
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
          const response = await axios.get(baseURLStudent+`/CheckEmail/${emailPara}`);
          return response.data.exists;
        } catch (error) {
          console.error('Error checking email:', error);
        }
      };
      
      const checkMobile = async (mobilePara) => {
        try {
          const response = await axios.get(baseURLStudent+`/CheckMobile/${mobilePara}`);
          return response.data.exists;
        } catch (error) {
          console.error('Error checking mobile number:', error);
        }
      };

      const isNameValid=(name)=>{
        const nameRegex=/^[A-Z][a-zA-z]*$/;
        if (!nameRegex.test(name)) {
            document.getElementById("nameV").innerHTML ="Enter name*";
        }
        else{
            document.getElementById("nameV").innerHTML ="";
        }
      }

      const isEmailValid=(email)=>{
        const emailRegex=/^[a-zA-Z0-9_]+[@][a-z]+[.][a-z]{2,3}$/;
        if (!emailRegex.test(email)) {
            document.getElementById("emailV").innerHTML ="Enter valid email*";
        }
        else{
            document.getElementById("emailV").innerHTML ="";
        }
      }

      const isMobileValid=(mobile)=>{
        const mobileRegex=/^[6-9][0-9]{9}$/;
        if (!mobileRegex.test(mobile)) {
            document.getElementById("mobileV").innerHTML ="Enter valid number*";
        }
        else{
            document.getElementById("mobileV").innerHTML ="";
        }
      }

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

            await axios.post(baseURLStudent, data);
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
        handleShowEdit();
        axios.get(baseURLStudent+`/${id}`)
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

    const handleUpdate = async () =>{
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

        try {
        const eEmailExists= await checkEmail(editEmail);
        if (emailOfEditStudent!=editEmail && eEmailExists) {
            document.getElementById("validation").innerHTML = "Email already exists."
            return;
        }

        const eMobileExists= await checkMobile(editMobile);
        if (mobileOfEditStudent!=editMobile && eMobileExists) {
            document.getElementById("validation").innerHTML = "Mobile already exists."
            return;
        }

            await axios.put(baseURLStudent+`/${editId}`, data);
            getData();
            clear();
            handleCloseEdit();
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
        } catch (error) {
            console.error('Error occurred while updating:', error);
            toast.error(error.message || 'An error occurred while updating.');
        }
};

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
        axios.delete(baseURLStudent+`/${id}`)
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
        axios.patch(baseURLStudent+`/${id}`, [{"op": "replace","path": "/isActive","value": 0}])  //patch method takes values op,path,value
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
        axios.get(baseURL+`/City/FromState/${stateId}`)
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
            <Navbar/>

            <button style={{float:"left"}} className="styled-button" onClick={handleAdd}>Add</button> &nbsp;
            <button style={{float:"left"}} className="styled-button-delete" onClick={handleDeleteSelected}>Delete</button> &nbsp;
            <button style={{float:"left"}} className="styled-button-delete" onClick={handleSelectedDeactive}>Deactivate</button> &nbsp;

            <ToastContainer/>

            {/*model*/}
            {add? 
            <CustomModal
                opAdd={true}
                show={add}
                handleClose={handleCloseAdd}
                code={code}
                email={email}
                setEmail={setEmail}
                address1={address1}
                setAddress1={setAddress1}
                address2={address2}
                setAddress2={setAddress2}
                name={name}
                setName={setName}
                mobile={mobile}
                setMobile={setMobile}
                maritalStatus={maritalStatus}
                setMaritalStatus={setMaritalStatus}
                stateId={stateId}
                setStateId={setStateId}
                handleStateChange={handleStateChange}
                gender={gender}
                setGender={setGender}
                cityId={cityId}
                setCityId={setCityId}
                stateOptions={stateOptions}
                cityOptions={cityOptions}
                isActive={isActive}
                setIsActive={setIsActive}
                handleActiveChange={handleActiveChange}
                handleSave={handleSave}
                handleUpdate={handleUpdate}
                isEmailValid={isEmailValid}
                isNameValid={isNameValid}
                isMobileValid={isMobileValid}
            />
            :
                (edit?
                <CustomModal
                    opAdd={false}
                    show={edit}
                    handleClose={handleCloseEdit}
                    code={editCode}
                    email={editEmail}
                    setEmail={editSetEmail}
                    address1={editAddress1}
                    setAddress1={editSetAddress1}
                    address2={editAddress2}
                    setAddress2={editSetAddress2}
                    name={editName}
                    setName={editSetName}
                    mobile={editMobile}
                    setMobile={editSetMobile}
                    maritalStatus={editMaritalStatus}
                    setMaritalStatus={editSetMaritalStatus}
                    stateId={editStateId}
                    setStateId={editSetStateId}
                    handleStateChange={handleStateChange}
                    gender={editGender}
                    setGender={editSetGender}
                    cityId={editCityId}
                    setCityId={editSetCityId}
                    stateOptions={stateOptions}
                    cityOptions={cityOptions}
                    isActive={editIsActive}
                    setIsActive={editSetIsActive}
                    handleActiveChange={handleEditActiveChange}
                    handleSave={handleSave}
                    handleUpdate={handleUpdate}
                    isEmailValid={isEmailValid}
                    isNameValid={isNameValid}
                    isMobileValid={isMobileValid}
                />
                :
                <div></div>
                )
            }
            <table >
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
                                        <button className="styled-button" onClick={()=>{handleStateChange(item.stateId); handleEdit(item.id);}}>Edit</button> &nbsp;
                                    </td>
                                </tr>   
                            )
                        })
                        :
                        "No records"
                }
                </tbody>
            </table>
        </Fragment>
    )
}

export default Home;
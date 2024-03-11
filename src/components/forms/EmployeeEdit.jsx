import { useEffect, useState } from "react"
import "./Form.css"
import { getEmployeeByUserId, updateEmployee } from "../../services/EmployeeServices"
import { useNavigate } from "react-router-dom"



export const EmployeeForm = ({ currentUser }) => {

    const [employee, setEmployee] = useState({})

    const navigate = useNavigate()
    // apparently, useNavigate won't do what we want if we don't do this. Not explained further.


    // what this useEffect and its siblings in other modules does is that it gets the right data - using the id
    // that was drilled in with currentUser - and turns an array of one object into a more usable form and passes
    // it into state so that it can be used to show the existing information for that user.
    useEffect(() => {
        getEmployeeByUserId(currentUser.id).then(data => {
            const employeeObject = data[0]
            setEmployee(employeeObject)
        })
    }, [currentUser])

    const handleSave = (event) => {
        event.preventDefault()
        console.log("clicked")

        // we make a new variable rather than simply passing state because state is embedded with employeeTickets
        // and user, and passing all that to the database would create a big mess.
        const editedEmployee = {
            id: employee.id,
            specialty: employee.specialty,
            rate: employee.rate,
            userId: employee.userId,
        }
        updateEmployee(editedEmployee).then(() => {
            navigate(`/staff/${currentUser.id}`)
        })
    }

    const handleInputChange = (event) => {
        const stateCopy = { ...employee }
        stateCopy[event.target.name] = event.target.value
        setEmployee(stateCopy)
      }


    return (
        <form className="profile">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Speciality</label>
                    < input 
                        type="text"
                        name="specialty"
                        required
                        className="form-control"
                        value={employee.specialty ? employee.specialty : ""}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Hourly Rate</label>
                    < input 
                        type="number"
                        name="rate"
                        required
                        className="form-control"
                        value={employee.rate ? employee.rate : 0}
                        // because employee.rate is a truthy statement, this will prevent the "uncontrolled input"
                        // warning and presumably allow the page to load in edge cases.
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="form-btn btn-primary" onClick={handleSave}>Save Profile</button>
                </div>
            </fieldset>
        </form>
    )
}
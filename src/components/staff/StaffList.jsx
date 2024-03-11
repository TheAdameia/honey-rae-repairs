import { useEffect } from "react"
import { useState } from "react"
import { getStaffUsers } from "../../services/userService.jsx"
import { User } from "../../users/User"
import "./Staff.css"
import { Link } from "react-router-dom"


export const StaffList = () => {
    const [staff, setStaff] = useState([])

    useEffect(() => {
        getStaffUsers().then((staffArray) => {
            setStaff(staffArray)
        })
    }, [])

    return <div className="employee">
        {staff.map((staffObject) => {
            return(
                <Link to={`/staff/${staffObject.id}`} key={staffObject.id}>
                    <User user={staffObject} key={staffObject.id}/>
                </Link> 
            ) 
        })}
    </div>
}
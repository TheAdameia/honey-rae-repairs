import { useEffect } from "react"
import { useState } from "react"
import { getStaffUsers } from "../../services/userService"
import { User } from "../../users/User"


export const StaffList = () => {
    const [staff, setStaff] = useState([])

    useEffect(() => {
        getStaffUsers().then((staffArray) => {
            setStaff(staffArray)
        })
    }, [])

    return <div className="staff">
        {staff.map((staffObject) => {
            return <User user={staffObject} key={staffObject.id}/>
        })}
    </div>
}
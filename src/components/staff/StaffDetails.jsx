import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllEmployees } from "../../services/EmployeeServices"
import "./Staff.css"


export const StaffDetails = () => {
    const [staff, setStaff] = useState({})
    const { staffId } = useParams()


    useEffect(() => {
        getAllEmployees(staffId).then((data) => {
            const staffObject = data[0]
            setStaff(staffObject)
        })
    }, [staffId])

    return (
        <section className="employee">
            <header className="employee-header">{staff.user?.fullName}</header>
            <div>
                <span className="employee-info">Email : </span>
                {staff.user?.email}
            </div>
            <div>
                <span className="employee-info">Specialty : </span>
                {staff.specialty}
            </div>
            <div>
                <span className="employee-info">Hourly Rate : </span>
                {staff.rate}
            </div>
        </section>
    )
}
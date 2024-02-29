import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/EmployeeServices"

export const Ticket = ({ ticket }) => {
    // ALTERNATIVELY, this can be ({ ticket }) and can remove the props, as this function is only going to be
    // run for tickets anyways
    // multiples: ({ thing1, thing2, thing3, ... })
    // alternatively, this can be (props) and then props.whatever.key when things are called if you are passing in
    // different things at different times

    const [employees, setEmployees] = useState([])
    const [assignedEmployee, setAssignedEmployee] = useState({})

    const setAllEmployeesState = () => {
        getAllEmployees().then(employeesArray => {
            setEmployees(employeesArray)
            console.log("Employee list set")
        })
    }

    useEffect(() => {
        setAllEmployeesState()
    }, [])

    useEffect(() => {
        const foundEmployee = employees.find(employee => employee.id === ticket.employeeTickets[0]?.employeeId)
        setAssignedEmployee(foundEmployee)
    }, [employees])

    return (
    <section className="ticket">
        <header className="ticket-info">#{ticket.id}</header>
        <div>{ticket.description}</div>
        <footer>
            <div>
                <div className="ticket-info">assignee</div>
                <div>{assignedEmployee ? assignedEmployee.user?.fullName : "None"}</div>
            </div>
            <div>
                <div className="ticket-info">emergency</div>
                <div>{ticket.emergency ? "yes" : "no"}</div>
            </div>
        </footer>
    </section>
    )
}
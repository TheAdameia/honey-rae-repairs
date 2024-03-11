import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/EmployeeServices"
import { assignTicket, deleteTicket, updateTicket } from "../../services/ticketService.js"


export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => {
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
    }, [employees, ticket])

    const handleClaim = () => {
        const currentEmployee = employees.find(employee => employee.userId === currentUser.id)

        const newEmployeeTicket = {
            employeeId: currentEmployee.id,
            serviceTicketId: ticket.id,
        }

        assignTicket(newEmployeeTicket).then(() => {
            getAndSetTickets()
        })
    }

    const handleClose = () => {
        const closedTicket = {
            id: ticket.id,
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date
        }

        updateTicket(closedTicket).then(() => {
            getAndSetTickets()
        })
    }

    const handleDelete = () => {
        deleteTicket(ticket.id).then(() => {
            getAndSetTickets()
        })
    }



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
            <div className="btn-container">
                {/* if the logged in user is an employee and no employee has claimed the ticket, then a button
                appears so that the employee can claim it. For the second button, if the logged in user is the
                assigned employee, then a button appears to close the ticket. */}
                {currentUser.isStaff && !assignedEmployee ? (<button className="btn btn-secondary" onClick={handleClaim}>
                    Claim
                    </button>) : ( "" )}

                {assignedEmployee?.userId === currentUser.id && !ticket.dateCompleted ? (<button className="btn btn-warning"
                onClick={handleClose}>
                    Close
                </button>) : ("")}
                {currentUser.isStaff ? "" : (<button className="btn btn-warning" onClick={handleDelete}>Delete Ticket</button>)}
                {/* Alternatively, this could have been phrased "!currentUser.staff ? (btn...) */}
            </div>
        </footer>
    </section>
    )
}
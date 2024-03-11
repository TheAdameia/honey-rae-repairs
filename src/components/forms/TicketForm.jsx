import { useState } from "react"
import "./Form.css"
import { postNewTicket } from "../../services/ticketService"
import { useNavigate } from "react-router-dom"

export const TicketForm = ({ currentUser }) => {
    const [ticket, setTicket] = useState({ description: "", emergency: false})
    // the default object is given an emergency value of false because if the user does not check the box at all,
    // the "emergency" key would not be created in state

    const navigate = useNavigate()

    const handleSave = (event) => {
        event.preventDefault()
        if (ticket.description) {
            const newTicket = {
                userId: currentUser.id,
                description: ticket.description,
                emergency: ticket.emergency,
                dateCompleted: ""
            }
            postNewTicket(newTicket).then(() => {
                navigate("/tickets")
            })
        } else {
            window.alert("No description entered")
        }
    }
    return (
        <form>
            <h2>New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Brief description of issue"
                        onChange={(event) => {
                            const ticketCopy = {...ticket}
                            ticketCopy.description = event.target.value
                            setTicket(ticketCopy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Emergency: <input
                        type="checkbox"
                        onChange={(event) => {
                            const ticketCopy = {...ticket}
                            ticketCopy.emergency = event.target.checked
                            setTicket(ticketCopy)
                        }}
                    /></label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="form-btn btn-info" onClick={handleSave}>Submit Ticket</button>
                </div>
            </fieldset>
        </form>
    )
}
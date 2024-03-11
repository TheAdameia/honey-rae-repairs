import { useNavigate } from "react-router-dom"


export const RenderButtons = ({ setShowEmergencyOnly, setSearchTerm, currentUser, setShowOpenOnly }) => {
    const navigate = useNavigate()

    return (
        <div className="filter-bar">
            {currentUser.isStaff ? 
            <>
                <button 
                    className="filter-btn btn-primary" 
                    onClick={() => {
                        setShowEmergencyOnly(true)
                    }}
                >Emergency</button>
                <button 
                    className="filter-btn btn-secondary" 
                    onClick={() => {
                        setShowEmergencyOnly(false)
                    }}
                >Show Everything</button>
                <input type="text"
                    onChange={(event) => {setSearchTerm(event.target.value)}}
                    placeholder="Search Tickets"
                    className="ticket-search"
                />
            </> : 
            <>
                <button className="filter-btn btn-primary" onClick={() => { navigate("/tickets/create")}}>Create Ticket</button>
                <button className="filter-btn btn-info" onClick={() => {setShowOpenOnly(true)}}>Open Tickets</button>
                <button className="filter-btn btn-secondary" onClick={() => {setShowOpenOnly(false)}}>Show All My Tickets</button>
            </>}
            
        </div>
    )
}
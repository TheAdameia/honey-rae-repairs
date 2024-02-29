export const RenderButtons = ({ setShowEmergencyOnly, setSearchTerm }) => {
    return (
        <div className="filter-bar">
        <button className="filter-btn btn-primary" onClick={() => {setShowEmergencyOnly(true)}}>Emergency</button>
        <button className="filter-btn btn-secondary" onClick={() => {setShowEmergencyOnly(false)}}>Show Everything</button>
        <input type="text"
            onChange={(event) => {setSearchTerm(event.target.value)}}
            placeholder="Search Tickets"
            className="ticket-search"/>
        </div>
    )
}
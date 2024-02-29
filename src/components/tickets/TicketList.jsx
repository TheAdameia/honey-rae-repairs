import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.js"
import { Ticket } from "./ticket.jsx"
import "./tickets.css"
import { RenderButtons } from "./RenderButtons.jsx"


export const TicketList = () => {
  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
  useEffect(() => {
    getAllTickets().then(ticketsArray => {
      setAllTickets(ticketsArray)
      console.log("tickets set")
    })
  }, []) 

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
      setFilteredTickets(emergencyTickets)
    }
    else (
      setFilteredTickets(allTickets)
    )
  }, [showEmergencyOnly, allTickets]) 

  useEffect(() => {
    const foundTickets = allTickets.filter(ticket => ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredTickets(foundTickets)
  }, [searchTerm, allTickets])

  return (<div className="tickets-container">
    <h2>Tickets</h2>
    <RenderButtons setShowEmergencyOnly={setShowEmergencyOnly} setSearchTerm={setSearchTerm}/>
    <article className="tickets">
      {filteredTickets.map((ticketObject) => {
        return (
         <Ticket ticket={ticketObject} key={ticketObject.id}/>
        )
      })}
    </article>
  </div>
  )
}
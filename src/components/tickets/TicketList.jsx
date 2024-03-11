import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.js"
import { Ticket } from "./ticket.jsx"
import "./tickets.css"
import { RenderButtons } from "./RenderButtons.jsx"


export const TicketList = ({ currentUser }) => {
  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showOpenOnly, setShowOpenOnly] = useState(false)
  
  const getAndSetTickets = () => {
    getAllTickets().then(ticketsArray => {
      if (currentUser.isStaff) {
        setAllTickets(ticketsArray)
      }
      else {
        const customerTickets = ticketsArray.filter(ticket => ticket.userId === currentUser.id)
        setAllTickets(customerTickets)
      }
    })
  } // this was modified to include the ifelse statement for the customer's view of tickets

  useEffect(() => {
    getAndSetTickets()
  }, [currentUser]); {/* currentUser was added as a trigger condition here due to this function
  triggering when currentUser is an empty (default) object as defined in the state in ApplicationViews.
  But when does currentUser change again for this function to trigger? Well, apparently, somehow
  ApplicationViews runs after everything is rendered. But why? It turns out that in ApplicationViews,
  currentUser is defined after a value is pulled out of "local storage". After it does, the entirety
  of the route chain renders a second time. But with no trigger condition, useEffect functions that 
  have already ran won't run again, as they only run on the INITIAL render. 

  I really hope I understand that properly because that is a lot of things to think about.*/}
                  

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

  useEffect(() => {
    if (showOpenOnly) {
      const openTickets = allTickets.filter(ticket => ticket.dateCompleted === "")
      setFilteredTickets(openTickets)
    } else {
      setFilteredTickets(allTickets)
    }
  }, [showOpenOnly, allTickets])

  return (<div className="tickets-container">
    <h2>Tickets</h2>
    <RenderButtons 
      setShowEmergencyOnly={setShowEmergencyOnly} 
      setSearchTerm={setSearchTerm}
      currentUser={currentUser}
      setShowOpenOnly={setShowOpenOnly}
    />
    <article className="tickets">
      {filteredTickets.map((ticketObject) => {
        return (
          <Ticket 
            ticket={ticketObject} 
            key={ticketObject.id}
            currentUser={currentUser}
            getAndSetTickets={getAndSetTickets}
          />
        )
      })}
    </article>
  </div>
  )
}
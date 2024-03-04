import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/userService"
import { User } from "../../users/User"
import { Link } from "react-router-dom"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
   
    useEffect(() => {
        getNonStaffUsers().then((customerArray) => {
            setCustomers(customerArray)
        })
    }, [])

    return <div className="customers">
        {customers.map((customerObject) => {
            return (
                    <Link to={`/customers/${customerObject.id}`} key={customerObject.id}>
                        <User user={customerObject} key={customerObject.id}/>
                    </Link>
                )
        })}
    </div>
}
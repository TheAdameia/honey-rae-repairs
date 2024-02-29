import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/userService"
import { User } from "../../users/User"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
   
    useEffect(() => {
        getNonStaffUsers().then((customerArray) => {
            setCustomers(customerArray)
        })
    }, [])

    return <div className="customers">
        {customers.map((customerObject) => {
            return <User user={customerObject} key={customerObject.id}/>
        })}
    </div>
}
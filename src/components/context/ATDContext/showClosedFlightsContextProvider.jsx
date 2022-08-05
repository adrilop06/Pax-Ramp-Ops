import { useState } from "react";
import {SelectATDContext} from "../ATDContext/showClosedFlightsContext";

function ATDSelectProvider({ value, children }) {
    const [showFlights, setShowFlights] = useState(value);
    return (

        <SelectATDContext.Provider value={[showFlights, setShowFlights]}>
            {children}
        </SelectATDContext.Provider>
    )

}


export default ATDSelectProvider;
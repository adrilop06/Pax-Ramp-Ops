import { useState } from "react";
import {SelectPaxContext} from "../selectContext/pageContext";

function PagePaxSelectedProvider({ value, children }) {
    const [currentPax, setCurrentPax] = useState(value);
    return (

        <SelectPaxContext.Provider value={[currentPax, setCurrentPax]}>
            {children}
        </SelectPaxContext.Provider>
    )

}


export default PagePaxSelectedProvider;
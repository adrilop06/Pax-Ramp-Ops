import {
  Fragment,
  useState,
  useEffect,
  useContext
}
  from 'react';

import $ from 'jquery';
import '../container-cards/stylesCont.css'
import IndexFact from '../fact-list/indexFact';
import IndexCardsRamp from '../ramp-list/indexRamp';
import IndexCardsBoard from '../cards-list/idexCards';
import { SelectPaxContext } from '../context/selectContext/pageContext';
import { Oval } from 'react-loader-spinner'

export default function Container() {

  const [flights, setFlights] = useState([]);
  const APT = sessionStorage.getItem("Base");
  const Fecha = sessionStorage.getItem("Fecha");
  const [isLoading, setIsLoading] = useState(true);

  const fetchFlights = async () => {
    setIsLoading(true);
    try {
      const flightsData = await $.ajax({
        url: "https://gops.azulhandling.com/Pacotron/procesos/listVuelos.php",
        type: 'POST',
        data: {
          APT,
          Fecha,
        }
      })
      setFlights(JSON.parse(flightsData));
    } catch (err) {
      console.log("HOLA HOLA")
    }
    setIsLoading(false);
    console.log(isLoading, "isLoading 1")
  };




  useEffect(() => {
    fetchFlights();
    
    

    /*
    const interval = setInterval(() => {
    fetchFlights()
    }, 1000);
     return () => interval
*/
  }, []);


  function fetchOnClick() {
    fetchFlights();
    fetchFlights();
  }

  function toLocal(dateProp) {
    let date = new Date(`${dateProp} UTC`);
    let date2 = date.toString();
    let date3 = date2.slice(16, 21);
    return date3;
  }



  const userType = sessionStorage.getItem("TipoUser");
  const [selectPax, updateSelectPax] = useContext(SelectPaxContext);


  function userData() {
    if (userType === "15") {
      return flights?.map(f => <IndexCardsRamp data={f} key={f.index} fetchOnClick={fetchOnClick} toLocal={toLocal} ></IndexCardsRamp>)
    } else if (userType === "14" && selectPax === "IndexBoard") {
      return flights?.map(f => <IndexCardsBoard data={f} key={f.index} fetchOnClick={fetchOnClick} toLocal={toLocal}></IndexCardsBoard>)
    } else if (userType === "14" && selectPax === "IndexFact") {
      return flights?.map(f => <IndexFact data={f} key={f.index} fetchFlights={fetchFlights} toLocal={toLocal}></IndexFact>)
    } else {
      console.log("falla")
    }
  }

  console.log(flights, "Flights");

  return (
    <div className="index_content">
    {isLoading == true ?
      <div className="div_spinner">

        <Oval
          height="200"
          width="200"
          radius="9"
          color='orange'
          ariaLabel='three-dots-loading'
          wrapperStyle
          wrapperClass />
      </div>
      :
    <Fragment>

        <div className="div_general-cards">
          {userData()}
        </div>
    
    </Fragment>
  }
  </div>
  );
}





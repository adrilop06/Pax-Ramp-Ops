import {
    Fragment, useContext
} from "react";
import $ from "jquery";
import './rampStyles.css';
import '../cards-list/styleCards.css';
import { SelectATDContext } from '../context/ATDContext/showClosedFlightsContext';


export default function IndexCardsRamp(props) {
    sessionStorage.setItem("Cierra CKIN", props.data.finFact);

    const CambioClase = () => {
        const ADA = props.data.ADA;
        const APT = sessionStorage.getItem("Base");
        const Fecha = sessionStorage.getItem("Fecha");
        const FLNO = props.data.Al + props.data.FlNoOut;
        const FLNI = props.data.Al + props.data.FlNoIn;
        const date = new Date()
        const rampUser = sessionStorage.getItem("username");
        const rampClose = date.getUTCFullYear()
            + "-" + (date.getUTCMonth() + 1)
            + "-" + date.getUTCDate()
            + " " + date.getUTCHours()
            + ":" + date.getUTCMinutes()
            + ":" + date.getUTCSeconds();
        const BagRamp = props.data.BagRamp;
        const BagPax = props.data.BagPax;
        const newButton = ADA === null ? "a_button-visible" : "a_button-hidden";
     /* const info = ""; */

        function setClases() {
            if (BagPax !== "0" && BagPax === BagRamp) {
                return "button_open_green";
            } else if (BagPax !== BagRamp && BagRamp !== "0") {
                return "button_open_red";
            } else if (BagPax === "0" && BagRamp === "0") {
                return "button_open";
            } else if (BagPax !== "0" && BagRamp === "0") {
                return "button_open_orange";
            } else {
                console.log("Error en la clase")
            }
        };

        const sendDataClose = async () => {
            try {
                const sentBoardData = await $.ajax({
                    url: "https://gops.azulhandling.com/Pacotron/procesos/updateHours.php",
                    type: 'POST',
                    data: {
                        Fecha,
                        FLNI,
                        APT,
                        FLNO,
                        rampUser,
                        rampClose,
                        BagPax,
                        BagRamp
                        //info
                    }
                })
                console.log(sentBoardData, "Soy sentBoardData close")
            } catch (err) {
                console.log("Da error")
            }
        };

        function SendDateAndUserClose() {
            sessionStorage.setItem("FlNoOut", FLNO);
            sessionStorage.setItem("FlNoIn", FLNI);
        };

        function buttonActive(){
            if (BagPax === "0" || BagPax === null) {
                return true;
            }
        }


        return (
            <Fragment>
            {ADA === null
                ? (<div className={setClases()}>
                    {(BagPax === "0" || BagPax === null) 
                        ? 
                        <button  onClick={() => {
                            SendDateAndUserClose();
                            sendDataClose();
                        }} id="button"  disabled={buttonActive()}>
                            AWAITING INFO
                        </button>
                        : 
                        <a 
                        id={(props.data.Al + props.data.FlNoOut)}
                    
                        href={
                            Link(props.toLocal(props.data.gateClosure))
                        }
                        >   
                        <button  onClick={() => {
                            SendDateAndUserClose();
                            sendDataClose();
                        }} id="button"  disabled={buttonActive()}>
                            ADD BAGGAGE
                        </button>
                            </a>
                        }
                    
                </div>)
                : <div className={setClases()}>
                    <p className="p_flightClosed">FLIGHT CLOSED - CKIN: {props.data.BagPax} / BHALL:  {props.data.BagRamp}</p>
                </div>}
        </Fragment>
        )
    };

    let tipoUser = parseInt(sessionStorage.getItem("TipoUser"))
    const linkRamp = "https://gops.azulhandling.com/Pacotron/ramp_mockUp.html"
    const linkLogin = "https://gops.azulhandling.com/Login/"

    function Link(CCKING) {
        if (tipoUser === 15) {
            return linkRamp + "?CCKING=" + CCKING
        } else {
            return linkLogin
        }
    };

    const [selectATDFligts, setSelectATDFlights] = useContext(SelectATDContext);


    return (
        <Fragment>
        {(props.data.ADA === null) ? (
            <div className="div_container">
                <div className="div_container-superior">
                    <p id="FN">{props.data.Al}{props.data.FlNoOut}</p>
                    <p>{props.data.DestOut}</p>
                    <p id="STD">STD</p>
                    <p>{props.toLocal(props.data.STDOut)}</p>
                </div>
                <div className="div_container-inferior_fact">
                    <div className='ckin_container_abre'>
                        <h5>CHECK-IN Opens</h5>
                        <p>{props.toLocal(props.data.inicioFact)}</p>
                    </div>
                    <div className='ckin_container_cierra'>
                        <h5>CHECK-IN Closes</h5>
                        <p>{props.toLocal(props.data.finFact)}</p>
                    </div>
                </div>
                <CambioClase />
            </div> ) 
            : (props.data.ADA !== null && selectATDFligts === true ) 
            ? (<div className="div_container">
                <div className="div_container-superior">
                    <p id="FN">{props.data.Al}{props.data.FlNoOut}</p>
                    <p>{props.data.DestOut}</p>
                    <p id="STD">STD</p>
                    <p>{props.toLocal(props.data.STDOut)}</p>
                </div>
                <div className="div_container-inferior_fact">
                    <div className='ckin_container_abre'>
                        <h5>CHECK-IN Opens</h5>
                        <p>{props.toLocal(props.data.inicioFact)}</p>
                    </div>
                    <div className='ckin_container_cierra'>
                        <h5>CHECK-IN Closes</h5>
                        <p>{props.toLocal(props.data.finFact)}</p>
                    </div>
                </div>
                <CambioClase />
            </div> ) 
            : console.log("Error")}
        </Fragment>
    );
};
import {
    Fragment,
    useContext,
    useEffect,
}
    from "react";
import $ from "jquery";
import '../cards-list/styleCards.css';
import { SelectATDContext } from '../context/ATDContext/showClosedFlightsContext';

export default function IndexCardsFact(props) {

    sessionStorage.setItem("Cierra CKIN", props.data.finFact);

    const CambioClase = () => {
        const ADA = props.data.ADA;
        const APT = sessionStorage.getItem("Base");
        const Fecha = sessionStorage.getItem("Fecha");
        const FLNO = props.data.Al + props.data.FlNoOut;
        const FLNI = props.data.Al + props.data.FlNoIn;
        const date = new Date()
        const checkUser = sessionStorage.getItem("username");
        const checkClose = date.getUTCFullYear()
            + "-" + (date.getUTCMonth() + 1)
            + "-" + date.getUTCDate()
            + " " + date.getUTCHours()
            + ":" + date.getUTCMinutes()
            + ":" + date.getUTCSeconds();
        const checkOpen = Fecha
            + " " + date.getUTCHours()
            + ":" + date.getUTCMinutes()
            + ":" + date.getUTCSeconds();
        /*         const isOpen = props.data.checkOpen; */
        const isClose = props.data.checkClose;
        const BagPax = props.data.BagPax;
        const BagRamp = props.data.BagRamp;
        /*         const TOB = props.data.TOB;
                const info = ""; // lo usamos para ver qué info nos llega del fetch */

        function sumHours() {
            let STDHora = new Date(props.data.STDOut).getHours();
            let actualDate = new Date().getHours();
            let sum = parseInt(STDHora) - parseInt(actualDate);
            return sum;
        }

        function setClasesFact() {
            if ((BagPax === BagRamp) && (BagPax !== "0" && BagRamp !== "0")) {
                return "button_open_green";
            } else if ((sumHours() <= 2) && (isClose === null)) {
                return "button_open_orange";
            } else if ((sumHours() > 2) && (isClose === null || isClose === 0)) {
                return "button_open";
            } else if ((BagPax !== "0" || BagPax !== null) && (BagRamp === "0" || BagRamp === null)) {
                return "button_open_yellow";
            } else if ((BagPax !== BagRamp) && (BagRamp !== "0" || BagRamp !== null)) {
                return "button_open_red";
            } else {
                console.log("Todo mal")
            }
        };

        function setNewButton() {
            if (sumHours() > 2) {
                return "a_button-hidden"
            } else if (sumHours() <= 2) {
                return "a_button-visible"
            } else {
                console.log("setNewButton: Todo mal")
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
                        checkUser,
                        checkClose,
                        checkOpen
                        //info
                    }
                })
                console.log(sentBoardData, "Soy sentBoardData close")
            } catch (err) {
                console.log("Da error")
            }
        };

        /*   useEffect(() => {
                const interval = setInterval(() => {
                    props.fetchFlights();
                }, 10000);
                return ()=> interval 
    
            }, []); */

        function SendDateAndUserClose() {
            sessionStorage.setItem("boardClose", checkClose);
            sessionStorage.setItem("FlNoOut", FLNO);
            sessionStorage.setItem("FlNoIn", FLNI);
        };

        return (
            <Fragment>
                {ADA === null
                    ? (<div className={setClasesFact()}>
                        <a id={(props.data.Al + props.data.FlNoOut)}
                            href={
                                Link(props.data.gateClosure)}
                            className={setNewButton()}>
                            <button onClick={() => {
                                SendDateAndUserClose();
                                sendDataClose();
                            }} id="button">CLOSE FLIGHT</button>
                        </a>
                    </div>)
                    : <div className={setClasesFact()}>
                        <p className="p_flightClosed">FLIGHT CLOSED</p>
                    </div>}
            </Fragment>
        )
    };

    let tipoUser = parseInt(sessionStorage.getItem("TipoUser"))
    const linkPax = "https://gops.azulhandling.com/Pacotron/paxCKIN.html"
    const linkRamp = "https://gops.azulhandling.com/Pacotron/ramp_mockUp.html"
    const linkLogin = "https://gops.azulhandling.com/Login/"

    function Link(CCKING) {
        if (tipoUser === 14) {
            return linkPax + "?CCKING=" + CCKING
        } else if (tipoUser === 15) {
            return linkRamp + "?CCKING=" + CCKING
        } else {
            return linkLogin
        }
    };

    const [selectATDFligts, setSelectATDFlights] = useContext(SelectATDContext);


    return (
        <Fragment>
            {(props.data.ADA === null)
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
                </div>)
                : (props.data.ADA !== null && selectATDFligts === true)
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
                    </div>)
                    : console.log("Vuelos cerrados")
            }
        </Fragment>
    );
};
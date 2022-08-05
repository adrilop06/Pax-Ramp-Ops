import {
    Fragment,
    useContext
}
    from 'react';
import $ from "jquery";
import '../cards-list/styleCards.css';
import { SelectATDContext } from '../context/ATDContext/showClosedFlightsContext';

export default function IndexCardsBoard(props) {

    const CambioClase = () => {
        const Fecha = sessionStorage.getItem("Fecha");
        const ADA = props.data.ADA;
        const isOpen = props.data.FirstScan;
        const isClose = props.data.boardClose;
        const tipoUser = parseInt(sessionStorage.getItem("TipoUser"))
        const APT = sessionStorage.getItem("Base");
        const FLNO = props.data.Al + props.data.FlNoOut;
        const FLNI = props.data.Al + props.data.FlNoIn;
        const date = new Date()
        const boardUser = sessionStorage.getItem("username");
        const boardClose = date.getUTCFullYear()
            + "-" + (date.getUTCMonth() + 1)
            + "-" + date.getUTCDate()
            + " " + date.getUTCHours()
            + ":" + date.getUTCMinutes()
            + ":" + date.getUTCSeconds();
        const FirstScan = Fecha
            + " " + date.getUTCHours()
            + ":" + date.getUTCMinutes()
            + ":" + date.getUTCSeconds();
        const TOB = props.data.TOB;
        const linkPax = "https://gops.azulhandling.com/Pacotron/pax_mockUp.html"
        const linkLogin = "https://gops.azulhandling.com/Login/"
        /*         const info = ""; // lo usamos para ver qué info nos llega del fetch */

        function setClases() {
            if (isOpen !== null && isClose !== null) {
                return "button_open_green";
            } else if (isOpen !== null && isClose === null) {
                return "button_open_orange";
            } else if ((isOpen === null || isOpen === 0) && (isClose === null || isClose === 0)) {
                return "button_open";
            } else {
                console.log("Todo mal")
            }
        };

        // Esta función calcula la diferencia horaria para abrir o no el vuelo


        function sumHours() {
            let STDHora = new Date(props.data.STDOut).getHours();
            let actualDate = new Date().getHours();
            let sum = parseInt(STDHora) - parseInt(actualDate);
            return sum;
        }

        // Esta función genera el botón de Close Flight, tiene que cambiar y generarlo a -2h del STD


        function setNewButton() {
            if (isOpen === null) {
                return "a_button-hidden"
            } else if (isOpen !== null && isClose === null) {
                return "a_button-visible"
            } else if (isOpen !== null && isClose !== null) {
                return "a_button-hidden"
            } else {
                console.log("setNewButton: Todo mal")
            }
        };

        function setButtonId() {
            if (isOpen === null) {
                return "button"
            } else if (isOpen !== null && isClose === null) {
                return "button_cancel"
            } else if (isOpen !== null && isClose !== null) {
                return "button"
            } else {
                console.log("setButtonId: Todo mal")
            }
        };


        // Difenrencia entre botón de apertura o reapertura del vuelo, cambia el texto interno.


        function setOpen() {
            if (isOpen != null && isClose != null) {
                return "REOPEN FLIGHT";
            } else {
                return "OPEN FLIGHT"
            }
        };

        // Esconde o muestra el botón de Cancel usando CSS

        function setVisible() {
            if (isOpen === null) {
                return "cancel_hidden"
            } else if (isOpen !== null && isClose !== null) {
                return "cancel_hidden"
            } else if (isOpen !== null && isClose === null) {
                return "cancel_visible"
            } else {
                console.log("setVisible: Todo mal")
            }
        };

    
        

        const sendDataOpen = async () => {
            try {
                const sentBoardData = await $.ajax({
                    url: "https://gops.azulhandling.com/Pacotron/procesos/updateHours.php",
                    type: 'POST',
                    data: {
                        Fecha,
                        FLNI,
                        APT,
                        FLNO,
                        boardUser,
                        FirstScan,
                        //info
                    }
                })
                console.log(sentBoardData, "Soy sentBoardData en sendDataOpen")
            } catch (err) {
                console.log("Da error")
            }
            sessionStorage.setItem("boardOpen", FirstScan);
            sessionStorage.setItem("FlNoOut", FLNO);
            sessionStorage.setItem("FlNoIn", FLNI);
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
                        boardUser,
                        boardClose,
                        FirstScan
                        //info
                    }
                })
                console.log(sentBoardData, "Soy sentBoardData close")
            } catch (err) {
                console.log("Da error")
            }
        };

        const eraseBoardOpen = async () => {
            let FirstScan = null;
            let boardClose = null;
            try {
                const eraseBoardData = await $.ajax({
                    url: "https://gops.azulhandling.com/Pacotron/procesos/updateHours.php",
                    type: 'POST',
                    data: {
                        Fecha,
                        FLNI,
                        APT,
                        FLNO,
                        boardUser,
                        FirstScan,
                        boardClose
                        //info
                    }
                })
                console.log(eraseBoardData, "Soy eraseBoardData")
            } catch (err) {
                console.log("Da error")
            }
        };

        const SendDateAndUserClose = () => {
            sessionStorage.setItem("boardClose", boardClose);
            sessionStorage.setItem("FlNoOut", FLNO);
            sessionStorage.setItem("FlNoIn", FLNI);
        };

        function Link(gateClosure) {
            if (tipoUser === 14) {
                return linkPax + "?gateClosure=" + gateClosure
            } else {
                return linkLogin
            }
        };

        console.log(sumHours(), "sumHours");

        return (
            <Fragment>
                {ADA === null
                    ? (<div className={setClases()}>
                        <button onClick={() => {
                            sendDataOpen();
                            props.fetchOnClick();
                        }}
                            id={setButtonId()}>{setOpen()}</button>
                        <button className={setVisible()}
                            onClick={() => {
                                eraseBoardOpen();
                                props.fetchOnClick()
                            }}>
                            CANCEL
                        </button>
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
                    : (<div className={setClases()}>
                        <p className="p_flightClosed">FLIGHT CLOSED TOB  {TOB}</p>
                    </div>)}
            </Fragment>
        )
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
                    <div className="div_container-inferior_board">
                        <div className='container_board'>
                            <h5>GATE</h5>
                            <p>{
                                props.data.Gate === null
                                    ? "--"
                                    : props.data.Gate
                            }</p>
                        </div>
                        <div className='ckin_container_abre'>
                            <h5>ASM CALL</h5>
                            <p>{props.toLocal(props.data.asmCall)}</p>
                        </div>
                        <div className='ckin_container_cierra'>
                            <h5>GATE CLOSURE</h5>
                            <p>{props.toLocal(props.data.gateClosure)}</p>
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
                        <div className="div_container-inferior_board">
                            <div className='container_board'>
                                <h5>GATE</h5>
                                <p>{
                                    props.data.Gate === null
                                        ? "--"
                                        : props.data.Gate
                                }</p>
                            </div>
                            <div className='ckin_container_abre'>
                                <h5>ASM CALL</h5>
                                <p>{props.toLocal(props.data.asmCall)}</p>
                            </div>
                            <div className='ckin_container_cierra'>
                                <h5>GATE CLOSURE</h5>
                                <p>{props.toLocal(props.data.gateClosure)}</p>
                            </div>
                        </div>
                        <CambioClase />
                    </div>) 
                    : console.log("No hay vuelos")
            }
        </Fragment>
    );
};





/* Identificar los dif endpoints de llamada a backend
en que partes hago el fetch y que datos son valiosos
para implementar la lógica de botones */

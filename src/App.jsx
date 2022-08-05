import {
    React,
    Fragment,
    useContext,
    useEffect,
    useState
} from 'react';
import './App.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Container from './components/container-cards/indexCont';
import { select } from './components/context/selectContext/pageContext'
/* import { BoardingPage } from './components/boarding/indexBoard' */
import { SelectPaxContext } from "./components/context/selectContext/pageContext";
import PagePaxSelectedProvider from './components/context/selectContext/PageContexProvider';
import { selectATD, SelectATDContext } from './components/context/ATDContext/showClosedFlightsContext';
import ATDSelectProvider from './components/context/ATDContext/showClosedFlightsContextProvider';
import FooterInfo from "./components/footer/footerInfo"



function App() {

    function Header() {
        const user = sessionStorage.getItem("username");
        const APT = sessionStorage.getItem("Base");
        let tipouser = sessionStorage.getItem("TipoUser");
        const [currentPax, setCurrentPax] = useContext(SelectPaxContext)
        const [showFlights, setShowFlights] = useContext(SelectATDContext)

        function switchHeader() {
            if (tipouser === "14") {
                return "OPS - FOH"
            } else if (tipouser === "15") {
                return "OPS - BHALL"
            } else {
                return "FOH - BHALL OPS"
            }
        }

        function actual() {
            let fechaReloj = new Date(); //Actualizar fecha.
            let horaReloj = fechaReloj.getUTCHours(); //hora actual
            let minutoReloj = fechaReloj.getMinutes(); //minuto actual
            let segundosReloj = fechaReloj.getSeconds(); // segundos actuales
            let diaReloj = fechaReloj.getUTCDate(); //
            let mesReloj = fechaReloj.getUTCMonth() + 1; //
            let añoReloj = fechaReloj.getUTCFullYear(); //

            if (horaReloj < 10) { //dos cifras para la hora
                horaReloj = "0" + horaReloj;
            }
            if (minutoReloj < 10) { //dos cifras para el minuto
                minutoReloj = "0" + minutoReloj;
            }
            if(segundosReloj < 10){ // dosc cifras para los segundos
                segundosReloj = "0";
            }

            //devolver los datos:
            let mireloj = diaReloj + "/" + mesReloj + "/" + añoReloj + " " + horaReloj + ":" + minutoReloj + ":" + segundosReloj + "UTC ";
            return mireloj;
        }

        const [currentTime, setCurrentTime] = useState();

        function actualizar() { //función del temporizador
            setCurrentTime(actual()); //recoger hora actual
            return currentTime;
        }

        useEffect(() => {
            //iniciar temporizador
            
                const interval = setInterval(() => {
                actualizar()
                }, 1000);
                return () => interval
            

          }, []);
   

        function handleChange(value) {
            setCurrentPax(value)
        }

        function handleChangeATD(checked) {
            setShowFlights(checked)
        }


        return (
            <Fragment>
                <div className="header_container">
                    <div id="title_app">
                        <h1>
                            {switchHeader()}
                        </h1>
                        <p>{currentTime}</p>
                    </div>
                    <FormGroup>
                        <FormControlLabel control={
                        <Switch
                        onChange={event=>handleChangeATD(event.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                        size="small"
                        />} 
                        label="Show closed flights"
                        sx={{
                            marginTop: '-15px', 
                            marginLeft: '15px',
                            marginBottom: '-10px',
                            alignSelf: 'flex-start',
                            fontSize: '12px',
                            }}/>
                    </FormGroup>
                    {/*  <select name="ATD_select" onChange={event => handleChangeATD(event.target.value)}>
                        <option value="Show">Show</option>
                        <option value="Hide">Hide</option>
                    </select> */}
                    <div id="date_apt_container">
                        <h2 id="APT">{APT}</h2>
                        <p>{user}</p>{
                            tipouser === "14"
                                ? (<select name="select" onChange={event => handleChange(event.target.value)}>
                                    <option value="IndexFact">CHECK-IN</option>
                                    <option value="IndexBoard">BOARDING</option>
                                </select>)
                                : (<p></p>)}
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <ATDSelectProvider value={selectATD}>
                <PagePaxSelectedProvider value={select}>
                    <Header />
                    <Container />
                    <FooterInfo/>
                </PagePaxSelectedProvider>
            </ATDSelectProvider>
        </Fragment>
    );
}

export default App; 
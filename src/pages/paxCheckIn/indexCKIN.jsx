import { useState, useReducer } from 'react';
import {
    Input,
    Spacer,
    Container,
    Grid,
    Text,
    Row,
    Button
} from '@nextui-org/react';
import './styles.css';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

export default function Ckin() {

    const [formData, setFormData] = useReducer(formReducer, {});
    /*    const [checkedIn, setCheckedIn] = useState("");
       const [rush, setRush] = useState(""); */

    const handleSubmit = (e) => {

        alert('You have submitted the form.');
        ;
        e.preventDefault();
    }

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    console.log(formData);
    console.log(formData.checkedIn)

    return (
        <form className='ckin_form_style'
            onSubmit={e => { handleSubmit(e) }}>
            <Grid.Container
                css={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    width: '85vw',
                }}>
                <Grid css={{
                    width: '40vw',
                }}>
                    <Text h4
                        color='#F1C933'
                        size={30}
                        css={{
                            letterSpacing: '1px',
                            marginLeft: '17vw',
                        }}
                        weight='bold'
                    >BAGS</Text>
                    <Text h6
                        color='#ffffff'
                        size={10}
                        css={{
                            letterSpacing: '1px',
                            marginLeft: '13vw',
                            width: '35vw',
                        }}
                    >(Do not include ITG)</Text>
                    <Spacer y={0.5} />
                    <div className='div_inputs'>
                        <Input
                            css={{
                                boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)',
                            }}
                            size="lg"

                            rounded
                            status='primary'
                            labelLeft='CHECKED IN'
                            placeholder="0"
                            type="number"
                            name='checkedIn'
                            aria-label="ADULT"
                            width="200px"
                            onChange={handleChange}
                        />
                        <Spacer y={1} />
                        <Input
                            css={{ boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)', }}
                            width="200px"
                            size="lg"
                            rounded
                            status='primary'
                            labelLeft="RUSH"
                            placeholder="0"
                            type="number"
                            name='rush'
                            className='rush_input'
                            aria-label="CHILDREN"
                            onChange={handleChange} />
                    </div>
                </Grid>
            </Grid.Container>
            <Spacer y={1} />
            <div className='div_buttons'>
                <Container width='80vw'>
                    <Row gap={1}>
                        <Button
                            size="sm"
                            onPress={() => {
                                console.log("clicked");
                            }}
                            css={{
                                backgroundColor: '$red700',
                                color: '$white',
                                boxShadow: '0px 6px 5px -2px rgb(0 0 0 / 26%)',
                            }}>
                            BACK
                        </Button>
                        <Spacer x={0.4} />
                        <Button
                            size="sm"
                            type="submit"
                            css={{
                                backgroundColor: '$green800',
                                color: '$white',
                                boxShadow: '0px 6px 5px -2px rgb(0 0 0 / 26%)',
                            }}>
                            SEND
                        </Button>
                    </Row>
                </Container>
            </div>
        </form>
    );
}
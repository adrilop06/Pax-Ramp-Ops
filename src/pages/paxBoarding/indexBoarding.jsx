import { useState, useReducer } from 'react';
import $ from 'jquery';
import {
    Input,
    Spacer,
    Container,
    Grid,
    Text,
    Row,
    Textarea,
    Button
} from '@nextui-org/react';
import './stylesBoarding.css';
import { useEffect } from 'react';

const APT = sessionStorage.getItem("Base")
const Fecha = sessionStorage.getItem("Fecha")
const username = sessionStorage.getItem("username");
const FLNI = sessionStorage.getItem("FlNoIn");
const FLNO = sessionStorage.getItem("FlNoOut");

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

export default function Form() {

    const [formData, setFormData] = useReducer(formReducer, {});

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    useEffect(() => {
        $.ajax({
            url: 'procesos/updatePaxRamp.php',
            data: {
                APT,
                Fecha,
                FLNI,
                FLNO,
            },
            type: 'POST',
            success: function (response) {
                const dataPax = JSON.parse(response);
                console.log(dataPax, "soy dataPax");
            }
        });
    })

    const handleSubmit = (e) => {
        console.log(formData);
        e.preventDefault();
        /* $.ajax({
            url: 'procesos/updatePaxRamp.php',
            data: {
                APT,
                Fecha,
                username,
                FLNI,
                FLNO,
                adults,
                children,
                infants,
                ESeat,
                ESeatNumber,
                CONFS,
                CONFSeatNumber,
                PopFWD,
                PopMID,
                PopAFT,
                ITG,
                PBAG,
                GBAG,
                SIPax,
                //TOB
            },
            type: 'POST',
            success: function (response) {
                console.log(response, "soy response");
            }
        }); */
}

    return (
        <form className='form_styles'
            onSubmit={e => { handleSubmit(e) }}>
            <Grid.Container
                css={{
                    width: '100%',
                }}
                alignContent='center'
                justify='center'>
                <Grid css={{
                    width: '40vw',
                }}>
                    <Text h5
                        color='#ffffff'
                        size={20}
                        css={{
                            letterSpacing: '1px',
                        }}
                    >PASSENGERS</Text>
                    <Spacer y={0.2} />
                    <Input
                        css={{ boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)', }}
                        size="xs"
                        rounded
                        status='primary'
                        labelLeft='ADULT'
                        placeholder="0"
                        type="number"
                        name='adults'
                        aria-label="ADULT"
                        onChange={handleChange}
                        value={formData.adults}
                    />
                    <Spacer y={0.2} />
                    <Input
                        css={{ boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)', }}
                        size="xs"
                        rounded
                        status='primary'
                        labelLeft="CHILDREN"
                        placeholder="0"
                        type="number"
                        className='chlidren-input'
                        name='children'
                        aria-label="CHILDREN"
                        onChange={handleChange}
                        value={formData.children}
                    />
                    <Spacer y={0.2} />
                    <Input
                        css={{ boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)', }}
                        size="xs"
                        rounded
                        status='primary'
                        labelLeft="INFANT"
                        placeholder="0"
                        type="number"
                        name='infants'
                        aria-label="INFANT"
                        value={formData.infants}
                        onChange={handleChange}
                    />
                    <Spacer y={0.5} />
                </Grid>
                <Spacer x={1} />
                <Grid css={{
                    width: '40vw',
                }}>
                    <Text h4
                        color='#ffffff'
                        size={20}
                        css={{
                            letterSpacing: '1px',
                        }}
                    >ZONES</Text>
                    <Spacer y={0.2} />
                    <Input
                        css={{ boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)', }}
                        size="xs"
                        rounded
                        status='primary'
                        labelLeft="FWD"
                        placeholder="0"
                        type="number"
                        name='FWD'
                        aria-label="FWD"
                        value={formData.PopFWD}
                        onChange={handleChange}
                    />
                    <Spacer y={0.2} />
                    <Input
                        css={{ boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)', }}
                        size="xs"
                        rounded
                        status='primary'
                        labelLeft="MID"
                        placeholder="0"
                        type="number"
                        name='MID'
                        aria-label="MID"
                        value={formData.PopMID}
                        onChange={handleChange}
                    />
                    <Spacer y={0.2} />
                    <Input
                        css={{ boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)', }}
                        size="xs"
                        rounded
                        status='primary'
                        labelLeft="AFT"
                        placeholder="0"
                        type="number"
                        name='AFT'
                        aria-label="AFT"
                        value={formData.PopAFT}
                        onChange={handleChange}
                    />
                    <Spacer y={0.5} />
                </Grid>
            </Grid.Container>
            <Container
                justify='center'>
                <Text h4
                    color='#ffffff'
                    size={20}
                    css={{
                        letterSpacing: '1px',
                    }}
                >BAGGAGE</Text>
                <Spacer y={0.2} />
                <Row gap={0.2}>
                    <Input
                        css={{ boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)', }}
                        size="xs"
                        rounded
                        status='primary'
                        labelLeft="ITG"
                        placeholder="0"
                        type="number"
                        name='ITG'
                        aria-label="ITG"
                        value={formData.ITG}
                        onChange={handleChange}
                    />
                    <Spacer y={0.2} />
                    <Input
                        css={{ boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)', }}
                        size="xs"
                        rounded
                        status='primary'
                        labelLeft="PBAG"
                        placeholder="0"
                        type="number"
                        className='chlidren-input'
                        name='PBAG'
                        aria-label="PBAG"
                        value={formData.PBAG}
                        onChange={handleChange}
                    />
                    <Spacer y={0.2} />
                    <Input
                        css={{ boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)', }}
                        size="xs"
                        rounded
                        status='primary'
                        labelLeft="GBAG"
                        placeholder="0"
                        type="number"
                        name='GBAG'
                        aria-label="GBAG"
                        value={formData.GBAG}
                        onChange={handleChange}
                    />
                </Row>
            </Container>
            <Spacer y={1} />
            <div className='div_tob'>
                <Input
                    css={{ boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)', }}
                    id='TOB'
                    size="m"
                    rounded
                    status='success'
                    labelLeft="TOB"
                    placeholder="0"
                    type="text"
                    name='TOB'
                    aria-label="TOB"
                    value={(parseInt(formData.adults) + parseInt(formData.children)) + " + " + formData.infants}
                />
            </div>
            <Spacer y={1} />
            <div className='div_special'>
                <Text h4
                    color='#ffffff'
                    size={20}
                    css={{
                        letterSpacing: '1px',
                    }}
                >S.I.</Text>
                <Spacer x={0.2} />
                <Textarea
                    css={{
                        width: '100%',
                        boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)',
                    }}
                    status='default'
                    placeholder="Write here any information not included in previous inputs"
                    name='SI'
                    aria-label="SI"
                    value={formData.SIPax}
                    onChange={handleChange}
                />
            </div>
            <Spacer y={1} />
            <div className='bottom_inputs'>
                <Container className='div_special-container'>
                    <Row gap={0.3}>
                        <Input
                            css={{
                                width: '50vw',
                                boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)',
                            }}
                            type="number"
                            size="xs"
                            rounded
                            status='primary'
                            labelLeft="E.SEAT"
                            placeholder="0"
                            name='ES'
                            aria-label="ES"
                            value={formData.ESeat}
                            onChange={handleChange}
                        />
                        <Spacer x={0.4} />
                        <Input
                            css={{
                                width: '60vw',
                                boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)',
                            }}
                            type='text'
                            size="xs"
                            rounded
                            status='primary'
                            placeholder='Seat number'
                            name='ESeatNumber'
                            aria-label="ESeatNumber"
                            value={formData.ESeatNumber}
                            onChange={handleChange}
                        />
                    </Row>
                </Container>
                <Spacer y={0.5} />
                <Container className='div_special-container'>
                    <Row gap={0.3}>
                        <Input
                            css={{
                                width: '50vw',
                                boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)',
                            }}
                            type="number"
                            size="xs"
                            rounded
                            status='primary'
                            labelLeft="C.SEAT"
                            placeholder="0"
                            name='CS'
                            aria-label="CS"
                            value={formData.CONFS}
                            onChange={handleChange}
                        />
                        <Spacer x={0.4} />
                        <Input
                            css={{
                                width: '60vw',
                                boxShadow: '0 3px 3px -2px rgb(0 0 0 / 26%)',
                            }}
                            type='text'
                            size="xs"
                            rounded
                            status='primary'
                            placeholder='Seat number'
                            name='CSeatNumber'
                            aria-label="CSeatNumber"
                            value={formData.CONFSeatNumber}
                            onChange={handleChange}
                        />
                    </Row>
                </Container>
            </div>
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
                                height: '40px',
                                width: '100%',
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
                                height: '40px',
                                width: '100%',
                            }}>
                            SEND
                        </Button>
                    </Row>
                </Container>
            </div>
        </form>
    );
}
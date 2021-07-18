import { TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import "../../jobform.css"
import { step1Submission } from '../../../../services/user';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Step1({ handleNext, id }) {
    const classes = useStyles();
    const [obj1, setObj1] = React.useState({});

    // const nextBtn = (e) => {
    //     e.preventDefault();
    //     handleNext();
    // }

    const handleChange = (key, value) => {
        obj1[key] = value;
        setObj1(obj1);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        step1Submission(obj1, id).then((res) => {
            handleNext();
        }).catch((err) => {
            alert("Something went wrong!")
        })
    }
    return (
        <div>
            <form onSubmit={(e) => formSubmitHandler(e)}>
                <div className="d-flex justify-center mobileView">
                    <TextField required={true} onChange={(event) => handleChange('firstName', event.target.value)} id="outlined-basic" className="m-1" label="Nome di battesimo" variant="outlined"
                    />

                    <TextField required={true} onChange={(event) => handleChange('lastName', event.target.value)} id="outlined-basic" className="m-1" label="Cognome" variant="outlined" />
                </div>
                <div className="d-flex justify-center mobileView">
                    <TextField required={true}
                        onChange={(event) => handleChange('dob', event.target.value)}
                        id="date"
                        className="m-1"
                        label="Compleanno"
                        type="date"
                        // defaultValue="2017-05-24"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <FormControl required={true} variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            // value={"age"}
                            onChange={(event) => handleChange('gender', event.target.value)}
                            label="Genere"
                        >
                            <MenuItem value="">
                                <em>Selezionare</em>
                            </MenuItem>
                            <MenuItem value={"Maschio"}>Maschio</MenuItem>
                            <MenuItem value={"Femmina"}>Femmina</MenuItem>
                            <MenuItem value={"Altra"}>Altra</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                <div className="d-flex justify-center mobileView">
                    <TextField required={true} type="email" onChange={(event) => handleChange('email', event.target.value)} id="outlined-basic" className="m-1" label="Indirizzo e-mail" variant="outlined" />

                    <TextField required={true} onChange={(event) => handleChange('phoneNumber', event.target.value)} id="outlined-basic" className="m-1" label="Numero di telefono" type="number" variant="outlined" />
                </div>

                <div className="submit m-1">
                <Button
                    variant="contained"
                    color="primary"
                    // onClick={(e) => nextBtn(e)}
                    // className={classes.button}
                    // disabled={err}

                    type="submit"
                >
                    Il prossimo
                </Button>
                </div>
                
            </form>
        </div>
    )
}

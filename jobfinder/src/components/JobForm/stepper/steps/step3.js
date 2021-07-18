import { TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core'
import React, { useRef, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import "../../jobform.css"
import { CloudUpload } from '@material-ui/icons';
import {useDropzone} from 'react-dropzone'
import selfie from "../../../../assets/selfie.png"
import { step3Submission } from '../../../../services/user';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function Step3({ handleNext, id, step }) {
    const classes = useStyles();
    const textInput = useRef(null);
    const [obj3, setObj3] = React.useState([]);

    const handleChange = (event) => {
        console.log(window.URL.createObjectURL(event.target.files[0]));
    }
    const formSubmitHandler = (e) => {
        console.log("mmmmm");
        e.preventDefault();
        step3Submission(obj3, id, step).then((res) => {
            setObj3([])
            document.getElementById('upload-photo').value = null;
            handleNext();
        }).catch((err) => {
            alert("Something went wrong!")
        })
    }

    const onDrop = useCallback((acceptedFiles) => {
        //obj3 = acceptedFiles;
        setObj3(acceptedFiles)
        
        
      }, [])

    
      const {getRootProps, getInputProps} = useDropzone({onDrop})
      
    return (
        <div>
            <form onSubmit={(e) => formSubmitHandler(e)}>

                <div {...getRootProps()} className="d-flex flex-col justify-center align-center">

                    <label className="inp-label" for="upload-photo">
                        <div className="file-upload m-1">
                        {!obj3.length && step === 'step3' && <p>Carica il tuo curriculum o</p>}
                        {!obj3.length && step === 'step4' && <p>Carica il tuo selfie con un documento d'identità o</p>}
                        {!obj3.length && step === 'step5' && <p>Carica il tuo curriculum o</p>}
                            {step === 'step5' ? <div className="selfie" style={{backgroundImage: `url(${selfie})`}} ></div> : <CloudUpload className="uploadlogo" />}
                            {!obj3.length && <p>trascina qui il tuo file.</p>}
                            {!obj3.length && <p>Questo campo è obbligatorio</p>}

                            {obj3.length && obj3.map((e,i) => <p key={i}>{e.name}</p>)}
                        </div>
                    </label>
                    <input required id="upload-photo" {...getInputProps()} className="file-inp" ref={textInput} type="file" multiple />

                </div>

                {/* <div {...getRootProps()} className="d-flex flex-col justify-center align-center">

                    <label className="inp-label" for="upload-photo">
                        <div className="file-upload m-1">
                            <p>Carica la tua prova d'identità o</p>
                            <CloudUpload className="uploadlogo" />
                            <p>trascina qui il tuo file.</p>
                        </div>
                    </label>
                    <input required id="upload-photo" {...getInputProps()} className="file-inp"  type="file" multiple/>

                </div>

                <div {...getRootProps()} className="d-flex flex-col justify-center align-center">

                    <label className="inp-label" for="upload-photo">
                        <div className="file-upload m-1">
                            <p>Carica il tuo selfie con un documento d'identità o</p>
                            <div className="selfie" style={{backgroundImage: `url(${selfie})`}} >
                            <CloudUpload className="selfie-uploadlogo" />
                            </div>
                            <p>trascina qui il tuo file.</p>
                        </div>
                    </label>
                    <input required id="upload-photo" {...getInputProps()} className="file-inp"  type="file" />

                </div> */}

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

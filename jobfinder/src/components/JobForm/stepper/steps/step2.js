import { TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core'
import React, { useRef, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import "../../jobform.css"
import { CloudUpload } from '@material-ui/icons';
import {useDropzone} from 'react-dropzone'
import { step2Submission } from '../../../../services/user';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function Step2({ handleNext, id }) {
    const classes = useStyles();
    const textInput = useRef(null);
    const [obj2, setObj2] = React.useState({});

    const handleChange = (event) => {
        console.log(window.URL.createObjectURL(event.target.files[0]));
    }

    const handletxtchange = (key, value) => {
        obj2[key] = value;
        setObj2(obj2);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        step2Submission(obj2, id).then((res) => {
            handleNext();
        }).catch((err) => {
            alert("Something went wrong!")
        })
    }
    const onDrop = useCallback((acceptedFiles) => {
        console.log("mango", acceptedFiles);
        obj2["resume"] = acceptedFiles;
        setObj2(obj2)
      }, [])
      const {getRootProps, getInputProps} = useDropzone({onDrop})
    return (
        <div>
            <form onSubmit={(e) => formSubmitHandler(e)}>
                <div className="d-flex justify-center mobileView">
                    <TextField onChange={(e) => handletxtchange("totalExperience", e.target.value)} id="outlined-basic" className="m-1" label="Esperienza lavorativa totale" variant="outlined" />

                    <TextField onChange={(e) => handletxtchange("organiztionName", e.target.value)} id="outlined-basic" className="m-1" label="Organizzazione attuale" variant="outlined" />
                </div>

                <div {...getRootProps()} className="d-flex flex-col justify-center align-center mobileView">
                    {/* <TextField id="outlined-basic" className="m-1" label="Job designation" variant="outlined" /> */}

                    {/* <div className="m-1">Upload your resume</div> */}

                    <label className="inp-label" for="upload-photo">
                        <div className="file-upload m-1">
                            {!obj2.resume && <p>Carica il tuo curriculum o</p>}
                            <CloudUpload className="uploadlogo" />
                            {!obj2.resume && <p>trascina qui il tuo file.</p>}
                            {obj2.resume && obj2.resume?.map((e,i) => <p key={i}>{e.name}</p>)}
                        </div>
                    </label>
                    <input id="upload-photo" {...getInputProps()} className="file-inp" ref={textInput} type="file" multiple/>

                    {/* <div className="file-upload m-1">
                        <p>Upload your resume or</p>
                        <CloudUpload className="uploadlogo"/>
                        <p>drag and drop your file here.</p>
                    </div> */}
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

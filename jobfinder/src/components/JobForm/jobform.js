import React, { useState, useEffect } from 'react';
import HorizontalLinearStepper from './stepper/stepper'
import logo from '../../assets/atenajob_logo.svg'
import { Button } from '@material-ui/core'
import "./jobform.css"
export default function Jobform() {

    const [step, setStep] = useState(0)

    useEffect(() => {
        let localStep = localStorage.getItem('step')
        if(localStep) {
            setStep(localStep);
        } else {
            setStep(0)
        }
      });

      const getStarted = () => {
          setStep(1);
          localStorage.setItem('step', 1)
      }
    
    return (
        <div className="container">
            <div className="formContainer">
            <div className="d-flex flex-col align-center justify-center">
            <img className="logo mb-1" src={logo}/>
                {!step && 
                <Button onClick={() => getStarted()} variant="contained"
                color="primary">Get Started</Button>
                }
                </div>
                
            {step >= 1 && <HorizontalLinearStepper/>}

            </div>
        </div>
    )
}

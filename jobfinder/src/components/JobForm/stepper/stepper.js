import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { step1Validation } from './formValidation';
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Informazioni generali', 'Esperienza lavorativa', 'SSN','Documenti', 'Selfie con id'];
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  
  const [id, setId] = React.useState();

  const fpPromise = FingerprintJS.load()

;(async () => {
  // Get the visitor identifier when you need it.
  const fp = await fpPromise
  const result = await fp.get()

  // This is the visitor identifier:
  const visitorId = result.visitorId
  setId(visitorId)
})()

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Step1 handleNext={() => handleNext()} id={id}/>
      case 1:
        return <Step2 handleNext={() => handleNext()} id={id}/>;
      case 2:
        return <Step3 handleNext={() => handleNext()} id={id} step="step3"/>;
      case 3:
        return <Step3 handleNext={() => handleNext()} id={id} step="step4"/>;
        case 4:
          return <Step3 handleNext={() => handleNext()} id={id} step="step5"/>;
      default:
        return 'Unknown step';
    }
  }

  // const onValueChangeStep1 = (key, value) => {
  //   obj1[key] = value;
  //   setObj1(obj1);

  // }

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className="d-flex align-center flex-col">
            <Typography className={classes.instructions}>
            I tuoi dati sono stati caricati con successo.
            </Typography>
            <CheckCircleIcon style={{fontSize: "4.5em", color: "#2c84c4"}}/>
            {/* <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button> */}
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
            <div className="submit">
              {/* <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              Indietro
              </Button> */}
              {/* {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )} */}

              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                
              >
                {activeStep === steps.length - 1 ? 'Finire' : 'Il prossimo'}
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

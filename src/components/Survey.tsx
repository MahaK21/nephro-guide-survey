import React, { useState, useCallback } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import Demographics from './sections/Demographics';
import NasaTLX from './sections/NasaTLX';
import PostEval from './sections/PostEval';
import { submitToGoogleSheets } from '../services/googleSheets';

const steps = ['Demographics', 'NASA-TLX', 'Post-Session Evaluation'];

const Survey: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    demographics: {
      initials: '',
      trainingLevel: '',
      ultrasoundExperience: '',
      needlePlacements: '',
    },
    nasaTlx: {
      freehand: {
        mentalDemand: 0,
        physicalDemand: 0,
        temporalDemand: 0,
        performance: 0,
        effort: 0,
        frustration: 0,
      },
      inPlaneGuide: {
        mentalDemand: 0,
        physicalDemand: 0,
        temporalDemand: 0,
        performance: 0,
        effort: 0,
        frustration: 0,
      },
      outOfPlaneGuide: {
        mentalDemand: 0,
        physicalDemand: 0,
        temporalDemand: 0,
        performance: 0,
        effort: 0,
        frustration: 0,
      },
    },
    postEval: {
      preferredTechnique: '',
      preferredTechniqueReason: '',
      mostAccurateTechnique: '',
      mostAccurateReason: '',
      clinicalChoice: '',
      clinicalChoiceReason: '',
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleDataChange = useCallback((section: string, data: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  }, []);

  const handleDemographicsChange = useCallback((data: unknown) => {
    handleDataChange('demographics', data);
  }, [handleDataChange]);

  const handleNasaTlxChange = useCallback((data: unknown) => {
    handleDataChange('nasaTlx', data);
  }, [handleDataChange]);

  const handlePostEvalChange = useCallback((data: unknown) => {
    handleDataChange('postEval', data);
  }, [handleDataChange]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await submitToGoogleSheets({
        demographics: formData.demographics,
        nasaTlx: formData.nasaTlx,
        postEval: formData.postEval,
        timestamp: new Date().toISOString(),
      });
      setIsSubmitted(true);
      setActiveStep((prevStep) => prevStep + 1);
      alert('Survey submitted successfully!');
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Error submitting survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Demographics 
          onDataChange={handleDemographicsChange} 
          initialData={formData.demographics}
        />;
      case 1:
        return <NasaTLX 
          onDataChange={handleNasaTlxChange} 
          initialData={formData.nasaTlx}
        />;
      case 2:
        return <PostEval 
          onDataChange={handlePostEvalChange} 
          initialData={formData.postEval}
        />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Nephrostomy Needle Guidance Study
          </Typography>
        </Box>
        {activeStep === 0 && (
          <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
            This study investigates whether low-cost needle guidance systems improve performance in ultrasound-guided needle placement for nephrostomy procedures, compared to conventional freehand techniques.
          </Typography>
        )}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ mt: 4 }}>
          {isSubmitted ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Thank you for completing the survey!
              </Typography>
            </Box>
          ) : (
            <>
              {renderStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0 || isSubmitting}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {isSubmitting ? 'Submitting...' : activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Survey; 
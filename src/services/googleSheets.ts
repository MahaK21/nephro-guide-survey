interface DemographicsData {
  initials: string;
  trainingLevel: string;
  ultrasoundExperience: string;
  needlePlacements: string;
}

interface NasaTlxData {
  freehand: {
    mentalDemand: number;
    physicalDemand: number;
    temporalDemand: number;
    performance: number;
    effort: number;
    frustration: number;
  };
  inPlaneGuide: {
    mentalDemand: number;
    physicalDemand: number;
    temporalDemand: number;
    performance: number;
    effort: number;
    frustration: number;
  };
  outOfPlaneGuide: {
    mentalDemand: number;
    physicalDemand: number;
    temporalDemand: number;
    performance: number;
    effort: number;
    frustration: number;
  };
}

interface PostEvalData {
  preferredTechnique: string;
  preferredTechniqueReason: string;
  mostAccurateTechnique: string;
  mostAccurateReason: string;
  clinicalChoice: string;
  clinicalChoiceReason: string;
}

interface SurveyResponse {
  demographics: DemographicsData;
  nasaTlx: NasaTlxData;
  postEval: PostEvalData;
  timestamp: string;
}


export const submitToGoogleSheets = async (data: SurveyResponse) => {
  try {
    console.log('Submitting survey data:', data);
    
    const response = await fetch("https://script.google.com/macros/s/AKfycbw9C4sBDT1UfyitTXxqaNY3shFTKlbUS8BTZpiRMFUVjaS0a574G6O7ByDiQ8QtMtyN/exec", {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Survey submitted successfully');
    return true;
  } catch (error) {
    console.error('Error submitting survey:', error);
    throw new Error('Failed to submit survey. Please try again.');
  }
};
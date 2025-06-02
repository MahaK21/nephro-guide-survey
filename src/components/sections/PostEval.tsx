import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@mui/material';

interface PostEvalData {
  preferredTechnique: string;
  preferredTechniqueReason: string;
  mostAccurateTechnique: string;
  mostAccurateReason: string;
  clinicalChoice: string;
  clinicalChoiceReason: string;
}

interface PostEvalProps {
  onDataChange: (data: PostEvalData) => void;
  initialData: PostEvalData;
}

const PostEval: React.FC<PostEvalProps> = ({ onDataChange, initialData }) => {
  const handleChange = (field: keyof PostEvalData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onDataChange({
      ...initialData,
      [field]: event.target.value,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Post-Session Evaluation
      </Typography>

      {/* Preferred Technique */}
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">
          Which technique did you prefer overall?
        </FormLabel>
        <RadioGroup
          value={initialData.preferredTechnique}
          onChange={handleChange('preferredTechnique')}
        >
          <FormControlLabel value="freehand" control={<Radio />} label="Freehand" />
          <FormControlLabel value="inPlaneGuide" control={<Radio />} label="In-plane needle guide" />
          <FormControlLabel value="outOfPlaneGuide" control={<Radio />} label="Out-of-plane needle guide" />
        </RadioGroup>
        <TextField
          fullWidth
          label="Optional: Why?"
          value={initialData.preferredTechniqueReason}
          onChange={handleChange('preferredTechniqueReason')}
          margin="normal"
          multiline
          rows={2}
        />
      </FormControl>

      {/* Most Accurate Technique */}
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">
          With which technique do you feel you were most accurate in targeting the posterior calyx?
        </FormLabel>
        <RadioGroup
          value={initialData.mostAccurateTechnique}
          onChange={handleChange('mostAccurateTechnique')}
        >
          <FormControlLabel value="freehand" control={<Radio />} label="Freehand" />
          <FormControlLabel value="inPlaneGuide" control={<Radio />} label="In-plane needle guide" />
          <FormControlLabel value="outOfPlaneGuide" control={<Radio />} label="Out-of-plane needle Guide" />
        </RadioGroup>
        <TextField
          fullWidth
          label="Optional: Why?"
          value={initialData.mostAccurateReason}
          onChange={handleChange('mostAccurateReason')}
          margin="normal"
          multiline
          rows={2}
        />
      </FormControl>

      {/* Clinical Choice */}
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">
          Which technique would you choose for a real clinical case, and why?
        </FormLabel>
        <RadioGroup
          value={initialData.clinicalChoice}
          onChange={handleChange('clinicalChoice')}
        >
          <FormControlLabel value="freehand" control={<Radio />} label="Freehand" />
          <FormControlLabel value="inPlaneGuide" control={<Radio />} label="In-plane needle guide" />
          <FormControlLabel value="outOfPlaneGuide" control={<Radio />} label="Out-of-plane needle guide" />
        </RadioGroup>
        <TextField
          fullWidth
          label="Optional: Why?"
          value={initialData.clinicalChoiceReason}
          onChange={handleChange('clinicalChoiceReason')}
          margin="normal"
          multiline
          rows={2}
        />
      </FormControl>
    </Box>
  );
};

export default PostEval; 
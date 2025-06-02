import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
  Stack,
} from '@mui/material';

interface DemographicsData {
  participantId: string;
  trainingLevel: string;
  otherTrainingLevel?: string;
  ultrasoundExperience: string;
  needlePlacements: string;
}

interface DemographicsProps {
  onDataChange: (data: DemographicsData) => void;
  initialData: DemographicsData;
}

const Demographics: React.FC<DemographicsProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState<DemographicsData>(initialData);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Participant Demographics & Experience
      </Typography>

      <TextField
        fullWidth
        label="Participant ID"
        value={formData.participantId}
        onChange={handleChange('participantId')}
        sx={{ mb: 4 }}
        required
      />

      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          Training Level
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={formData.trainingLevel}
            onChange={handleChange('trainingLevel')}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <FormControlLabel value="MS1" control={<Radio />} label="MS1" />
                <FormControlLabel value="MS2" control={<Radio />} label="MS2" />
                <FormControlLabel value="MS3" control={<Radio />} label="MS3" />
                <FormControlLabel value="MS4" control={<Radio />} label="MS4" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControlLabel value="PGY-1" control={<Radio />} label="PGY-1" />
                <FormControlLabel value="PGY-2" control={<Radio />} label="PGY-2" />
                <FormControlLabel value="PGY-3" control={<Radio />} label="PGY-3" />
                <FormControlLabel value="PGY-4" control={<Radio />} label="PGY-4" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControlLabel value="Fellowship-1" control={<Radio />} label="Fellowship-1" />
                <FormControlLabel value="Fellowship-2" control={<Radio />} label="Fellowship-2" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControlLabel value="Attending Surgeon" control={<Radio />} label="Attending Surgeon" />
                <FormControlLabel value="MD, research/industry role" control={<Radio />} label="MD, research/industry role" />
              </Stack>
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </Stack>
          </RadioGroup>
        </FormControl>
        {formData.trainingLevel === 'Other' && (
          <TextField
            fullWidth
            label="Please specify"
            value={formData.otherTrainingLevel || ''}
            onChange={handleChange('otherTrainingLevel')}
            sx={{ mt: 2 }}
            required
          />
        )}
      </Paper>

      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          Years of Experience with Ultrasound
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={formData.ultrasoundExperience}
            onChange={handleChange('ultrasoundExperience')}
          >
            <Stack direction="row" spacing={2}>
              <FormControlLabel value="None" control={<Radio />} label="None" />
              <FormControlLabel value="<1 year" control={<Radio />} label={"<1 year"} />
              <FormControlLabel value="1–2 years" control={<Radio />} label="1–2 years" />
              <FormControlLabel value="3–5 years" control={<Radio />} label="3–5 years" />
              <FormControlLabel value=">5 years" control={<Radio />} label={">5 years"} />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          Estimated Number of Ultrasound-Guided Needle Placements Performed
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={formData.needlePlacements}
            onChange={handleChange('needlePlacements')}
          >
            <Stack direction="row" spacing={2}>
              <FormControlLabel value="None" control={<Radio />} label="None" />
              <FormControlLabel value="1–10" control={<Radio />} label="1–10" />
              <FormControlLabel value="11–50" control={<Radio />} label="11–50" />
              <FormControlLabel value="51–100" control={<Radio />} label="51–100" />
              <FormControlLabel value=">100" control={<Radio />} label={">100"} />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default Demographics; 
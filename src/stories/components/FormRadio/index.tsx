import {
  FormControlLabel,
  FormGroup,
  Radio,
} from "@nwaycorp/nwayplay-designsystem-fe";
import React, { Fragment } from "react";

interface FormRadioProps {
  //   question: string;
  options: string[];
  value: string | undefined | null;
  onChange: (value: string | undefined | null) => void;
}

export const FormRadio = ({ options, value, onChange }: FormRadioProps) => {
  return (
    <FormGroup row>
      {options.map((text, index) => (
        <FormControlLabel
          key={`${index}_${text}`}
          control={<Radio value={text} onChange={() => onChange(text)} />}
          label={text}
          checked={value === text}
        />
      ))}
    </FormGroup>
  );
};

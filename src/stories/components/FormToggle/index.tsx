import {
  ToggleButton,
  ToggleButtonGroup,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { MouseEvent } from "react";
import { GENRE_LIST } from "../QuestionTemplate";

interface FormToggleProps {
  value: string;
  onChange: (event: MouseEvent<HTMLElement>, value: string) => void;
}

export const FormToggle = ({ value, onChange }: FormToggleProps) => {
  return (
    <ToggleButtonGroup
      value={value}
      onChange={(event, value) => onChange(event, value)}
    >
      {GENRE_LIST.map(({ value }, index) => (
        <ToggleButton value={value} size="l">
          {value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

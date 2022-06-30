import React, { MouseEvent } from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
} from "@nwaycorp/nwayplay-designsystem-fe";

const GENRE_LIST = [
  { id: "1", value: "HORROR" },
  { id: "2", value: "COMEDY" },
  { id: "3", value: "Sci-Fi" },
  { id: "4", value: "ROMANCE" },
  { id: "5", value: "ACTION" },
  { id: "6", value: "ANIMATION" },
];

interface FormToggleProps {
  value: string[];
  onChange: (event: MouseEvent<HTMLElement>, value: string[]) => void;
}

export const FormToggle = ({ value, onChange }: FormToggleProps) => {
  return (
    <ToggleButtonGroup
      value={value}
      onChange={(event, value) => onChange(event, value)}
    >
      {GENRE_LIST.map((item) => (
        <ToggleButton value={item?.value} key={item?.id} size="l">
          {item?.value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

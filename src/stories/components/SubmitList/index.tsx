import React from "react";
import {
  Box,
  Spacer,
  Stack,
  TextField,
  Typography,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { StyledListStack } from "./style";

const SubmitList = ({ color, genre, id, user }: any) => {
  return (
    <StyledListStack>
      <Typography variant="body8">List ID : {id}</Typography>
      <Spacer x="500" />
      <Stack direction="row" alignItems="flex-start">
        <TextField
          label="name"
          id="name"
          type="text"
          defaultValue={user?.name || "user_name"}
          readonly
        />
        <Spacer x="300" />
        <TextField
          label="email"
          id="email"
          type="email"
          defaultValue={user?.email || "user_email"}
          readonly
        />
        <Spacer x="300" />
        <Stack>
          <Typography variant="body6">genre</Typography>
          {genre &&
            genre?.map((item: string, index: number) => (
              <Typography key={`${item}_${index}`} variant="body8">
                {item}
              </Typography>
            ))}
        </Stack>
      </Stack>
    </StyledListStack>
  );
};

export default SubmitList;

import React from "react";
import {
  Box,
  Button,
  Spacer,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { StyledListStack } from "./style";
import { useModalContext } from "store/ModalProvider";
import { useRecoilState } from "recoil";
import { surveyList } from "store/index";
import { IData } from "../QuestionTemplate";

const SubmitList = ({ color, genre, id, user }: any) => {
  const theme = useTheme();
  const { handleEdit } = useModalContext();
  const [resultArray, setResultArray] = useRecoilState(surveyList);

  const arrayIndex = resultArray.findIndex((item) => item?.id === id);

  const handleDelete = () => {
    const newArr = removeIndex(resultArray, arrayIndex);
    setResultArray(newArr);
  };

  const removeIndex = (arr: IData[], index: number) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  };
  return (
    <StyledListStack theme={theme}>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="body8">List ID : {id}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Button
            size="s"
            color="primary"
            onClick={() => handleEdit(id)}
          >
            EDIT
          </Button>
          <Spacer x={"500"} />
          <Button size="s" color="black" onClick={handleDelete}>
            DELETE
          </Button>
        </Stack>
      </Stack>
      <Spacer y="300" />
      <Stack direction="row" alignItems="flex-start">
        <Stack>
          <Typography variant="body4">User Info</Typography>
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
        </Stack>
        <Spacer x="300" />
        <Stack>
          <Typography variant="body4">Color</Typography>
          <Typography variant="body8">{color || "color"}</Typography>
        </Stack>
        <Stack>
          <Typography variant="body4">Todays Feeling</Typography>
          <Typography variant="body8">
            {user?.todays_feeling || "todays_feeling"}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="body4">Genre</Typography>
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

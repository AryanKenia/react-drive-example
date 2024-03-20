import React from "react";
// import "./App.css";
import {
  readFileFromGooglePicker,
  submitFileToGoogleDrive,
} from "./googlePickerFunctions";
import useGoogleDriveApi from "./useGoogleDriveApi";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { Input as BaseInput } from "@mui/base/Input";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

function App() {
  const [inTextArea, setInTextArea] = React.useState("");
  const [userFileName, setUserFileName] = React.useState("");
  const scriptVars = useGoogleDriveApi();

  const onClickButton = () => {
    readFileFromGooglePicker(scriptVars, setInTextArea);
  };

  const onClickSubmitButton = () => {
    submitFileToGoogleDrive(scriptVars, userFileName, inTextArea);
  };

  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const InputElement = styled("input")(
    ({ theme }) => `
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const Input = React.forwardRef(function CustomInput(props, ref) {
    return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
  });

  return (
    <div className="App">
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <div>Google Drive Text Editor</div>
          {scriptVars.loaded && (
            <Button
              onClick={onClickButton}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Read file
            </Button>
          )}
          <TextareaAutosize
            value={inTextArea}
            onChange={(e) => setInTextArea(e.target.value)}
            placeholder="File Contents"
          />
          <Input
            aria-label="Demo input"
            value={userFileName}
            onChange={(e) => setUserFileName(e.target.value)}
            placeholder="File Name"
          />
          {scriptVars.loaded && (
            <Button
              onClick={onClickSubmitButton}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Submit file
            </Button>
          )}
          <div className="status">
            Status: {scriptVars.loaded ? "loaded" : "not loaded"}
          </div>
        </Stack>
      </Box>
    </div>

    // <div className="App">
    //   <div>Google Drive Text Editor</div>
    //   {scriptVars.loaded && (
    //     <Button
    //       onClick={onClickButton}
    //       variant="contained"
    //       tabIndex={-1}
    //       startIcon={<CloudUploadIcon />}
    //     >
    //       Read file
    //     </Button>

    //     // <button onClick={onClickButton} className="readFromGoogleDrive">
    //     //   Read File
    //     // </button>
    //   )}
    //   <TextareaAutosize
    //     value={inTextArea}
    //     onChange={(e) => setInTextArea(e.target.value)}
    //     placeholder="File Contents"
    //   />
    //   ;
    //   {/* <textarea
    //     value={inTextArea}
    //     onChange={(e) => setInTextArea(e.target.value)}
    //     className="editFileContents"
    //   ></textarea> */}
    //   <Input
    //     aria-label="Demo input"
    //     value={userFileName}
    //     onChange={(e) => setUserFileName(e.target.value)}
    //     placeholder="File Name"
    //   />
    //   {/* <input
    //     value={userFileName}
    //     onChange={(e) => setUserFileName(e.target.value)}
    //     className="userFileName"
    //   ></input> */}
    //   {scriptVars.loaded && (
    //     <Button
    //       onClick={onClickSubmitButton}
    //       variant="contained"
    //       tabIndex={-1}
    //       startIcon={<CloudUploadIcon />}
    //     >
    //       Submit file
    //     </Button>

    //     // <button
    //     //   onClick={onClickSubmitButton}
    //     //   className="submitGoogleDriveButton"
    //     // >
    //     //   Submit File
    //     // </button>
    //   )}
    //   <div className="status">
    //     Status: {scriptVars.loaded ? "loaded" : "not loaded"}
    //   </div>
    // </div>
  );
}

export default App;

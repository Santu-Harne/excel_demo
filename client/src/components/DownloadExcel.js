import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import * as XLSX from "xlsx";
const data = [
  {
    school_id: "",
    student_name: "",
    class: "",
    section: "",
    gender: "",
    top_length: "",
    top_width: "",
    bottom_length: "",
    bottom_width: "",
    top_size: "",
    bottom_size: "",
    image: [
      {
        src: 'hello'
      },
      {
        src: 'dear'
      }
    ]
  },
];
const fileName = "data sheet";
const DownloadExcel = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // XLSX.writeFile(wb, `${fileName}.xlsx`);
    // setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Export Excel
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are You Sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to download the excel file with all the records in it ?{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={exportToExcel} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DownloadExcel;
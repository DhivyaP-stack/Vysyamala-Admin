
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react"

 interface DataHistoryProps{
    open:boolean;
    onClose:()=>void;

}

export const DataHistoryPopup:React.FC<DataHistoryProps>=({open,onClose})=>{
    return(
        <>
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
<DialogTitle><Box sx={{display:"flex",justifyContent:"start",alignItems:"start",marginBottom:"1px",}}>Data History</Box>
<IconButton
  onClick={onClose}
  sx={{
    position:"absolute",
    top:5,
    right:5,
    background:"white",
    color:"#d50000"
  }}
  >
  <CloseIcon />
  </IconButton>
</DialogTitle>
<Divider sx={{borderWidth:"1px"}}/>
<DialogContent>
    <TableContainer>
        <Table>
            <TableHead style={{background: '#FFF9C9',whiteSpace:"nowrap", padding: '17px'}}>
                <TableRow >
                <TableCell  className="!text-red-600 !text-base !text-md text-nowrap font-bold" >Date</TableCell>
                <TableCell  className="!text-red-600 !text-base !text-md text-nowrap font-bold">Owner</TableCell>
                <TableCell  className="!text-red-600 !text-base !text-md text-nowrap font-bold">Profile Status</TableCell>
                <TableCell  className="!text-red-600 !text-base !text-md text-nowrap font-bold">Reason</TableCell>
                <TableCell  className="!text-red-600 !text-base !text-md text-nowrap font-bold">Others</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>3/24/2025 3:02:36 PM</TableCell>
                    <TableCell>VY240210 Owner</TableCell>
                    <TableCell>Approved</TableCell>
                    <TableCell>Prospect</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>3/24/2025 2:51:04 PM</TableCell>
                    <TableCell>VY240210 Owner</TableCell>
                    <TableCell>New</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
</DialogContent>
        </Dialog>
        </>
    )
}
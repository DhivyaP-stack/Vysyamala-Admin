import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
  Checkbox,
} from '@mui/material';
import axios from 'axios';
import { API_URL, baseUrl, downloadExcel } from '../../services/api';
import { GrEdit } from 'react-icons/gr';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import { TextTransformation } from 'ckeditor5';

interface ProbsProfiletableProps {
  pageNameValue: number; // Accept pageNameValue as a prop
  heading: string;
  plan_ids: string,
}

// Function to fetch data from the API
export const getProbsProfiletable = async (
  search: string,
  orderBy: string,
  order: 'asc' | 'desc',
  rowsPerPage: number,
  page: number,
  page_name: number, // Accept page_name as a parameter
  plan_ids?: string,
) => {
  // Construct the URL with query parameters
  const params = new URLSearchParams({
    page_size: rowsPerPage.toString(),
    page: page.toString(),
    page_name: page_name.toString(), // Pass the page_name parameter
    plan_ids: plan_ids || '',
  });

  if (search) {
    params.append('search', search);
  }

  const url = `${baseUrl}?${params.toString()}`;
  const response = await axios.get(url);
  return response;
};

interface Column {
  id: string;
  label: string;
  Width?: string;
  align?: 'right' | 'left' | 'center';
}

const columns: Column[] = [
  { id: 'ProfileId', label: 'Profile ID' },
  { id: 'Profile_name', label: 'Name' },

  { id: 'Profile_dob', label: 'Date of Birth' },
  { id: 'Profile_city', label: 'City' },
  { id: 'state_name', label: 'State' },
  { id: 'MaritalStatus', label: 'Marital' },
  { id: 'Mobile_no', label: 'Mobile' },
  { id: 'Profile_whatsapp', label: 'WhatsApp' },
  { id: 'Gender', label: 'Gender' },
  { id: 'Profile_alternate_mobile', label: 'Alternate Mobile' },

  { id: 'DateOfJoin', label: 'Date Of Join' },
  { id: 'birthstar_name', label: 'BirthStar' },
  { id: 'EmailId', label: 'Email' },
  { id: 'highest_education', label: 'Education Details' },
  { id: 'family_status', label: 'Family Status' },
  { id: 'anual_income', label: 'Anual Income' },
  { id: 'Last_login_date', label: 'Last Act Date' },

  { id: 'Profile_for', label: 'Profile For' },

  { id: 'profession', label: 'Profession' },

  { id: 'complexion_desc', label: 'Complexion' },
  { id: 'years', label: 'Years' },
  { id: 'country_name', label: 'Country' },
];

const ProbsProfiletable: React.FC<ProbsProfiletableProps> = ({
  pageNameValue,
  heading,
  plan_ids
}) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('ProfileId');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  // const [plan_ids, setPlanIds] = useState<string[]>(['8']);
  const [data, setData] = useState<{ results: any[]; count: number }>({
    results: [],
    count: 0,
  });
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]); // To track selected profile IDs
  console.log(selectedRows);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, order, orderBy, search, pageNameValue, plan_ids]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getProbsProfiletable(
        search,
        orderBy,
        order,
        rowsPerPage,
        page + 1,
        pageNameValue,
        plan_ids
      ); // Pass pageNameValue
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateShortProfilePDF = async (profileData: number[]) => {
    try {
      const response = await axios.post(
        'https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/generate_short_profile_pdf/',
        {
          profile_id: profileData.join(','),
        },
        {
          responseType: 'blob', // Important for handling binary data
        },
      );

      // Create a URL for the PDF blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'profile.pdf'); // Specify the file name

      // Append to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up and remove the link
    } catch (error) {
      console.error('Error downloading the PDF:', error);
    }finally{
      setSelectedRows([])
setSelectAll(false)
    }
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0); // Reset page to 0 when search term changes
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (ContentId: number) => {
    if (!ContentId) {
      console.error('Error: Missing ID for the row to delete');
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this item?',
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/logindetails/${ContentId}/`);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  // const handleDownload = async () => {
  //   try {
  //     const blob = await downloadExcel();
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'vysya_profiles.xlsx';
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error('Error downloading file:', error);
  //   }
  // };

  const handleDownload = async () => {
    try {
      const blob = await downloadExcel();  // Fetch or create the file blob
      const url = window.URL.createObjectURL(blob);  // Create a URL for the blob
      const a = document.createElement('a');  // Create an anchor element
      a.href = url;  // Set the blob URL as the href
      a.download = 'vysya_profiles.xlsx';  // Set the filename for download
      document.body.appendChild(a);  // (Optional) Append the element to the body
      a.click();  // Simulate a click to trigger the download
      a.remove();  // Remove the anchor element from the DOM
      window.URL.revokeObjectURL(url);  // Free up memory by revoking the blob URL
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  

  const navigate = useNavigate();

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      setSelectedRows(data.results.map((row) => row.ProfileId)); // Select all profile IDs
    } else {
      setSelectedRows([]); // Deselect all
    }
  };

  const handleRowSelect = (profileId: number) => {
    setSelectedRows(
      (prevSelected) =>
        prevSelected.includes(profileId)
          ? prevSelected.filter((id) => id !== profileId) // Deselect if already selected
          : [...prevSelected, profileId], // Select if not selected
    );
  };

   const [goToPageInput, setGoToPageInput] = useState<string>('');
  
    const handleGoToPage = () => {
    const pageNumber = parseInt(goToPageInput, 10);
    if (!isNaN(pageNumber)) {
      const lastPage = Math.ceil(data.count / rowsPerPage) - 1;
      const newPage = Math.max(0, Math.min(pageNumber - 1, lastPage));
      setPage(newPage);
      setGoToPageInput('');
    }
  };
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl text-black font-bold mb-4">{heading}</h1>
      <div className="w-full flex justify-between  items-center  ">
        {pageNameValue === 1 && (
          <Button sx={{textTransform:"none"}} onClick={handleDownload} variant="contained" color="primary">
            Download Excel
          </Button>
        )}
      
          <Button
            onClick={() => generateShortProfilePDF(selectedRows)}
            variant="contained"
            color="primary"
            sx={{ textTransform: 'none'}}
          >
            Download Short Profile
          </Button>
     
        <TextField
          size="medium"
          label="Search"
          variant="outlined"
          margin="normal"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <Paper className="w-full">
        <TableContainer sx={{ border: '1px solid #E0E0E0' }} className="bg-white">
          <Table  stickyHeader>
            <TableHead
              style={{
                border: '1px solid red',
                background: '#FFF9C9',
                padding: '17px',
                whiteSpace: 'nowrap',
              }}
            >
              <TableRow>
                <TableCell
                  style={{
                    background: '#FFF9C9',
                  
                    borderBottom: '1px solid #E0E0E0',
                   
                  }}
                  padding="checkbox"
                >
                  <Checkbox
                    color="primary"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    sx={{
                      backgroundColor: '#FFF9C9',
                     
                      borderBottom: '1px solid #E0E0E0',
                    }}
                  >
                    <TableSortLabel
                      className="!text-red-600 !text-base !text-md text-nowrap font-semibold"
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                  
                    borderBottom: '1px solid #E0E0E0',
                  
                    backgroundColor: '#FFF9C9',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '17px',
                  }}
                  className="!text-red-600 !text-base !text-nowrap !font-semibold "
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 2} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                data.results.map((row, index) => (
                  <TableRow
                    key={row.ProfileId}
                    selected={selectedRows.includes(row.ProfileId)}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    {/* Checkbox Cell */}
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={selectedRows.includes(row.ProfileId)}
                        onChange={() => handleRowSelect(row.ProfileId)} // Wrap in an arrow function
                      />
                    </TableCell>

                    {/* Map through columns */}
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          sx={{ whiteSpace: 'nowrap' }}
                          key={column.id}
                          align="left"
                        >
                          {column.id === 'ProfileId' ? (
                            <Typography
                              onClick={() =>
                                navigate(
                                  `/viewProfile?profileId=${row.ProfileId}`,
                                )
                              }
                              variant="body2"
                              sx={{
                                color: 'blue',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' },
                              }}
                            >
                              {value}
                            </Typography>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}

                    {/* Action buttons */}
                    <TableCell sx={{ padding: '10px', textAlign: 'center' }}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        gap={1}
                      >
                        
                        <Button
                          onClick={() =>
                            navigate(`/viewProfile?profileId=${row.ProfileId}`)
                          }
                        >
                          <FaRegEye />
                        </Button>
                        <Button
                          onClick={() =>
                            navigate(`/editProfile?profileId=${row.ProfileId}`)
                          }
                        >
                          <GrEdit />
                        </Button>
                        <Button onClick={() => handleDelete(row.ContentId)}>
                          <MdDeleteOutline
                            style={{
                              height: '17px',
                              width: '25px',
                              color: '#ff3333',
                            }}
                          />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}


<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
  {/* Left side - Page indicator */}
  <Typography variant="body2">
    Page <strong>{page + 1}</strong> of <strong>{Math.ceil(data.count / rowsPerPage)}</strong>
  </Typography>

 
  {/* Right side - Pagination controls */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px' }}>
           <Typography variant="body2">Go to page:</Typography>
          <TextField
            size="small"
            type="number"
            value={goToPageInput}
            onChange={(e) => setGoToPageInput(e.target.value)}
            inputProps={{
              min: 1,
              max: Math.ceil(data.count / rowsPerPage),
            }}
            style={{ width: '80px' }}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handleGoToPage}
            disabled={!goToPageInput}
          >
            Go
          </Button>
          </div>
    {/* Previous button */}
      <Button
    variant="outlined"
    size="small"
    onClick={() => setPage(0)}
    disabled={page === 0}
    sx={{ minWidth: '32px' }}
  >
    {'<<'}
  </Button>
    <Button
      variant="outlined"
      size="small"
      onClick={() => setPage(Math.max(0, page - 1))}
      disabled={page === 0}
    >
      Prev
    </Button>

    {/* Page numbers */}
    {(() => {
      const totalPages = Math.ceil(data.count / rowsPerPage);
      const currentPage = page + 1;
      const pages = [];

      // Always show first page
      pages.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "contained" : "outlined"}
          size="small"
          onClick={() => setPage(0)}
        >
          1
        </Button>
      );

      // Show ellipsis if needed after first page
      if (currentPage > 3) {
        pages.push(<Typography key="ellipsis-start">...</Typography>);
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "contained" : "outlined"}
            size="small"
            onClick={() => setPage(i - 1)}
          >
            {i}
          </Button>
        );
      }

      // Show ellipsis if needed before last page
      if (currentPage < totalPages - 2) {
        pages.push(<Typography key="ellipsis-end">...</Typography>);
      }

      // Always show last page if there's more than one page
      if (totalPages > 1) {
        pages.push(
          <Button
            key={totalPages}
            variant={currentPage === totalPages ? "contained" : "outlined"}
            size="small"
            onClick={() => setPage(totalPages - 1)}
          >
            {totalPages}
          </Button>
        );
      }

      return pages;
    })()}

    {/* Next button */}
    <Button
      variant="outlined"
      size="small"
      onClick={() => setPage(Math.min(Math.ceil(data.count / rowsPerPage) - 1, page + 1))}
      disabled={page >= Math.ceil(data.count / rowsPerPage) - 1}
    >
      Next
    </Button>
     <Button
    variant="outlined"
    size="small"
    onClick={() => setPage(Math.max(0, Math.ceil(data.count / rowsPerPage) - 1))}
    disabled={page >= Math.ceil(data.count / rowsPerPage) - 1}
    sx={{ minWidth: '32px' }}
  >
    {'>>'}
  </Button>
  </div>
</div>

          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '16px',justifyContent:'end' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px' }}>
           <Typography variant="body2">Go to page:</Typography>
          <TextField
            size="small"
            type="number"
            value={goToPageInput}
            onChange={(e) => setGoToPageInput(e.target.value)}
            inputProps={{
              min: 1,
              max: Math.ceil(data.count / rowsPerPage),
            }}
            style={{ width: '80px' }}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handleGoToPage}
            disabled={!goToPageInput}
          >
            Go
          </Button>
         </div>
          <Button
    variant="outlined"
    size="small"
    onClick={() => setPage(0)}
    disabled={page === 0}
    sx={{ minWidth: '32px' }}
  >
    {'<<'}
  </Button>
             <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

         <Button
    variant="outlined"
    size="small"
    onClick={() => setPage(Math.max(0, Math.ceil(data.count / rowsPerPage) - 1))}
    disabled={page >= Math.ceil(data.count / rowsPerPage) - 1}
    sx={{ minWidth: '32px' }}
  >
    {'>>'}
  </Button>
        </div> */}
        
      </Paper>
    </div>
  );
};

export default ProbsProfiletable;

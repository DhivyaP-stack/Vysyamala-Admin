import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import { IconButton, TablePagination } from '@mui/material';

// Custom pagination actions component
export function CustomPaginationActions(props: any) {
  const { count, page, rowsPerPage, onPageChange } = props;
  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* First Page Button */}
      <IconButton
        onClick={() => onPageChange(null, 0)}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>

      {/* Previous Page Button */}
      <IconButton
        onClick={() => onPageChange(null, page - 1)}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>

      {/* Current Page Indicator */}
      <span>Page {page + 1} of {totalPages}</span>

      {/* Next Page Button */}
      <IconButton
        onClick={() => onPageChange(null, page + 1)}
        disabled={page >= totalPages - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>

      {/* Last Page Button */}
      <IconButton
        onClick={() => onPageChange(null, totalPages - 1)}
        disabled={page >= totalPages - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}


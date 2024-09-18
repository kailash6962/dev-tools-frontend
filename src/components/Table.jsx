import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

// ==============================|| DYNAMIC TABLE - HEADER ||============================== //

function DynamicTableHead({ headers, order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell
            key={header.id}
            align={header.align || 'left'}
            padding={header.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === header.id ? order : false}
          >
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| DYNAMIC STATUS RENDERER ||============================== //

function DynamicStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'In-Active';
      break;
    case 1:
      color = 'success';
      title = 'Active';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| DYNAMIC TABLE COMPONENT ||============================== //

export default function DynamicTable({ headers, data, order = 'asc', orderBy = 'id' }) {
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <DynamicTableHead headers={headers} order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy)).map((row, index) => {

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row[orderBy] || index}
                >
                  {headers.map((header) => (
                    <TableCell
                      key={header.id}
                      align={header.align || 'left'}
                      padding={header.disablePadding ? 'none' : 'normal'}
                    >
                      {/* Custom renderer for status if needed */}
                      {header.id === 'is_active' ? (
                        <DynamicStatus status={row[header.id]} />
                      ) : header.id === 'totalAmount' ? (
                        <NumericFormat value={row[header.id]} displayType="text" thousandSeparator prefix="$" />
                      ) : header.id === 'tracking_no' ? (
                        <Link color="secondary">{row[header.id]}</Link>
                      ) : header.date ? (
                        dayjs(row[header.id]).format('D MMM YYYY')
                      ) : (
                        row[header.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// Helper Functions and PropTypes

DynamicTableHead.propTypes = { headers: PropTypes.array.isRequired, order: PropTypes.any, orderBy: PropTypes.string };
DynamicStatus.propTypes = { status: PropTypes.number };

DynamicTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      disablePadding: PropTypes.bool
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// Sorting and Comparator Functions

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

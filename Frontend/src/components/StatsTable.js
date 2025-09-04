import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

const StatsTable = ({ stats }) => {
  return (
    <Paper style={{ padding: 20 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expiry</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((s, i) => (
            <TableRow key={i}>
              <TableCell>{`http://localhost:5000/${s.shortcode}`}</TableCell>
              <TableCell>{s.clicks}</TableCell>
              <TableCell>{s.created}</TableCell>
              <TableCell>{s.expiry}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StatsTable;

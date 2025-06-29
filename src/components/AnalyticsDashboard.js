import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Paper } from "@mui/material";

const COLORS = ["#8884d8", "#82ca9d"];

const AnalyticsDashboard = ({ formDataList }) => {
  // Gender distribution
  const genderData = [
    {
      name: "Male",
      value: formDataList.filter((d) => d.gender === "Male").length,
    },
    {
      name: "Female",
      value: formDataList.filter((d) => d.gender === "Female").length,
    },
  ];

  // Salary stats
  const salaries = formDataList.map((d) => Number(d.salary)).filter(Boolean);
  const avgSalary =
    salaries.reduce((acc, val) => acc + val, 0) / (salaries.length || 1);
  const minSalary = Math.min(...salaries);
  const maxSalary = Math.max(...salaries);

  const salaryStats = [
    { name: "Avg Salary", value: Math.round(avgSalary) },
    { name: "Min Salary", value: minSalary },
    { name: "Max Salary", value: maxSalary },
  ];

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Analytics Dashboard 📊
      </Typography>

      {/* Total Applications */}
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Total Applications: <strong>{formDataList.length}</strong>
      </Typography>

      {/* Charts Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        {/* Gender Pie Chart */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2">Gender Distribution</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {genderData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Salary Stats Chart */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2">Salary Statistics</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salaryStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default AnalyticsDashboard;

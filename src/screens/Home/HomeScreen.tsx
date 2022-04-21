/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect, Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Filters from "./Filters";
import { Grid } from "@mui/material";
import "./Home.style.css";
import Header from "./Header";
import { EmployeeType } from "../../config/types";
import { history, IsEmpty, Loading } from "../utils";
import { COUNTRY_RES, employeeData } from "../../constants";
import { useSelector } from "react-redux";

type EmployeesType = Array<EmployeeType>;
export default class HomeScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      firstLoading: true,
      employees: [],
      filterOpacity: 1,
      qsItems: {},
    };
  }
  componentDidMount() {
    this.renderEmpDate();
  }

  renderEmpDate = async () => {
    const qsItems: any = await this.getQs(window.location.search);
    this.setState({ isLoading: true });

    if (!qsItems.qs) {
      this.setState({
        isLoading: false,
        firstLoading: false,
        employees: employeeData,
      });

      return;
    }
    this.setState({ qsItems });

    const selectedData: any = [];
    for (let index = 0; index < employeeData.length; index++) {
      const employee = employeeData[index];
      const phone = employee.phone ? employee.phone.replace("+", "") : "";
      const qsPhone = qsItems.user_phone
        ? qsItems.user_phone.replace("+", "")
        : "";

      let hasName = new RegExp(qsItems.user_name, "i").exec(employee.name);
      let hasEmail = new RegExp(qsItems.email, "i").exec(employee.email);
      let hasPhone = new RegExp(`${qsPhone}`, "i").exec(`${phone}`);
      let hasDate = new RegExp(qsItems.date, "i").exec(employee.date);
      let hasCompany = new RegExp(qsItems.company, "i").exec(employee.company);
      let country = await this.getCountry(qsItems.country);
      let hasCountry: any = qsItems.country ? false : true;
      if (country) {
        hasCountry = new RegExp(country.Name, "i").exec(employee.country);
      }
      if (
        hasName &&
        hasEmail &&
        hasCompany &&
        hasCountry &&
        hasDate &&
        hasPhone
      ) {
        selectedData.push(employee);
      }
    }
    this.setState({
      isLoading: false,
      employees: selectedData,
      qsItems,
      firstLoading: false,
    });
  };
  onSearchClicked = () => {
    const filterOpacity = this.state.filterOpacity === 1 ? 0 : 1;
    this.setState({ filterOpacity });
  };
  onFilterItems = async (items: EmployeeType) => {
    let qs: any = "?qs=true";
    if (items.name) {
      qs += `&user_name=${items.name}`;
    }
    if (items.email) {
      qs += `&email=${items.email}`;
    }
    if (items.phone) {
      qs += `&user_phone=${items.phone}`;
    }
    if (items.company) {
      qs += `&company=${items.company}`;
    }

    if (items.country) {
      qs += `&country=${items.country}`;
    }
    if (items.date) {
      qs += `&date=${items.date}`;
    }
    // window.location = qs;
    history.push(qs);
    this.renderEmpDate();
  };

  getQs = (search: string) => {
    let queryObj: any = {};
    const qs = new URLSearchParams(search);
    const values = qs.forEach((value, key) => {
      queryObj[`${key}`] = value;
    });
    return queryObj;
  };
  getCountry = (Alpha3Code: string) => {
    for (let index = 0; index < COUNTRY_RES.Response.length; index++) {
      const element: any = COUNTRY_RES.Response[index];

      if (Alpha3Code == element.Alpha3Code) {
        return element;
      }
    }
    return null;
  };
  render() {
    const { employees, isLoading, filterOpacity, qsItems, firstLoading } =
      this.state;

    return (
      <div className="container">
        <Loading status={firstLoading}>
          <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <Filters
                style={{
                  opacity: filterOpacity,
                  height: filterOpacity === 1 ? "inherit" : 0,
                }}
                qsItems={qsItems}
                onFilterItems={this.onFilterItems}
              />
            </Grid>
            <Grid item md={filterOpacity === 1 ? 8 : 12} xs={12}>
              <div className="dataWrapp">
                <TableContainer component={Paper}>
                  <Header onSearchClicked={this.onSearchClicked} />
                  <Loading status={isLoading}>
                    <IsEmpty empty={!employees[0]} message="No Data was Found">
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell style={{ width: 74 }}>Date</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Company</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {employees.map((employee: EmployeeType) => (
                            <TableRow
                              key={employee.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {employee.name}
                              </TableCell>
                              <TableCell>{employee.phone}</TableCell>
                              <TableCell>
                                <a href={`mailto: ${employee.email}`}>
                                  {employee.email}
                                </a>
                              </TableCell>
                              <TableCell>{employee.date}</TableCell>
                              <TableCell>{employee.country}</TableCell>
                              <TableCell>{employee.company}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </IsEmpty>
                  </Loading>
                </TableContainer>
              </div>
            </Grid>
          </Grid>
        </Loading>
      </div>
    );
  }
}

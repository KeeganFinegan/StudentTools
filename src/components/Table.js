import React from 'react';
import '../App.css';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBTableEditable,
} from 'mdbreact';

const columns = ['Item Name', 'Score', ' Grade', 'Weight %'];

const data = [['Assignment 1', '85/100', 'Deepends', '40']];

const TableEditablePage = (props) => {
  return (
    <div className="grid-container">
      <div className="table-container">
        <MDBCard>
          <MDBCardHeader
            tag="h3"
            className="text-center font-weight-bold text-uppercase py-4"
          >
            Table Editable
          </MDBCardHeader>
          <MDBCardBody className="mt 20">
            <MDBTableEditable data={data} columns={columns} striped bordered />
          </MDBCardBody>
        </MDBCard>
      </div>
    </div>
  );
};

export default TableEditablePage;

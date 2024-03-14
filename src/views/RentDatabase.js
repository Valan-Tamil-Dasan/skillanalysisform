import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import { Card, CardText, CardTitle, Button, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, } from "reactstrap";
import RentalsTable from "../components/RentalsTable";

const RentDatabase = () => {

  const [totalRentals, setTotalRentals] = useState('');
  const [data, setData] = useState('')
  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/getRentals');
        setTotalRentals(res.data.length);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  });

  return (
    <div>
      <Row>
        <h5 className="mb-3 mt-3">User ID : 2561101</h5>
        <Col md="6" lg="3">
          <Card body color="light-warning">
            <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Total Rented Books</CardTitle>
            <CardText>
              {totalRentals}
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <RentalsTable/>
        </Col>
      </Row>
    </div>
  );
};

export default RentDatabase;

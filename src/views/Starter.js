import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import BooksTable from "../components/BooksTable";
import axios from "axios";
import './App.css';
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';
import { Card, CardText, CardTitle, Button, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, } from "reactstrap";

const Starter = () => {

  const [totalBooks, setTotalBooks] = useState('');
  const [totalMembers, setTotalMembers] = useState('');
  const [totalRentals, setTotalRentals] = useState('');
  const [data, setData] = useState('')
  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/getBooks');
        setTotalBooks(res.data.length);
      } catch (error) {
        console.log(error);
      }
      try {
        const res = await axios.get('/getCardMembers');
        setTotalMembers(res.data.length);
      } catch (error) {
        console.log(error);
      }
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
            <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Total Books</CardTitle>
            <CardText>
              {totalBooks}
              
            </CardText>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-success">
            <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Total Members</CardTitle>
            <CardText>
              {totalMembers}
            </CardText>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-info">
            <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Total Rentals</CardTitle>
            <CardText>
              {totalRentals}
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <BooksTable />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardText,
  CardTitle,
  Button,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const SADForm = () => {
  const [data, setData] = useState({
    name: "",
    department: "",
    section: "",
    year: "",
    reg_no: "",
    domain: "",
    codeChefUsername: "",
    codeForcesUsername: "",
    leetcodeUsername: "",
    githubUsername: "",
    email: "",
    contact: "",
  });

  const [uniqueMessage, setUniqueMessage] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  const navigate = useNavigate();

  const addCard = async () => {
    if (uniqueMessage == "not-unique") {
      toast.error("Enter Unique Card Number");
    } else {
      const { card_no, name, email, address, contact, aadhar_no, dom } = data;
      if (card_no.length !== 12) {
        toast.error("Card number should be at length of 12");
      } else {
        try {
          const res = await axios.post("/addCard", {
            card_no,
            name,
            email,
            address,
            contact,
            aadhar_no,
            dom,
          });
          toast.success("Card Created");
          Swal.fire({
            title: "Card Creation Successfull",
            text: "New Library Card has been Created !",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            navigate("/cardmembers");
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const validateMobileNumber = (inputValue) => {
    if (!/^\d+$/.test(inputValue)) {
      return false;
    }
    if (inputValue.length !== 10) {
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /\.[^\s@]{4,}@citchennai\.net$/;
    return emailRegex.test(email);
  };
  const checkUniqueness = async () => {
    const card_no = data.card_no;
    try {
      const res = await axios.post("/checkUniqueness", {
        card_no: card_no,
      });
      setUniqueMessage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(emailMsg, "iii");
  return (
    <Row>
      <Col>
        <Card>
          <CardTitle
            tag="h5"
            style={{ fontFamily: "Poppins", fontWeight: 600 }}
            className="border-bottom p-3 mb-0"
          >
            Powered by CDC (Career Development Centre), CIT Chennai
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label
                  for="name"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                  type="text"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label
                  for="reg_no"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  Register Number
                </Label>
                <Input
                  id="reg_no"
                  name="reg_no"
                  placeholder="Enter Register Number"
                  type="text"
                  onChange={(e) => setData({ ...data, reg_no: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label
                  for="emp_dept"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  Domain
                </Label>
                <Input
                  id="emp_dept"
                  name="emp_dept"
                  type="select"
                  onChange={(e) => setData({ ...data, domain: e.target.value })}
                >
                  <option>Select Domain</option>
                  <option>App Development</option>
                  <option>SDE</option>
                  <option>Full Stack Development</option>
                  <option>Machine Learning</option>
                  <option>Cloud</option>
                  <option>Cybersecurity</option>
                  <option>IoT</option>
                  <option>VLSI</option>
                  <option>Data Analytics and Data Science</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label
                  for="email"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  College Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter College Email"
                  type="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label
                  for="Name"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                ></Label>
                <div className="d-flex align-items-center">
                  <Input
                    id="Name"
                    name="Name"
                    placeholder="Enter Your Name"
                    type="text"
                    onChange={(e) => setData({ ...data, Name: e.target.value })}
                  />
                  <Button
                    color="primary"
                    className="m-2"
                    onClick={checkUniqueness}
                  >
                    Check
                  </Button>
                </div>
                {uniqueMessage && uniqueMessage == "unique" && (
                  <small className="text-success m-1">
                    Card number is unique
                  </small>
                )}
                {uniqueMessage && uniqueMessage == "not-unique" && (
                  <small className="text-warning">
                    Card Number is not unique
                  </small>
                )}
              </FormGroup>
              <FormGroup>
                <Label
                  for="card_no"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  Unique Library Card Number
                </Label>
                <div className="d-flex align-items-center">
                  <Input
                    id="card_no"
                    name="card_no"
                    placeholder="Enter Unique Card Number"
                    type="text"
                    onChange={(e) =>
                      setData({ ...data, card_no: e.target.value })
                    }
                  />
                  <Button
                    color="primary"
                    className="m-2"
                    onClick={checkUniqueness}
                  >
                    Check
                  </Button>
                </div>
                {uniqueMessage && uniqueMessage == "unique" && (
                  <small className="text-success m-1">
                    Card number is unique
                  </small>
                )}
                {uniqueMessage && uniqueMessage == "not-unique" && (
                  <small className="text-warning">
                    Card Number is not unique
                  </small>
                )}
              </FormGroup>

              
              <FormGroup>
                <Label
                  for="email"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  Student Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter Student Email"
                  type="email"
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setData({ ...data, email: inputValue });
                    if (!inputValue) {
                      setEmailMsg("");
                    } else if (!validateEmail(inputValue)) {
                      setEmailMsg("Enter a valid email ID");
                    } else {
                      setEmailMsg("");
                    }
                  }}
                />
              </FormGroup>
              {emailMsg && (
                <small className=" mb-4 " style={{ color: "red" }}>
                  {emailMsg}
                </small>
              )}
              <FormGroup>
                <Label
                  for="contact"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  Contact
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  placeholder="Enter Person Contact"
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, contact: e.target.value })
                  }
                />
              </FormGroup>
              
              <FormGroup>
                <Label
                  for="aadhar_no"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  Aadhar Number
                </Label>
                <Input
                  id="aadhar_no"
                  name="aadhar_no"
                  placeholder="Enter Aadhar of Person"
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, aadhar_no: e.target.value })
                  }
                />
              </FormGroup>
              <Button color="primary" onClick={addCard}>
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SADForm;

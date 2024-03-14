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
    sec : '',
    dept :'',
    contact: "",
  });

  const [leetcodeData, setLeetcodeData] = useState({
    found: 0,
    username: "",
    problemsSolved: "",
    globalRank: "",
    contestRating: "",
    topPercent: "",
  });

  const [codechefData, setcodechefData] = useState({
    found: 0,
    username: "",
    currentRating: "",
    highestRating: "",
    division: "",
    starRating: "",
    globalRank: "",
    countryRank: "",
  });

  const [codeforcesData, setcodeforcesData] = useState({
    found: 0,
    username: "",
    currentRating: "",
    maxRating: "",
    currentRank: "",
    maxRank : '',
  });

  const [githubData, setgithubData] = useState({
    found: 0,
    username: "",
    numberOfRepos: "",
    followers: "",
    following: "",

  });

  const [uniqueMessage, setUniqueMessage] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  const navigate = useNavigate();

  const details = {
    I: {
      CSE: ["A", "B", "C", "D"],
      IT: ["A", "B", "C"],
      AIDS: ["A", "B", "C"],
      AIML: ["A", "B"],
      "CSE (CS)": ["One Section"],
      CSBS: ["One Section"],
      ECE: ["A", "B", "C"],
      "ECE (VLSI)": ["One Section"],
      "ECE (ACT)": ["One Section"],
      EEE: ["One Section"],
      CIVIL: ["One Section"],
      MECH: ["A", "B"],
      BME: ["One Section"],
      MCT: ["One Section"],
    },
    II: {
      CSE: ["A", "B", "C"],
      IT: ["A", "B"],
      AIDS: ["A", "B", "C"],
      AIML: ["One Section"],
      "CSE (CS)": ["One Section"],
      CSBS: ["One Section"],
      ECE: ["A", "B"],
      EEE: ["One Section"],
      CIVIL: ["One Section"],
      MECH: ["A", "B"],
      BME: ["One Section"],
      MCT: ["One Section"],
    },
    III: {
      CSE: ["A", "B", "C"],
      IT: ["One Section"],
      AIDS: ["A", "B", "C"],
      CSBS: ["One Section"],
      ECE: ["A", "B"],
      EEE: ["One Section"],
      CIVIL: ["One Section"],
      MECH: ["A", "B"],
      BME: ["One Section"],
      MCT: ["One Section"],
    },
  };

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

  const fetchLeetcode = async () => {
    const username = data.leetcodeUsername;

    try {
      const response = await axios.post(
        "http://localhost:5000//fetch_leetcode",
        {
          username: username,
        }
      );

      if (response.data.message[1]) {
        const fetchedData = {
          found: 1,
          username: username,
          problemsSolved: response.data.message[0]["Total"],
          globalRank: response.data.message[0]["Global_Rank"],
          contestRating: response.data.message[0]["Contest_Rating"],
          topPercent: response.data.message[0]["Top%"],
        };
        setLeetcodeData(fetchedData);
      } else {
        const fetchedData = {
          found: -1,
          username: username,
          problemsSolved: "",
          globalRank: "",
          contestRating: "",
          topPercent: "",
        };
        setLeetcodeData(fetchedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCodechef = async () => {
    const username = data.codeChefUsername;

    try {
      const response = await axios.post(
        "http://localhost:5000//fetch_codechef",
        {
          username: username,
        }
      );

      if (response.data.message[1]) {
        const fetchedData = {
          found: 1,
          username: data.codeChefUsername,
          currentRating: response.data.message[0]["Current Rating"],
          highestRating: response.data.message[0]["Highest Rating"],
          division: response.data.message[0]["Division"],
          starRating: response.data.message[0]["Star Rating"],
          globalRank: response.data.message[0]["Global Ranking"],
          countryRank: response.data.message[0]["Country Ranking"],
        };

        setcodechefData(fetchedData);
      } else {
        const fetchedData = {
          found: -1,
          username: "",
          currentRating: "",
          highestRating: "",
          division: "",
          starRating: "",
          globalRank: "",
          countryRank: "",
        };
        setcodechefData(fetchedData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCodeforces = async () => {
    const username = data.codeForcesUsername;

    try {
      const response = await axios.post(
        "http://localhost:5000//fetch_codeforces",
        {
          username: username,
        }
      );

      if (response.data.message[1]) {
        const fetchedData = {
          found: 1,
          username: username,
          currentRating: response.data.message[0]["current_rating"],
          currentRank: response.data.message[0]["current_rank"],
          maxRating: response.data.message[0]["max_rating"],
          maxRank: response.data.message[0]["max_rank"],
        };
        setcodeforcesData(fetchedData);
      } else {
        const fetchedData = {
          found: -1,
          username: username,
          problemsSolved: "",
          globalRank: "",
          contestRating: "",
          topPercent: "",
        };
        setcodeforcesData(fetchedData);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const fetchgithub = async () => {
    const username = data.githubUsername;

    try {
      const response = await axios.post(
        "http://localhost:5000//fetch_github",
        {
          username: username,
        }


      );
      
      if (response.data.message[1]) {
        const fetchedData = {
          found: 1,
          username: username,
          numberOfRepos: response.data.message[0]["public_repos"],
          followers: response.data.message[0]["followers"],
          following: response.data.message[0]["following"],
        };
        setgithubData(fetchedData);
      } else {
        const fetchedData = {
          found: -1,
          username: username,
          numberOfRepos: "",
          followers: "",
          following: "",
        };
        setgithubData(fetchedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                  for="leetcode_id"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  Leetcode ID
                </Label>
                <div className="d-flex align-items-center">
                  <Input
                    id="leetcode_id"
                    name="leetcode_id"
                    placeholder="Enter your leetcode ID"
                    type="text"
                    onChange={(e) =>
                      setData({ ...data, leetcodeUsername: e.target.value })
                    }
                  />
                  <Button
                    color="primary"
                    className="m-2"
                    onClick={fetchLeetcode}
                  >
                    Verify
                  </Button>
                </div>

                {leetcodeData.found === 1 ? (
                  <small className=" mb-4 " style={{ color: "green" }}>
                    <b style={{ color: "black" }}>Username</b> :{" "}
                    {leetcodeData.username} ,{" "}
                    <b style={{ color: "black" }}> Problems solved </b>:{" "}
                    {leetcodeData.problemsSolved} ,{" "}
                    <b style={{ color: "black" }}> Global Rank :</b>{" "}
                    {leetcodeData.globalRank} ,{" "}
                    <b style={{ color: "black" }}>Contest Rating </b>:{" "}
                    {leetcodeData.contestRating.toFixed(2)} ,{" "}
                    <b style={{ color: "black" }}>Top % </b>:{" "}
                    {leetcodeData.topPercent} &nbsp;{" "}
                    <span style={{ color: "black" }}>
                      (username shown here will be submitted)
                    </span>
                  </small>
                ) : leetcodeData.found === 0 ? null : (
                  <p style={{ color: "red" }}>Invalid Credentials</p>
                )}
              </FormGroup>

              <FormGroup>
                <Label
                  for="codechef_id"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  CodeChef ID
                </Label>
                <div className="d-flex align-items-center">
                  <Input
                    id="codechef_id"
                    name="codechef_id"
                    placeholder="Enter your CodeChef ID"
                    type="text"
                    onChange={(e) =>
                      setData({ ...data, codeChefUsername: e.target.value })
                    }
                  />
                  <Button
                    color="primary"
                    className="m-2"
                    onClick={fetchCodechef}
                  >
                    Verify
                  </Button>
                </div>

                {codechefData.found === 1 ? (
                  <small className=" mb-4 " style={{ color: "green" }}>
                    <b style={{ color: "black" }}>Username</b> :{" "}
                    {codechefData.username} ,{" "}
                    <b style={{ color: "black" }}>Current Rating</b>:{" "}
                    {codechefData.currentRating} ,{" "}
                    <b style={{ color: "black" }}> Highest Rating:</b>{" "}
                    {codechefData.highestRating} ,{" "}
                    <b style={{ color: "black" }}>Star </b>:{" "}
                    {codechefData.starRating} ,{" "}
                    <b style={{ color: "black" }}>Division</b>:{" "}
                    {codechefData.division} &nbsp;{" "}
                    <span style={{ color: "black" }}>
                      (username shown here will be submitted)
                    </span>
                  </small>
                ) : codechefData.found === 0 ? null : (
                  <p style={{ color: "red" }}>Invalid Credentials</p>
                )}
              </FormGroup>
              <FormGroup>
                <Label
                  for="codeforces_id"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  CodeForces ID
                </Label>
                <div className="d-flex align-items-center">
                  <Input
                    id="codeforces_id"
                    name="codeforces_id"
                    placeholder="Enter your codeforces ID"
                    type="text"
                    onChange={(e) =>
                      setData({ ...data, codeForcesUsername: e.target.value })
                    }
                  />
                  <Button
                    color="primary"
                    className="m-2"
                    onClick={fetchCodeforces}
                  >
                    Verify
                  </Button>
                </div>

                {codeforcesData.found === 1 ? (
                  <small className=" mb-4 " style={{ color: "green" }}>
                    <b style={{ color: "black" }}>Username</b> :{" "}
                    {codeforcesData.username} ,{" "}
                    <b style={{ color: "black" }}> Current Rating </b>:{" "}
                    {codeforcesData.currentRating} ,{" "}
                    <b style={{ color: "black" }}> Max Rating :</b>{" "}
                    {codeforcesData.maxRating} ,{" "}
                    <b style={{ color: "black" }}>Current Rank </b>:{" "}
                    {codeforcesData.currentRank} ,{" "}
                    <b style={{ color: "black" }}>Max Rank </b>:{" "}
                    {codeforcesData.maxRank} &nbsp;{" "}
                    <span style={{ color: "black" }}>
                      (username shown here will be submitted)
                    </span>
                  </small>
                ) : codeforcesData.found === 0 ? null : (
                  <p style={{ color: "red" }}>Invalid Credentials</p>
                )}
              </FormGroup>
              <FormGroup>
                <Label
                  for="github_id"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  GitHub ID
                </Label>
                <div className="d-flex align-items-center">
                  <Input
                    id="github_id"
                    name="github_id"
                    placeholder="Enter your github ID"
                    type="text"
                    onChange={(e) =>
                      setData({ ...data, githubUsername: e.target.value })
                    }
                  />
                  <Button
                    color="primary"
                    className="m-2"
                    onClick={fetchgithub}
                  >
                    Verify
                  </Button>
                </div>

                {githubData.found === 1 ? (
                  <small className=" mb-4 " style={{ color: "green" }}>
                    <b style={{ color: "black" }}>Username</b> :{" "}
                    {githubData.username} ,{" "}
                    <b style={{ color: "black" }}> Number of public repositories </b>:{" "}
                    {githubData.numberOfRepos} ,{" "}
                    <b style={{ color: "black" }}> Number of Followers</b>{" "}
                    {githubData.followers} ,{" "}
                    <b style={{ color: "black" }}>Following </b>:{" "}
                    {githubData.following} ,{" "}
                     &nbsp;{" "}
                    <span style={{ color: "black" }}>
                      (username shown here will be submitted)
                    </span>
                  </small>
                ) : githubData.found === 0 ? null : (
                  <p style={{ color: "red" }}>Invalid Credentials</p>
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
                      setEmailMsg("Enter college mail ID");
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
                  for="emp_year"
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  Year
                </Label>
                <Input
                  id="emp_year"
                  name="emp_year"
                  type="select"
                  onChange={(e) => setData({ ...data, year: e.target.value })}
                >
                  <option value="">Select year</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                </Input>
              </FormGroup>
              {data.year !== "" && (
                <FormGroup>
                  <Label
                    for="dept"
                    style={{ fontFamily: "Poppins", fontWeight: 400 }}
                  >
                    Department
                  </Label>
                  <Input
                    id="dept"
                    name="dept"
                    type="select"
                    onChange={(e) => setData({ ...data, dept: e.target.value })}
                  >
                    <option value="">Select Department</option>
                    {Object.keys(details[data.year]).map((dept, index) => (
                      <option value={dept}>{dept}</option>
                    ))}
                  </Input>
                </FormGroup>
              )}
              {data.dept !== "" && data.year !== "" && (
                <FormGroup>
                  <Label
                    for="sec"
                    style={{ fontFamily: "Poppins", fontWeight: 400 }}
                  >
                    Section
                  </Label>
                  <Input
                    id="sec"
                    name="sec"
                    type="select"
                    onChange={(e) => setData({ ...data, sec: e.target.value })}
                  >
                    <option value="">Select Section</option>
                    {details[data.year][data.dept].map((section, index) => (
                      <option value={section}>{section}</option>
                    ))}
                  </Input>
                </FormGroup>
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
              {/* while submitting submit the details in fetched data not the value from input tab */}
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

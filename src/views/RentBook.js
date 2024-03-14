import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardText, CardTitle, Button, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, } from "reactstrap";
import axios from 'axios';
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';

const RentBook = () => {

    const [userData, setUserData] = useState([]);
    const [uniqueMessage, setUniqueMessage] = useState('');
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const [card, setCard] = useState('');
    const [empty, setEmpty] = useState('');

    const checkUser = async () => {
        const card_no = card;
        try {
            const res = await axios.post('/checkUser', {
                card_no: card_no
            });
            if (res.data.length === 0) {
                setUniqueMessage("not-found");
            } else {
                const userD = res.data[0];
                setUserData(userD);
                setUniqueMessage("found");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const data = {
        card_no: userData.card_no,
        name: userData.name,
        email: userData.email,
        contact: userData.contact,
        aadhar_no: userData.aadhar_no,
    };

    const [data1,setData1] = useState({
        book : '',
        date : ''
    });


    const addRent = async () => {
        if (uniqueMessage == "not-found") {
            toast.error("User not Found");
        } else {
            const { card_no, name, email, contact, aadhar_no } = data;
            const { book, date } = data1
            try {
                const res = await axios.post('/addRent', {
                    card_no, name, email, contact, aadhar_no, book, date
                })
                toast.success("Rent Data Created");
                Swal.fire({
                    title: 'Rent Data Added Successfull',
                    text: 'New rent data has been stored !',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    navigate('/');
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    }



return (
    <Row>
        <Col>
            <Card>
                <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 600 }} className="border-bottom p-3 mb-0">
                    Rent Books
                </CardTitle>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="card_no" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Library Card Number</Label>
                            <div className="d-flex align-items-center">
                                <Input
                                    id="card_no"
                                    name="card_no"
                                    placeholder="Enter Unique Card Number"
                                    type="text"
                                    onChange={(e) => setCard(e.target.value)}
                                />
                                <Button color="primary" className="m-2" onClick={checkUser}>Search</Button>
                            </div>
                            {uniqueMessage && uniqueMessage == "found" && <small className="text-success m-1" >Member found</small>}
                            {uniqueMessage && uniqueMessage == "not-found" && <small className="text-warning">Member not exist</small>}
                        </FormGroup>
                    </Form>
                    {card && uniqueMessage === "found" &&
                        <Form>
                            <FormGroup>
                                <Label for="name" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter Person Name"
                                    type="text"
                                    value={userData.name}
                                    disabled
                                    onChange={(e) => setEmpty(e.target.val)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Enter Person Email"
                                    type="text"
                                    value={userData.email}
                                    disabled
                                    onChange={(e) => setEmpty(e.target.val)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="contact" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Contact</Label>
                                <Input
                                    id="contact"
                                    name="contact"
                                    placeholder="Enter Person Contact"
                                    type="text"
                                    value={userData.contact}
                                    disabled
                                    onChange={(e) => setEmpty(e.target.val)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="aadhar_no" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Aadhar Number</Label>
                                <Input
                                    id="aadhar_no"
                                    name="aadhar_no"
                                    placeholder="Enter Aadhar of Person"
                                    type="text"
                                    value={userData.aadhar_no}
                                    disabled
                                    onChange={(e) => setEmpty(e.target.val)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="book" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Select Book</Label>
                                <Input
                                    type="select"
                                    name="book"
                                    id="book"
                                    onChange={(e) => setData1({...data1, book: e.target.value})}
                                >
                                    <option value="">Select a book</option>
                                    {books.map((book, index) => (
                                        <option key={index} value={book.title}>{book.title}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="date" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Date of Book Rental</Label>
                                <Input id="date" name="date" type="date"
                                    onChange={(e) => setData1({...data1, date : e.target.value})}
                                />
                            </FormGroup>
                            <Button color="primary" onClick={addRent}>Submit</Button>
                        </Form>
                    }
                </CardBody>
            </Card>
        </Col>
    </Row>
);

}

export default RentBook;
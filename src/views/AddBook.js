import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardText, CardTitle, Button, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, } from "reactstrap";
import axios from 'axios';
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';

const AddBook = () => {
    const [data, setData] = useState({
        book_id: '',
        author: '',
        title: '',
        subject: '',
        date: '',
        genre: '',
    })
    const navigate = useNavigate();

    const addBooks = async () => {
        const { book_id, author, title, subject, date, genre } = data;
        try {
            const res = await axios.post('/addBooks', {
                book_id, author, title, subject, date, genre
            })
            toast.success("Submission Successful");
            Swal.fire({
                title: 'Submission Successfull',
                text: 'Book added to library successfully !',
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

    const validateDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return date >= today;
    };


    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 600 }} className="border-bottom p-3 mb-0">
                        Add Books
                    </CardTitle>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="book_id" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Book ID</Label>
                                <Input
                                    id="book_id"
                                    name="book_id"
                                    placeholder="Enter Book ID"
                                    type="text"
                                    onChange={(e) => setData({ ...data, book_id: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="author" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Author</Label>
                                <Input
                                    id="author"
                                    name="author"
                                    placeholder="Enter Author Name"
                                    type="text"
                                    onChange={(e) => setData({ ...data, author: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Enter Book Title"
                                    type="text"
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="subject" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Subject</Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="Enter Subject of Book"
                                    type="text"
                                    onChange={(e) => setData({ ...data, subject: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="genre" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Date of Publication</Label>
                                <Input id="genre" name="genre" type="date" max={new Date().toISOString().split('T')[0]} onChange={(e) => {
                                    const isValid = validateDate(new Date(e.target.value));
                                    if (isValid) {
                                        setData({ ...data, date: e.target.value });
                                    } else {
                                        alert("Not valid");
                                    }
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="emp_dept" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Genre</Label>
                                <Input id="emp_dept" name="emp_dept" type="select" onChange={(e) => setData({ ...data, genre: e.target.value })}>
                                    <option>Select Genre</option>
                                    <option>Science Fiction</option>
                                    <option>Fiction</option>
                                    <option>Fiary Tales</option>
                                    <option>General Knowledge</option>
                                    <option>Mystery</option>
                                    <option>Dystopian</option>
                                    <option>Thriller</option>
                                    <option>Auto Biography</option>
                                </Input>
                            </FormGroup>
                            <Button color="primary" onClick={addBooks}>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default AddBook
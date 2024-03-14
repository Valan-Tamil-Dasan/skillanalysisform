import { Card, CardBody, CardTitle, Table, Button, Input } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../src/views/App.css';
const OrdersTable = (props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    title: "",
    author: "",
    subject: "",
    publishDate: ""
  });

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/getBooks');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, filter]);

  const filterData = () => {
    let filtered = data.filter(book =>
      book.title.toLowerCase().includes(filter.title.toLowerCase()) &&
      book.author.toLowerCase().includes(filter.author.toLowerCase()) &&
      book.subject.toLowerCase().includes(filter.subject.toLowerCase()) &&
      book.date.toLowerCase().includes(filter.publishDate.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 7;
  const totalPages = Math.ceil(filteredData.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredData.slice(indexOfFirstBook, indexOfLastBook);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5" className="m-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Library Database</CardTitle>
          <div className="filters">
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by title"
                  value={filter.title}
                  onChange={e => setFilter({ ...filter, title: e.target.value })}
                  className="m-1"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by author"
                  value={filter.author}
                  onChange={e => setFilter({ ...filter, author: e.target.value })}
                  className="m-1"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by subject"
                  value={filter.subject}
                  onChange={e => setFilter({ ...filter, subject: e.target.value })}
                  className="m-1"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by publish date"
                  value={filter.publishDate}
                  onChange={e => setFilter({ ...filter, publishDate: e.target.value })}
                  className="m-1"
                />
              </div>
            </div>
          </div>
          <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((data, index) => (
                <tr key={index} className="border-top">
                  <td>{data.book_id}</td>
                  <td>{data.title}</td>
                  <td>{data.author}</td>
                  <td>{data.subject}</td>
                  <td>{data.date}</td>
                  <td>{data.genre}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text">
            <Button
              color="primary"
              disabled={currentPage === 1}
              onClick={prevPage}
              className="m-2"
            >
              Previous
            </Button>
            <Button
              color="primary"
              disabled={currentPage === totalPages}
              onClick={nextPage}
              className="m-2"
            >
              Next
            </Button>
            <p className="m-2">Page {currentPage} of {totalPages}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
  
};

export default OrdersTable;

import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';

function App() {
  const [data, setData] = useState([]);

  const [active, setActive] = useState(2);
  let items = [];
  const handlePagination = (res) => {
    console.log(res);
    setActive(active + 1);
  };
  const handleBack = (res) => {
    console.log(res);
    if (active > 1) {
      setActive(active - 1);
    }
  };
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={handlePagination}>
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://picsum.photos/v2/list?page=${active}&limit=14`
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [active]);

  return (
    <div className="">
      <div className="container">
        <p className="nav left">Logo</p>
        <p className="nav center">Site title</p>
        <p></p>
      </div>
      <div className="header">Header image</div>

      <div className="imageContainer">
        {data &&
          data.map((item) => (
            <img
              key={item.id}
              src={item.download_url}
              height={200}
              width={200}
              alt="img"
            />
          ))}
      </div>
      <div className="pagination">
        <Pagination.Prev onClick={handleBack} />
        <Pagination.Next onClick={handlePagination} />
      </div>
    </div>
  );
}

export default App;

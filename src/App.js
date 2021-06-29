import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@contentful/forma-36-react-components';
import '@contentful/forma-36-react-components/dist/styles.css';
import "./App.css";

const query = `
{
  cryptoCollection(order: [rank_ASC]) {
    items {
      rank
      logo {
        url
      }
      name
      ticker
      price
      marketCap
    }
  }
}
`;

function App() {
  const [list, setList] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        setList(data.cryptoCollection.items);
      });
  }, []);

  if (!list) {
    return "Loading...";
  }

  return (
    <div>
      <div className="header">
        <img src="https://www.sudoboat.com/images/icons/logo-light-with-icon.png" className="logo" alt="logo" />
      </div>
      <div className="container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ticker</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { list.map((entry) =>
              <TableRow key={entry.rank}>
                <TableCell>{entry.rank}</TableCell>
                <TableCell>
                  <img src={entry.logo.url} className="list-logo" alt="logo" />
                </TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.ticker}</TableCell>
                <TableCell>{entry.price}</TableCell>              
              </TableRow>
          )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
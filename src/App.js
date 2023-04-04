import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import {
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Card,
  Button,
} from "reactstrap";

export default function App() {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const fetchCoins = async () => {
    try {
      const res = await fetch
       ("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
      const data = await res.json();
      setCoins(data);
    } catch (e) {
      alert("Api error");
    }
  };
  useEffect(() => {
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter((crypto) =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div
      style={{
        margin: "30px",
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          display: "flex",
        }}
      >
        <h1  style={{ color: "green", fontFamily:"Ink Free", fontSize:"60px" }} >CoinMarket</h1>
        <br />
        <br />
        <input
          value={search}
          onChange={handleChange}
          style={{ color: "white", width: "50%", margin: "auto" }}
        />
        <br />
        <br />
      </div>
      <div
        style={{
          margin: "30px",
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {filteredCoins.map((coin) => (
          <>
            <Card
              className="card"
              key={coin.id}
              style={{
                width: "18rem",
                backgroundColor: "black",
                margin: "auto",
                marginTop: "30px",
                marginLeft: "20px",
                marginRight: "20px",
                borderRadius: "30px",
                borderWidth: "10px",
                borderColor: "green",
                color: "green",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <CardBody style={{ borderRadius: "30px" }}>
                <CardTitle className="title" tag="h5">
                  {coin.symbol.toUpperCase()}
                </CardTitle>
                <img alt="Sample" src={coin.image} />
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {coin.name}
                </CardSubtitle>
                <CardText>
                  <p>Güncel fiyat: {coin.current_price} $</p>
                  <p
                    className={
                      coin.price_change_percentage_24h > 0 ? "green" : "red"
                    }
                  >
                    Değşim oranı: {coin.price_change_percentage_24h}%
                  </p>
                </CardText>
              </CardBody>
            </Card>
            <br />
          </>
        ))}
      </div>
    </div>
  );
}

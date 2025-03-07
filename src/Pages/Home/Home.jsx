import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Banner from "../../Components/Banner/Banner";
import RowList from "../../Rows/RowList/RowList";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <RowList/>
      <Footer />
    </div>
  );
}

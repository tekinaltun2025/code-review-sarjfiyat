
import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import SurveyForm from "../components/SurveyForm";

const Survey = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <SurveyForm />
      </main>
      <Footer />
    </div>
  );
};

export default Survey;

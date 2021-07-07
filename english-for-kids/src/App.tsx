import React from 'react';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import { Statistics } from './components/Statistics';
import { Category } from './components/Category';
import { Header } from './components/Header';

function App() {
  return (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route component={Main} path="/" exact />
      <Route component={Statistics} path="/statistics" />
      <Route component={Category} path="/category" />
    </Switch>


    <Footer />
  </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { BrowserRouter,Switch,Route, Redirect } from 'react-router-dom'
import { Statistics } from './components/Statistics';
import { Category } from './components/Category';
import { Header } from './components/Header';
import { AdminCategories } from './components/AdminCategories';
import { useTypedSelector } from './hooks/useTypedSelector';
import { ModalWindow } from './components/ModalWindow';
import { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import { AdminWordPage } from './components/AdminWordPage';

function App() {
  const {modalView} = useTypedSelector(state => state.admin);
  const {getCards,getCategories} = useActions();

  useEffect(() => {
    getCards();
    getCategories();
  }, []);

  return (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route component={Main} path="/" exact />
      <Route component={Statistics} path="/statistics" />
      <Route component={Category} path="/category" />
      <Route component={AdminCategories} path="/admin" exact />
      <Route component={AdminWordPage} path="/admin/:category?/:words?" />
      <Redirect to="/" />
    </Switch>
    {modalView && <ModalWindow />}

    <Footer />
  </BrowserRouter>
  );
}

export default App;

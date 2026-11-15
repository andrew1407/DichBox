import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import VerifiersContextProvider from './contexts/VerifiersContext';
import UserContextProvider from './contexts/UserContext';
import MenuContextProvider from './contexts/MenuContext';
import BoxesContextProvider from './contexts/BoxesContext';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import './styles/main.css';
import './styles/responsive.css';

ReactModal.setAppElement('#root')

// the static showcase (GitHub Pages) has no server-side fallback for routes
const Router = process.env.DICHBOX_DEMO ? HashRouter : BrowserRouter;

const App = () => (
  <Router>
    <div id="main">
      <MenuContextProvider>
      <UserContextProvider>
      <VerifiersContextProvider>
      <BoxesContextProvider>
        <Header />
        <MainContent />
        <Footer />
      </BoxesContextProvider>
      </VerifiersContextProvider>
      </UserContextProvider>
      </MenuContextProvider>
    </div>
  </Router>
);


export default App;

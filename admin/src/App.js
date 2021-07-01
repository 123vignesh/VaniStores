import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'


import MainComponent from './components/MainComponent';

import { DataProvider } from './components/Context';
import { Provider } from 'react-redux';
import { ConfigureStore } from './Redux/conFigureStore';

import './App.css';
const store = ConfigureStore();
export default class App extends Component {

  render() {
    return (
      <Provider store={store}>

        <DataProvider>
          <div className="App">

            <BrowserRouter>
              <MainComponent />
            </BrowserRouter>
          </div>
        </DataProvider>
      </Provider>
    );
  }
}


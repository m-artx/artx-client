import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // 여기서 store를 import 해야 함
import ChannelService from './utils/ChannelService';
import { REACT_APP_CHANNEL_TALK_KEY } from './utils/env';


export * from "./utils/env";





const root = ReactDOM.createRoot(document.getElementById('root'));

const pk = REACT_APP_CHANNEL_TALK_KEY
const pluginKey = pk;

ChannelService.loadScript();
ChannelService.boot({
    pluginKey: pluginKey, // fill your plugin key
});


root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

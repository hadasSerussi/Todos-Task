import '../styles/globals.css'
import baseUrl from '../helpers/baseUrl'
import initDB from '../helpers/initDB'
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp



import App from "next/app";
import React, { useContext } from 'react'
import { Provider } from "mobx-react";
import { ToastProvider, useToasts } from 'react-toast-notifications'
// import { fetchInitialStoreState, DataStore } from "../stores/DataStore";
import NotesList,{ fetchInitialStoreState} from '../store/notes_store'



class MyApp extends App {
  state = {
    dataStore: NotesList

  };

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    const initialStoreState = await fetchInitialStoreState();


    return {
      ...appProps,
      initialStoreState
    };
  }

  // Hydrate serialized state to store
  static getDerivedStateFromProps(props, state) {
    // state.dataStore.hydrate(props.initialStoreState);
    state.dataStore.notes = props.initialStoreState;

    return state;
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider dataStore={this.state.dataStore}>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </Provider>
    );
  }
}
export default MyApp;

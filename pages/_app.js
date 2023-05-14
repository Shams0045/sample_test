import "@/styles/globals.css";
import "@/styles/styles.css";
import AppContext from "@/components/AppContext";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [store, setStore] = useState();

  return (
    <AppContext.Provider value={{ store, setStore }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { ConfigProvider } from "antd";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#f3c6a4",
          },
        }}
      >
        <Nav />
        <Outlet />
        <Footer />
      </ConfigProvider>
    </>
  );
}

export default App;

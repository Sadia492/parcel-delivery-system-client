import { Outlet } from "react-router";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <MainLayout>
      <Outlet></Outlet>
    </MainLayout>
  );
}

export default App;

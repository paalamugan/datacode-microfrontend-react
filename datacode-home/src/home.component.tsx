import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

export default function Home(props) {
    return (
      <Router>
        <Routes>
          <Route path="home" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    );
}
  
  function Layout() {
    return (
      <div className="px-6 py-3">
        <h1 className="mb-1 text-lg">Welcome to the Home page!</h1>
        <nav>
          <Link to="" className="text-info">Home</Link> |{" "}
          <Link to="invoices" className="text-info">Invoices</Link> |{" "}
          <Link to="dashboard" className="text-info">Dashboard</Link>
        </nav>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
  
  function Invoices() {
    return <h1>Invoices Page</h1>;
  }

  function HomePage() {
    return <h1>Home Page</h1>;
  }
  
  function NotFound() {
    return <h1>Page NotFound</h1>;
  }
  
  function Dashboard() {
    return <h1>Dashboard Page</h1>;
  };

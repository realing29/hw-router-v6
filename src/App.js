import { useState } from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
  useRoutes,
} from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <NavLink to="/users">Users list</NavLink>
    </div>
  );
};

const UsersListPage = () => {
  return (
    <div>
      <h1>Users Layout</h1>
      <NavLink to="/">Home Page</NavLink>
      <Outlet />
    </div>
  );
};

const UsersList = () => {
  const [users] = useState(["q", "q", "q", "q"]);
  return (
    <ul>
      {users.map((u, i) => (
        <li key={"user" + i}>
          <NavLink to={`/users/${i}/profile`}>User {i}</NavLink>
        </li>
      ))}
    </ul>
  );
};

const UserPage = () => {
  const { userId } = useParams();
  return (
    <div>
      <h1>User Page</h1>
      <NavLink to={`/users/${userId}/edit`}>User edit</NavLink>
      <br />
      <NavLink to={`/users`}>Users list</NavLink>
      <p>{"userId: " + userId}</p>
    </div>
  );
};

const UserEditPage = () => {
  const { userId } = useParams();
  return (
    <div>
      <h1>User edit</h1>
      <NavLink to={`/users/${userId}/profile`}>User page</NavLink>
      <br />
      <NavLink to={`/users/${+userId + 1}/profile`}>User another </NavLink>
      <br />
      <NavLink to={"/users/"}>Users list</NavLink>
    </div>
  );
};

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "users",
    element: <UsersListPage />,
    children: [
      { path: "", element: <UsersList /> },
      {
        path: ":userId",
        children: [
          { path: "", element: <Navigate to="profile" /> },
          { path: "profile", element: <UserPage /> },
          { path: "edit", element: <UserEditPage /> },
          { path: "*", element: <Navigate to="profile" /> },
        ],
      },
      { path: "*", element: <Navigate to="/users" /> },
    ],
  },
];
function App() {
  const elements = useRoutes(routes);
  return (
    <>
      <h1>App Layout</h1>
      {elements}
    </>
  );
}

export default App;

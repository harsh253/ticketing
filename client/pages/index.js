import axios from "axios";
import buildClient from "../api/buildClient";

const Index = (initialProps) => {
  console.log(initialProps);
  return <h1>Home</h1>;
};

Index.getInitialProps = async ({ req }) => {
  let currentUserPath = "/api/users/current-user";
  const { data } = await buildClient({ req }).get(currentUserPath);
  return data;
};

export default Index;

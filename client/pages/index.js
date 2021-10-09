import buildClient from "../api/buildClient";

const Index = ({ data, err }) => {
  return data ? <h1>Hi {data.currentUser.email}</h1> : <h1>Not signed in</h1>;
};

Index.getInitialProps = async ({ req }) => {
  let currentUserPath = "/api/users/current-user";
  const res = {
    data: null,
    err: null,
  };
  try {
    const { data } = await buildClient({ req }).get(currentUserPath);
    res["data"] = data;
  } catch (err) {
    res["err"] = err;
  }
  return res;
};

export default Index;

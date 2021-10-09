import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/buildClient";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, data }) => {
  return (
    <div>
      <Header currentUser={data?.currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  let currentUserPath = "/api/users/current-user";
  const client = buildClient(appContext.ctx);

  const res = {
    data: null,
    err: null,
  };
  try {
    const { data } = await client.get(currentUserPath);
    res["data"] = data;
  } catch (err) {
    res["err"] = err;
  }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...res,
  };
};

export default AppComponent;

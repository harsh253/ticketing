import axios from "axios";

const buildClient = ({ req }) => {
  // http://ingress-service-name.namespace.svc.cluster.local/....
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;

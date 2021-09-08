import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body = null, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      let errorInfo = err.response.data.message;
      setErrors(
        <div className="alert alert-danger">
          <ul>
            {errorInfo.map((err) => (
              <li>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return [doRequest, errors];
};

export default useRequest;

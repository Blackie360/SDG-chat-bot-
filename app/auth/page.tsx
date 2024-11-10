import { useRouter } from "next/router";

const ErrorPage = () => {
  const { query } = useRouter();
  const error = query.error;

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>{error ? `Error: ${error}` : "An unknown error occurred. Please try again later."}</p>
    </div>
  );
};

export default ErrorPage;

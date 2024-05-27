import React, { Suspense } from "react";
import SignupForm from "../forms/SignupForm";

// import SignupForm from "../components/SignupForm";
import Loading from "../components/Loading";

const SignupPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SignupForm />
    </Suspense>
  );
};

export default SignupPage;

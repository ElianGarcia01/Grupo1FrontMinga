import { GoogleLogin } from "@react-oauth/google";

const GoogleSignUpButton = () => {
  return (
    <div className="w-full">
      <GoogleLogin
        // onSuccess={handleSuccess}
        // onError={handleError}
        useOneTap
        auto_select
        shape="pill"
        theme="filled_blue"
        text="signup_with"
        locale="en"
        width="100%"
      />
    </div>
  );
};

export default GoogleSignUpButton;
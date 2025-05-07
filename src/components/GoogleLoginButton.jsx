import { GoogleLogin } from "@react-oauth/google";
// import { useDispatch } from "react-redux";
// import { signInWithGoogle } from "../../redux/actions/authAction";
// import { toast } from "react-toastify";

const GoogleLoginButton = () => {
//   const dispatch = useDispatch();

//   const handleSuccess = async (response) => {
//     try {
//       const token = response.credential;
//       if (!token) {
//         throw new Error("No se recibió token de Google");
//       }
      
//       // Mostrar feedback al usuario
//       toast.info("Autenticando con Google...");
      
//       const result = await dispatch(signInWithGoogle(token));
      
//       if (result?.error) {
//         throw new Error(result.error);
//       }
      
//       toast.success("Autenticación exitosa");
//     } catch (error) {
//       toast.error(error.message || "Error al autenticar con Google");
//       console.error("Google auth error:", error);
//     }
//   };

//   const handleError = () => {
//     toast.error("Falló el inicio de sesión con Google");
//     console.error("Google login failed");
//   };

  return (
    <div className="w-full">
      <GoogleLogin
        // onSuccess={handleSuccess}
        // onError={handleError}
        useOneTap
        auto_select
        shape="pill"
        theme="filled_blue"
        text="signin_with"
        locale="en"
        width="100%"
      />
    </div>
  );
};

export default GoogleLoginButton;
import axios from "axios";

const submitRegister = async (data: any) => {
  try {
    const response = await axios.post("/api/auth/register", { data });
    const { code, message }: { code: number; message: string } = response.data;

    if (code === 409) {
      return {
        code: 409,
        message: "This Matric Number is already registered.",
      };
    }
    return {
      code: code,
      message: message,
    };
  } catch (error) {
    return {
      code: 500,
      message: "Internal server error",
    };
  }
};

const resendEmail = async (setIsResending: Function) => {
  try {
    setIsResending(true);

    const email = localStorage.getItem("registrationEmail");

    const response = await axios.post("/api/signup/email/resend", { email });
    if (response.status === 200) setIsResending(false);
  } catch (error) {
    console.log(error);
  }
};

const matricCheck = async (
  form: any,
  setmatricError: Function,
  setIsExist: Function,
  setIsEmpty: Function
) => {
  const matric = form.getValues("matric");

  if (!matric) return;

  try {
    const { data } = await axios.post("/api/auth/register/matric", { matric });
    const { status } = data;

    switch (status) {
      case 409:
        setIsExist(true);
        setmatricError("This Matric Number is already registered.");
        setIsEmpty(false);
        break;

      case 200:
        setIsExist(false);
        setmatricError("");
        setIsEmpty(false);
        break;

      default:
        setIsExist(false);
        setmatricError("");
        setIsEmpty(true);
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

export { submitRegister, matricCheck };

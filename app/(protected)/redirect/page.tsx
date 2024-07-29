import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ADMIN_LOGGEDIN_REDIRECT, USER_LOGGEDIN_REDIRECT } from "@/routes";

const RedirectPage = async () => {
  const session = await auth();

  const role = session?.user.role;
  const redirectUrl =
    role === "ADMIN" ? ADMIN_LOGGEDIN_REDIRECT : USER_LOGGEDIN_REDIRECT;

  redirect(redirectUrl);
};

export default RedirectPage;

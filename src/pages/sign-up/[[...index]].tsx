import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <>
    <div className="mt-16 flex  justify-center">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  </>
);
export default SignUpPage;

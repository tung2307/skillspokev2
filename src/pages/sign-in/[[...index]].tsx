import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <>
    <div className="mt-16 flex  justify-center">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  </>
);

export default SignInPage;

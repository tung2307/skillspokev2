import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";

const SignInPage = () => {
  const { locale, defaultLocale } = useRouter();
  return (
    <>
      <div className="mt-16 flex  justify-center">
        <SignIn
          path={`${locale === defaultLocale ? "" : "/" + locale}/sign-in`}
          signUpUrl={`${locale === defaultLocale ? "" : "/" + locale}/sign-up
`}
        />
      </div>
    </>
  );
};

export default SignInPage;

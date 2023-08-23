import MobileApp from "./MobileApp";

export default function Section3() {
  return (
    <>
      <div className="flex h-[36rem] w-screen flex-col md:flex-row">
        <div className="h-full w-[50vw] border-r"></div>
        <MobileApp />
      </div>
    </>
  );
}

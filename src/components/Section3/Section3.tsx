import MobileApp from "./MobileApp";
import WhyUs from "./WhyUs";

export default function Section3() {
  return (
    <>
      <div className="flex  w-screen flex-col md:h-[36rem] md:flex-row">
        <WhyUs />
        <MobileApp />
      </div>
    </>
  );
}

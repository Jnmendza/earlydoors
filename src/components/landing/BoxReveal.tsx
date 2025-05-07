import { Button } from "@/components/ui/button";
import { BoxReveal } from "../magicui/box-reveal";

const Reveal = () => {
  return (
    <div className='size-full max-w-lg items-center justify-center overflow-hidden pt-8 text-edcream'>
      <BoxReveal boxColor={"#e24e1b"} duration={0.5}>
        <p className='text-[3.5rem] font-semibold'>
          Magic UI<span className='text-edorange'>.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#e24e1b"} duration={0.5}>
        <h2 className='mt-[.5rem] text-[1rem]'>
          UI library for <span className='text-edorange'>Design Engineers</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#e24e1b"} duration={0.5}>
        <div className='mt-6'>
          <p>
            -&gt; 20+ free and open-source animated components built with
            <span className='font-semibold text-edorange'>React</span>,
            <span className='font-semibold text-edorange'>Typescript</span>,
            <span className='font-semibold text-edorange'>Tailwind CSS</span>,
            and
            <span className='font-semibold text-edorange'>Motion</span>
            . <br />
            -&gt; 100% open-source, and customizable. <br />
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#e24e1b"} duration={0.5}>
        <Button className='mt-[1.6rem] bg-edorange'>Explore</Button>
      </BoxReveal>
    </div>
  );
};

export default Reveal;

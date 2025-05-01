import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { NumberTicker } from "../magicui/number-ticker";
import { Fragment } from "react";
import { bebasFont } from "@/lib/font";

const bounceVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

const StatsCard = () => {
  const stats = [
    { value: 5, label: "Supporters Groups" },
    { value: 5, label: "Venues" },
    { value: 5, label: "Monthly Events" },
    { value: 5, label: "Football Clubs" },
  ];

  return (
    <Card className='rounded-none bg-ednavy text-edorange'>
      <CardContent className='flex h-10 items-center justify-evenly'>
        {stats.map((item, index) => (
          <Fragment key={index}>
            <motion.div
              key={`content-${index}`}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={bounceVariants}
              className='flex flex-col items-center'
            >
              <NumberTicker
                value={item.value}
                className='whitespace-pre-wrap text-2xl font-medium tracking-tighter text-edorange dark:text-white'
              />
              <CardDescription
                className={`${bebasFont.className} text-edcream text-2xl`}
              >
                {item.label}
              </CardDescription>
            </motion.div>

            {/* Right-aligned separator (except after last item) */}
            {index !== stats.length - 1 && (
              <Separator
                key={`separator-${index}`}
                orientation='vertical'
                className='mx-4 h-6 bg-gray-400/50'
              />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default StatsCard;

"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInButton } from "@/components/SignInButton";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const PortalLogin = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const pathname = usePathname();

  useEffect(() => {
    // Hide navbar on portal page
    const navbar = document.querySelector("nav");
    if (navbar) navbar.style.display = "none";

    return () => {
      // Restore navbar when leaving
      if (navbar) navbar.style.display = "block";
    };
  }, [pathname]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 '>
      <Image
        src={"/assets/logo-main.png"}
        alt='logo'
        width={200}
        height={200}
        className='mb-4'
      />
      <div className='w-full max-w-md space-y-6 border border-edorange p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {" "}
            {/* Reduced spacing */}
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder='E-mail' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='w-full rounded-none cursor-pointer'
              type='submit'
            >
              Login
            </Button>
          </form>
        </Form>
        <div className='flex items-center justify-center w-1/3 mx-auto'>
          <Separator className='bg-edorange' />
          <p className='m-2'>Or</p>
          <Separator className='bg-edorange' />
        </div>
        <div className='pt-2'>
          {" "}
          <SignInButton />
        </div>
      </div>
    </div>
  );
};

export default PortalLogin;

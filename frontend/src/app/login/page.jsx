"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center h-screen justify-center">
        <FormField
          control={form.control}
          name="username"
          render={({ uname, password }) => (
            <FormItem className='p-5 border-2 ring-offset-background rounded-md'>
              <div>
                <h1 className='text-xl pb-3 font-semibold'>Login</h1>  
              </div>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...uname} />
              </FormControl>
              <FormDescription className='pb-4'>
              </FormDescription>
              <FormMessage />
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="password" {...password} />
              </FormControl>
              <Button type="submit">Submit</Button>
            </FormItem>
          )}
        />

      </form>
    </Form>
  );
}

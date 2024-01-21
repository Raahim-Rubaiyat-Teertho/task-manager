"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
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
import Link from "next/link";
import { HandleLogin, getSessionData } from "./handleSession";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  password: z.string().min(2, {
    message: 'Password must be at least 2 characters'
  })
});

export default function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [wrong, setWrong] = useState(false);

  const onSubmit = async (values) => {
    const lnk = `http://localhost:8080/users/name/${values.username}`;
    const lnk_fetch = await fetch(lnk);
    const lnk_json = await lnk_fetch.json();

    if(lnk_json == null) {
      setWrong(true)
    }

    else {
      if(values.username == lnk_json.uname && values.password == lnk_json.pass) {
        console.log('allow');
        HandleLogin(values);
        setWrong(false)
      }
  
      else {
        setWrong(true);
      }
    }
    
  };

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-center flex-col max-w-96 mx-auto p-3 h-screen">
        <h1 className="font-semibold text-2xl text-center">Login</h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="teertho" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type='password' />
              </FormControl>
              {
                wrong ? (
                  <FormDescription className='text-red-600'>
                    Invalid username or password
                  </FormDescription>
                ) : (
                  <></>
                )
              }
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <Link href={'../'} className="text-center">{'<-'}Back</Link>
      </form>
    </Form>
  )

}

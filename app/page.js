

import Link from "next/link";
import { getTodos } from '@/utils/db'
import Card from "@/components/Card";
import { verifyAuth } from "@/utils/auth";
import { redirect } from "next/navigation";


export default async function Home() {

  const result = await verifyAuth();

  if (!result.user) {
    return redirect('/signup');
  }

  const todos = await getTodos();
  // console.log(users)
  return (
    <main>
      Main page <br />
      <Link href="/todo">create Todo</Link>
      
        {todos.map((todo) => {    
          return <Card key={todo.id} todo={todo}/>
        })}
      
    </main>
  );
}

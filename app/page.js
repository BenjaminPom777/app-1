

import Link from "next/link";
import { getTodos } from '@/utils/db'
import Card from "@/components/Card";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";


export default async function Home() {

  const userSession = await getSession();
  const user = userSession?.user;
  let todos;
  if(user?.id){
     todos = await getTodos(user.id);  
  }
  console.log(todos)
  return (
    <main>
      Main page <br />
      {user?.id && (
        <>
          <Link href="/todo">create Todo</Link>
          {todos.map((todo) => {
            return <Card key={todo.id} todo={todo} />
          })}
        </>
      )}


    </main>
  );
}

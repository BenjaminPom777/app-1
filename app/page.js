

import Link from "next/link";
import { getTodos } from '@/utils/db'
import Card from "@/app/_components/Card";


export default async function Home() {

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

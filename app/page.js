import Image from "next/image";
import Link from "next/link";
// import { getUsers } from '@/utils/db'


export default async function Home() {

  // const users = await getUsers();
  // console.log(users)
  return (
    <main>
      Main page <br/>
      <Link href="/todo">create Todo</Link>
      {/* <ul>
        {users.map((user, index) => {
          const key = user.id || index;
          return <li key={key}>{user.first_name}</li>
        })}
      </ul> */}
    </main>
  );
}

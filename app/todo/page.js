
import { getSession } from '@/utils/auth';
import Form from '../../components/Form';
import { redirect } from 'next/navigation';


const page = async () => {

    const userSession = await getSession();    
    const user = userSession?.user;
    
    if(!user){
        redirect('/login')
    }

    return (
        <div>      
            <Form activeUser={user}/>                  
        </div>
    )
}

export default page
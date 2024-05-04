'use server'

import { redirect ,revalidatePath } from 'next/cache';
import { saveTodo } from '@/utils/db'

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function submitForm(prevState, formData) {
    const todoData = {
        title: formData.get('title'),
        content: formData.get('content'),
    }

    console.log(todoData)

    if (isInvalidText(todoData.title) || isInvalidText(todoData.content)) {
        return {
            message: 'Invalid input.'
        }
    }

    //    await saveMeal(meal)
    await saveTodo(todoData)
    revalidatePath('/');
    redirect('/');
}

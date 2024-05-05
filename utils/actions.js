'use server'

import { revalidatePath } from 'next/cache';
import { saveTodo } from '@/utils/db'
import { redirect } from 'next/navigation'

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function submitForm(prevState, formData) {
    const todoData = {
        title: formData.get('title'),
        content: formData.get('content'),
    }

    if (isInvalidText(todoData.title) || isInvalidText(todoData.content)) {
        return {
            message: 'Invalid input.'
        }
    }

    try {
        await saveTodo(todoData)
    } catch (error) {
      
    }

    revalidatePath('/');
    redirect('/');
}

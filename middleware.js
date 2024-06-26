import { NextRequest } from "next/server";
import { updateSession } from "./utils/auth";

export async function middleware(request) {

    return await updateSession(request);    
}
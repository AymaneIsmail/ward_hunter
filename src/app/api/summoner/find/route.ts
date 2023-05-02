import { redirect } from 'next/navigation';
export async function POST(request: Request) {
    const body = await request.json()

    console.log(body)

    redirect('http://localhost:3000/summoner')

    
}
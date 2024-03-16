import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <>
            <main className="container mx-auto md:grid md:grid-cols-2 gap-12 items-center">
                <Outlet />
            </main>
        </>
    )
}
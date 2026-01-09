import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function LoginSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const userData = searchParams.get('user');

        if (token) {
            localStorage.setItem('token', token);
            if (userData) {
                localStorage.setItem('user', userData);
            }
            
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-xl font-semibold">Completing login, please wait...</p>
        </div>
    );
}
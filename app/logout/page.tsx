'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

const LogoutPage = () => {

    useEffect(() => {
        // Remove the token cookie
        Cookies.remove('token');
        // Reload the page
        window.location.href = '/';
    }, []);

    return null;
};

export default LogoutPage;
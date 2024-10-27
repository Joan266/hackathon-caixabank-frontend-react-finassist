import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {  logout } from '../stores/authStore';
function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    logout(); 
    navigate('/login', { replace: true }); 
  }, [navigate]);

  return null;
}

export default Logout;

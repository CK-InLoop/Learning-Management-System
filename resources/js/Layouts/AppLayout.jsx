import { Head, Link } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';

export default function AppLayout({ auth, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={header} />
            <Toaster position="top-right" />
            
            <Sidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                currentPath={currentPath}
                auth={auth}
            />
            
            <div className="lg:pl-64 flex flex-col flex-1">
                <Navbar 
                    setSidebarOpen={setSidebarOpen} 
                    auth={auth} 
                />
                
                <main className="flex-1 pb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {header && (
                            <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-8">
                                {header}
                            </h1>
                        )}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';
import { useState } from 'react';

export default function DashboardLayout({ title, user, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>{title ? `${title} | ${import.meta.env.VITE_APP_NAME || 'LMS'}` : import.meta.env.VITE_APP_NAME || 'LMS'}</title>
                <meta name="description" content="Learning Management System" />
            </Head>

            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />
            
            <div className="lg:pl-64 flex flex-col flex-1">
                <Navbar user={user} setSidebarOpen={setSidebarOpen} />
                
                <main className="flex-1 pb-8">
                    {/* Page header */}
                    <div className="bg-white shadow">
                        <div className="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
                            <div className="py-6 md:flex md:items-center md:justify-between">
                                <div className="flex-1 min-w-0">
                                    {header ? (
                                        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                            {header}
                                        </h1>
                                    ) : null}
                                </div>
                                <div className="mt-4 flex md:mt-0 md:ml-4">
                                    {/* Add action buttons here if needed */}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Page content */}
                    <div className="mt-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

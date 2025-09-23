import { Link, router } from '@inertiajs/react';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  HomeIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  XMarkIcon,
  UserCircleIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CreditCardIcon,
  BellIcon,
  BookmarkIcon,
  ChartPieIcon,
  ClockIcon,
  DocumentCheckIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Courses', href: '/courses', icon: BookOpenIcon, current: false },
  { name: 'My Learning', href: '/my-learning', icon: AcademicCapIcon, current: false },
  { name: 'Instructors', href: '/instructors', icon: UserGroupIcon, current: false },
  { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon, current: false },
  { name: 'Assessments', href: '/assessments', icon: DocumentCheckIcon, current: false },
  { name: 'Certificates', href: '/certificates', icon: DocumentTextIcon, current: false },
  { name: 'Billing', href: '/billing', icon: CreditCardIcon, current: false },
  { name: 'Notifications', href: '/notifications', icon: BellIcon, current: false },
  { name: 'Bookmarks', href: '/bookmarks', icon: BookmarkIcon, current: false },
  { name: 'Analytics', href: '/analytics', icon: ChartPieIcon, current: false },
  { name: 'History', href: '/history', icon: ClockIcon, current: false },
];

const adminNavigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon, current: true },
  { name: 'Users', href: '/admin/users', icon: UsersIcon, current: false },
  { name: 'Courses', href: '/admin/courses', icon: BookOpenIcon, current: false },
  { name: 'Categories', href: '/admin/categories', icon: TagIcon, current: false },
  { name: 'Enrollments', href: '/admin/enrollments', icon: UserGroupIcon, current: false },
  { name: 'Payments', href: '/admin/payments', icon: CreditCardIcon, current: false },
  { name: 'Certificates', href: '/admin/certificates', icon: DocumentTextIcon, current: false },
  { name: 'Reports', href: '/admin/reports', icon: ChartBarIcon, current: false },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, currentPath, auth }) {
  const isAdmin = auth?.user?.roles?.some(role => role.name === 'admin');
  const isTeacher = auth?.user?.roles?.some(role => role.name === 'teacher');
  
  const navItems = isAdmin ? adminNavigation : navigation;
  
  // Update current path for navigation items
  const updatedNavItems = navItems.map(item => ({
    ...item,
    current: currentPath === item.href || currentPath.startsWith(item.href + '/')
  }));

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <Link href="/">
                  <span className="text-2xl font-bold text-primary-600">LMS</span>
                </Link>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {updatedNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                          'mr-4 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <Link href="/profile" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <UserCircleIcon className="inline-block h-10 w-10 rounded-full text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        {auth.user?.name}
                      </p>
                      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/">
              <span className="text-2xl font-bold text-primary-600">LMS</span>
            </Link>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {updatedNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Link href="/profile" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <UserCircleIcon className="inline-block h-9 w-9 rounded-full text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {auth.user?.name}
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    View profile
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

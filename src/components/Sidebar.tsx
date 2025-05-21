"use client";
import React from 'react';
import { SidebarProvider, Sidebar as ShadcnSidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import Link from 'next/link';
import ListItem from '@/components/ListItem';
import { useParams } from 'next/navigation';

const sessions = [
  'session1',
  'session2',
  'session3',
]

const Sidebar = () => {
  const { sessionId } = useParams<{ sessionId: string; }>()

  return (
    <SidebarProvider defaultOpen>
      <ShadcnSidebar>
        <SidebarHeader>
         <ListItem tag="button" className="bg-white border border-gray-200 shadow-sm rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
           New Chat
         </ListItem>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col gap-4 mx-2">
            <h2 className="text-lg font-semibold px-2">Sessions</h2>
            <div className="flex flex-col gap-2">
              {sessions.map((session) => (
                <Link href={`/session/${session}`} key={session}>
                  <ListItem active={sessionId === session}>
                    {session}
                  </ListItem>
                </Link>
              ))}
            </div>
          </div>
        </SidebarContent>
      </ShadcnSidebar>
    </SidebarProvider>
  )
};

export default Sidebar;
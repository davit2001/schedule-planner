"use client";
import React, { useState } from 'react';
import { SidebarProvider, Sidebar as ShadcnSidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import Link from 'next/link';
import ListItem from '@/components/ListItem';
import { useParams } from 'next/navigation';
import useSessions from '@/hooks/useSessions';

const Sidebar = () => {
  const { sessionId } = useParams<{ sessionId: string; }>();
  const [isLoading, setIsLoading] = useState(false);
  const { data: sessions, loadingSessions } = useSessions();

  const createSession = () => {
    setIsLoading(true);
    fetch('/api/session/createSession', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sessionID) {
          window.location.href = `/session/${data.sessionID}`;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SidebarProvider defaultOpen>
      <ShadcnSidebar>
        <SidebarHeader>
         <ListItem
           onClick={createSession}
           tag="button"
           className="bg-white border border-gray-200 shadow-sm rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
         >
           {
             isLoading ? 'Creating new chat...' : 'New Chat'
           }
         </ListItem>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col gap-4 mx-2">
            <h2 className="text-lg font-semibold px-2">Sessions</h2>
            <div className="flex flex-col gap-2 h-[100vh-120px] overflow-y-auto">
              {!isLoading && !!sessions?.length  && sessions?.map((session_id) => (
                <Link href={`/session/${session_id}`} key={session_id}>
                  <ListItem active={sessionId == session_id}>
                    {session_id}
                  </ListItem>
                </Link>
              ))}
              {loadingSessions && (
                <ListItem className="bg-gray-100 border border-gray-200 shadow-sm rounded-md text-gray-700">
                  Loading sessions...
                </ListItem>
              )}
            </div>
          </div>
        </SidebarContent>
      </ShadcnSidebar>
    </SidebarProvider>
  )
};

export default Sidebar;
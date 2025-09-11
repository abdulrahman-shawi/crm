// src/context/UserContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 1. Define the shape of the data you want to share
interface UserContextType {
  name: string;
  ID: string;
  isLoading: boolean; // Add a loading state
}

// 2. Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. Create the Provider component
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("");
  const [ID, setID] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Start in loading state

  // This useEffect contains the exact same logic you had in the sidebar
  const router = useRouter();

  useEffect(() => {
    const key = "auth_token";
    const data = localStorage.getItem(key);

    if (data) {
      try {
        const parsed = JSON.parse(data);
        const createdAt = parsed.createdAt;
        const email = parsed.email;

        fetch(
          "http://localhost:5678/webhook/ab5e5394-8181-4537-9dc7-dbd8ae6017fb",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            // Handle non-2xx responses
            console.error("Fetch failed with status:", res.status);
            router.push("/login"); // Redirect on error
            return Promise.reject('API call failed');
          }
        })
        .then((data) => {
          console.log(data[0].name)
             setID(data[0].id);
             setName(data[0].name);
             console.log(`r ${ID} - ${name}`)
        })
        .catch((error) => {
          console.error("Error:", error);
        });

        // Check token age
        if (Date.now() - createdAt > 30 * 24 * 60 * 60 * 1000 || !email) {
          router.push("/login");
        }
      } catch (e) {
        localStorage.removeItem(key);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
    // Use an empty dependency array [] to run this effect only once on mount
  }, [router]);  // Empty array ensures this runs only once

  const value = { name, ID, isLoading };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// 4. Create a custom hook for easy access to the context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
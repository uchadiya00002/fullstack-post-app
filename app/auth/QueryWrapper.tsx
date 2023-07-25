"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
interface Props {
  children?: ReactNode;
}

const queryClient = new QueryClient();
const QueryWrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};

export default QueryWrapper;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppContext from "./contexts/AppContext";
import { SearchContext } from "./contexts/SearchContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContext>
          <SearchContext>
            <AppRoutes />
          </SearchContext>
        </AppContext>
      </Router>
    </QueryClientProvider>
  </StrictMode>
);

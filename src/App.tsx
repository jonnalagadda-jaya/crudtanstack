import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TableView from './component/TableView';
import { ThemeProvider } from './component/Theme';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TableView />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

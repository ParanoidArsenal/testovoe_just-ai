import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { PageWrap } from './components/PageWrap/PageWrap';
import { GlobalProvider, GlobalContext} from './globalState/globalState';
import { UserSearch } from './components/UserSearch/UserSearch';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <PageWrap>
          <UserSearch/>
        </PageWrap>
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default App;

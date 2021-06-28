import React, { useContext, useEffect } from 'react';
import './App.css';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { PageWrap } from './components/PageWrap/PageWrap';
import { SearchField } from './components/SearchField/SearchField';
import { Spinner } from './components/Spinner/Spinner';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './App.style';
import { GlobalProvider, GlobalContext} from './globalState/globalState';
import { loadList } from './globalState/actions/globalActions';
import { getUserGroups, UserList } from './components/UserList/UserList';
import Paper from '@material-ui/core/Paper';
import { UserSearch } from './components/UserSearch/UserSearch';

function App() {
  const isLoading = false;
  const classes = useStyles();
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

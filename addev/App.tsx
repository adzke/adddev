import { useReactiveVar } from '@apollo/client';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { getData, getLoginToken, tokenVerifyorRemove, verifyAuthToken } from './components/api_functions/api-functions';
import { rvAuthorisedUser, rvContacts, rvCurrentCompany, rvCurrentCompanyContacts } from './components/common/common-states';
import { Dashboard } from './components/dashboard/dashboard';

export default function App() {

  const authorisedUser = useReactiveVar(rvAuthorisedUser)
  const contacts = useReactiveVar(rvContacts)
  const currentCompany = useReactiveVar(rvCurrentCompany)

  useEffect(() => {
    getLoginToken()
  }, []);

  useEffect(() => {
    if (authorisedUser) {
      tokenVerifyorRemove(authorisedUser)
    }
  }, [authorisedUser]);

  useEffect(() => {
    if (authorisedUser) {
      getData(authorisedUser)
    }
  }, [authorisedUser]);

  return (
    <Dashboard />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { useReactiveVar } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { getData, getLoginToken, tokenVerifyorRemove } from './components/api_functions/api-functions';
import { rvAuthorisedUser, rvContacts, rvCurrentCompany, rvCurrentCompanyContacts } from './components/common/common-states';
import { Dashboard } from './components/dashboard/dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from './components/common/header';
import { CRMHome } from './components/crm/crm-home';
import { AppsDashboard } from './components/apps/apps-dashboard';
import { Login } from './components/login/login';
import { LoginHandler } from './components/login/login-handler';

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
      getData(authorisedUser)
    }
  }, [authorisedUser]);

  useEffect(() => {
    if (contacts && currentCompany) {
      rvCurrentCompanyContacts(contacts.filter(contact => contact.company_name === currentCompany?.company_name))
    }
  }, [currentCompany, contacts]);

  return (
    <NavigationContainer >
      <LoginHandler>

      </LoginHandler>
    </NavigationContainer>

  );
}

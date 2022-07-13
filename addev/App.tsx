import { useReactiveVar } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { getData, getLoginToken, tokenVerifyorRemove, verifyAuthToken } from './components/api_functions/api-functions';
import { rvAuthorisedUser, rvContacts, rvCurrentCompany, rvCurrentCompanyContacts } from './components/common/common-states';
import { Dashboard } from './components/dashboard/dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from './components/common/header';
import { CRMHome } from './components/crm/crm-home';
import { AppsDashboard } from './components/apps/apps-dashboard';

export default function App() {

  const authorisedUser = useReactiveVar(rvAuthorisedUser)
  const contacts = useReactiveVar(rvContacts)
  const currentCompany = useReactiveVar(rvCurrentCompany)


  const Stack = createNativeStackNavigator<ADDevParamList>();

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
      <Stack.Navigator initialRouteName='Dashboard' screenOptions={{
        header: (props) => <Header {...props} />,
      }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CRM" component={CRMHome} />
        <Stack.Screen name="Apps" component={AppsDashboard} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

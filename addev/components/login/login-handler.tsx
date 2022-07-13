import { useReactiveVar } from "@apollo/client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { PropsWithChildren } from "react";
import { AppsDashboard } from "../apps/apps-dashboard";
import { rvAuthorisedUser } from "../common/common-states";
import { Header } from "../common/header";
import { CRMHome } from "../crm/crm-home";
import { Dashboard } from "../dashboard/dashboard";
import { Login } from "./login";

export const LoginHandler = ({ children }: PropsWithChildren<{}>) => {

    const authorisedUser = useReactiveVar(rvAuthorisedUser)

    const Stack = createNativeStackNavigator<ADDevParamList>();

    if(!authorisedUser){
        return (
            <Stack.Navigator initialRouteName='Login' screenOptions={{
                headerShown: false,
              }}>
                <Stack.Screen name="Login" component={Login} />
            
              </Stack.Navigator>
        )
    }
    return (
        <Stack.Navigator initialRouteName='Dashboard' screenOptions={{
            header: (props) => <Header {...props} />,
          }}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="CRM" component={CRMHome} />
            <Stack.Screen name="Apps" component={AppsDashboard} />
        
          </Stack.Navigator>
    )

    

}

import {ViewLayoutStructure} from "../components/ViewLayoutStructure";
import {LoginPageView} from "../pages/authentication/LoginPageView";
import React from "react";

// Move the Stack creation outside the component

export const AuthenticationStack = ({stack}) => {
  return (
    <ViewLayoutStructure navbarVisible={false}>
      <stack.Navigator
        screenOptions={{headerShown: true, animation: "fade"}}
        initialRouteName="Log in"
      >
        {/* Main pages */}
        <stack.Screen name="Log in" component={LoginPageView}/>
      </stack.Navigator>
    </ViewLayoutStructure>
  );
};

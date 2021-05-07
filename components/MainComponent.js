import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfo';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

//Set a stack navigator 
const DirectoryNavigator =createStackNavigator({
    Directory: { screen: Directory },
    CampsiteInfo: { screen: CampsiteInfo }
},
{
    initialRouteName: 'Directory',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#5637DD'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
}
);
//Create a connectionfrom a top level navigation to the react-native env
const AppNavigator = createAppContainer(DirectoryNavigator)


class Main extends Component {
        render() {
        return (
            <View style={{
                flex:1,
                paddingTop: Platform.OS ==='ios' ? 0 : Expo.Constants.statusBarHeight
            }}>
                <AppNavigator />
            </View>
            
        ); 
    }
}

export default Main;
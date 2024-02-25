import React, { useState } from 'react';
import { Login } from './pages/Login'; 
import { Dashboard } from './pages/Home'; 
import { Config } from './pages/Info'; 


import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export function Routes() {
    return(
        <Tab.Navigator>
        <Tab.Screen
            name="Login"
            component={Login}
            options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
                if (focused) {
                return <Ionicons size={size} color={color} name="home" />;
                }
                return <Ionicons size={size} color={color} name="home-outline" />;
            },
            }}
        />
        <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
                if (focused) {
                return <Ionicons size={size} color={color} name="document" />;
                }
                return <Ionicons size={size} color={color} name="document-outline" />;
            },
            }}
        />
        

        <Tab.Screen
            name="Info"
            component={Config}
            options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
                if (focused) {
                return <Ionicons name="information-circle" size={24} color="#5772ff" />;
                }
                return <Ionicons size={size} color={color} name="information-circle-outline" />;
            },
            }}
        />
        </Tab.Navigator>
    )}

/*


        <Tab.Screen
            name="Graficos"
            component={Charts}
            options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
                if (focused) {
                return <AntDesign name="linechart" size={24} color="#5772ff" />;
                }
                return <AntDesign name="linechart" size={24} color="grey" />;
            },
            }}
        />


*/
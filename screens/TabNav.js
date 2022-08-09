const TabNavigator = () => {
      return(
      <Tab.Navigator
        tabBarOptions = {{
          activeBackgroundColor: 'blue',
          inactiveBackgroundColor: '#eee',
          activeTintColor: 'white',
          inactiveTintColor: 'black',
        }}
      >
        <Tab.Screen name='LandingScreen' component={LandingScreen} 
          options={{
            headerShown: false,
            tabBarIcon: ({size, color}) => <MaterialCommunityIcons name='home' size={size} color={color}/>
          }}
        />
        <Tab.Screen name='Home' component={Home}
          options={{
            tabBarIcon: ({size, color}) => <MaterialCommunityIcons name='home' size={size} color={color}/>
          }}
         />
         <Tab.Screen name='AboutScreen' component={AboutScreen} 
          options={{
            tabBarIcon: ({size, color}) => <MaterialCommunityIcons name='home' size={size} color={color}/>
          }}
        />
      </Tab.Navigator>
    )}

export default TabNavigator;
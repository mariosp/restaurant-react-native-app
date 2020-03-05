import React, {Component} from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent"
import Dishdetail from "./DishdetailComponent";
import {View, Platform} from "react-native";
import {createDrawerNavigator, createStackNavigator} from "react-navigation";
import Contact from "./ContactComponent";
import About from "./AboutComponent";

const MenuNavigation = createStackNavigator({
    Menu: { screen: Menu},
    Dishdetail: { screen: Dishdetail}
}, {
    initialRouteName: "Menu",
    navigationOptions: {
        headerStyle:{
            backgroundColor: "#512DAB"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    }
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home},
}, {
    navigationOptions: {
        headerStyle:{
            backgroundColor: "#512DAB"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    }
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact},
}, {
    navigationOptions: {
        headerStyle:{
            backgroundColor: "#512DAB"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    }
});

const AboutNavigator = createStackNavigator({
    Contact: { screen: About},
}, {
    navigationOptions: {
        headerStyle:{
            backgroundColor: "#512DAB"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    }
});

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home'
        }
    },
    About:{
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About',
            drawerLabel: 'About Us'
        }
    },
    Menu: {
        screen: MenuNavigation,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu'
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact'
        }
    }
},{
    drawerBackgroundColor: "#D1C4E9"
});

class Main extends Component{
    render() {
        return(
            <View style={{flex: 1, paddingTop: Platform.OS ==='ios'? 0:0}}>
               <MainNavigator/>
            </View>
        );
    }
}

export default Main;

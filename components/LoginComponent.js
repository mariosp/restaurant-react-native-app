import React,{ Component} from "react";
import { View, Button, StyleSheet} from "react-native";
import { Card, Icon, Input, CheckBox} from "react-native-elements";
import * as SecureStore from 'expo-secure-store';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {
        title: 'Login'
    };

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata)=> {
                let userinfo = JSON.parse(userdata);
                if(userinfo) {
                    this.setState({
                        username: userinfo.username,
                        password: userinfo.password,
                        remember: true
                    });
                }
            });
    }

    handleLogin() {
        console.log(JSON.stringify(this.state))
        if(this.state.remember){
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username:this.state.username, password: this.state.password})
                ).catch(error => console.log("Could not save user info", error))
        } else {
            //DELETE INFO FROM SECURE STORE WHEN REMEMBER ME IS NOT CHECKED
            SecureStore.deleteItemAsync('userinfo')
                .catch(error => console.log("Could not delete user info"));
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{type: "font-awesome", name: 'user-o'}}
                    onChangeText={(username)=> this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />

                <Input
                    placeholder="Password"
                    leftIcon={{type: "font-awesome", name: 'key'}}
                    onChangeText={(password)=> this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />

                <CheckBox
                    title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={()=> this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                  />

                  <View style={styles.formButton}>
                      <Button
                          title='Login'
                          onPress={()=> this.handleLogin()}
                          color='#512DAB'
                      />
                  </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formInput: {
        marginTop:40,
        marginBotto: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;

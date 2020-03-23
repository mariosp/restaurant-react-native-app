import React,{ Component} from "react";
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert} from "react-native";
import DatePicker from "react-native-datepicker";
import * as Animatable from "react-native-animatable";
import { Notifications} from "expo";
import * as Permissions from 'expo-permissions';

class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: ''
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    };

    handleReservation(){
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Your Reservation',
            `Number of Guests: ${this.state.guests} \n Smoking? ${this.state.smoking? 'Yes': 'No'}  \n Date and Time:  ${this.state.date}`,
            [
                {
                    text: 'Cancel',
                    onPress: () => this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () =>{
                        this.presentLocalNotification(this.state.date);
                        this.resetForm();
                    }
                },
                {cancelable: false}
            ]
        );
    }

    resetForm(){
        this.setState({ //reset form
            guests: 1,
            smoking: false,
            date: ''
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if(permission.status !== "granted") {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.status !== "granted"){
                Alert.alert('Permission not granted to show local notification');
            }
        }
        return permission;
    }

    async presentLocalNotification(date){
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: "Your reservation",
            body: "Reservation for " + date + " is confirmed",
            ios: {
                sound:true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DAB'
            }
        });
    }

    render() {
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex)=> this.setState({guests: itemValue})}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor='#512DAB'
                            onValueChange={(value)=> this.setState({smoking: value})}
                        >
                        </Switch>
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style={{flex:2, marginRight: 20}}
                            date={this.state.date}
                            format=''
                            mode='datetime'
                            placeholder='select date and time'
                            minDate='2017-01-01'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date)=> this.setState({date: date})}
                        />
                    </View>

                    <View style={styles.formRow}>
                        <Button
                            title='Reserve'
                            color='#512DAB'
                            onPress={()=> this.handleReservation()}
                            />
                    </View>
                </Animatable.View>

            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Reservation;

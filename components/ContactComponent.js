import React, {Component} from "react";
import {Card} from "react-native-elements";
import {Text, View} from "react-native";


class Contact extends Component{

    render() {
        return(
            <View>
                <Card
                    title="Contact Information"
                >
                    <Text style={{margin: 10}}>
                        Clear Water Bay, Kowloon
                    </Text>
                    <Text style={{margin: 10}}>
                        HONG KONG
                    </Text>
                    <Text style={{margin: 10}}>
                        Tel: +852 1234 5678
                    </Text>
                    <Text style={{margin: 10}}>
                        Fax: +852 8765 4321
                    </Text>
                    <Text style={{margin: 10}}>
                        Email:confusion@food.net
                    </Text>
                </Card>
            </View>
        );
    }
}

export default Contact;

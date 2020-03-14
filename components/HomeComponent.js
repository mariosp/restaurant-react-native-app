import React, {Component} from 'react';
import {ScrollView, View, Text} from "react-native";
import { Card } from "react-native-elements";
import {connect } from "react-redux";
import {baseUrl} from "../shared/baseUrl";

const mapStateToProps = state =>{
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

const RenderItem = (props) =>{
    const item = props.item;

    if(item!= null){
        return(
            <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{uri: baseUrl + item.image}}
            >
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }else {
        return (<View></View>)
    }
};

class Home extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: "Home"
    };

    render() {
        return(
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
                />
                <RenderItem item={this.props.promotions.promotions.filter((promo)=> promo.featured)[0]}
                />
                <RenderItem item={this.props.leaders.leaders.filter((leader)=> leader.featured)[0]}
                />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Home);

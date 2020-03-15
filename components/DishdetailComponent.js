import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, StyleSheet, Modal} from "react-native";
import {Card, Icon, Button, Rating, Input} from "react-native-elements";
import {connect } from "react-redux";
import {baseUrl} from "../shared/baseUrl";
import {postComment, postFavorite} from "../redux/ActionCreators";
import {SafeAreaView} from "react-navigation";
import * as Animatable from "react-native-animatable";

const mapStateToProps = state =>{
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
};

const mapDispatchToProps = (dispatch)=> ({
    postFavorite: (dishId)=> dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment, date) => dispatch(postComment(dishId, rating, author, comment, date))
});

const RenderDish = (props) =>{
    const dish = props.dish;

    if(dish!= null){
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                    featuredTitle={dish.name}
                    image={{uri:baseUrl + dish.image}}
                >
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.buttonsRow}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite? 'heart' : 'heart-o'}
                            type="font-awesome"
                            color="#f50"
                            onPress={()=> props.favorite? console.log('Already favorite') : props.onPress()}
                            />
                        <Icon
                            raised
                            reverse
                            name="pencil"
                            type="font-awesome"
                            color="#512DAB"
                            onPress={()=> props.toggleAddCommentModal()}
                        />
                    </View>
                </Card>
            </Animatable.View>
        )
    }else {
        return (<View></View>)
    }

};

const RenderComments = (props) =>{
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin:10}} >
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'--' + item.author + ',' + new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(item.date)))}</Text>
            </View>
        )
    }

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
};

class Dishdetail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            rating: 1,
            author: '',
            comment: '',
            showModal: false
        };

        this.toggleAddCommentModal = this.toggleAddCommentModal.bind(this);
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: "Dish Detail"
    };

    toggleAddCommentModal(){
        this.setState({showModal: !this.state.showModal})
    }

    handleComment(){
        const {rating, author, comment} = this.state;
        const dishId = Number(this.props.navigation.getParam('dishId'));
        const date = new Date().toISOString();
        this.props.postComment(dishId, rating, author, comment, date );
    }

    resetForm(){
        this.setState({
            rating: 1,
            author: '',
            comment: ''
        });
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId');

        return(
            <ScrollView>
                <RenderDish
                    dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el=== dishId)}
                    toggleAddCommentModal={this.toggleAddCommentModal}
                    onPress={()=> this.markFavorite(dishId)}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment)=> comment.dishId === +dishId)}/>

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                >
                    <SafeAreaView
                        style={styles.container}
                        forceInset={{top: 'always', horizontal: 'never'}}
                    >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            fractions="{1}"
                            startingValue={1}
                            minValue={1}
                            style={styles.modalRow}
                            onFinishRating={(rating)=>this.setState({rating: rating})}
                        />

                        <Input
                            containerStyle={styles.modalRow}
                            placeholder='Author'
                            leftIcon={
                                <Icon name="user-o" type="font-awesome" />
                            }
                            leftIconContainerStyle={{marginRight: 10, marginLeft:0}}
                            placeholderTextColor="grey"
                            onChangeText={(author) => this.setState({author: author})}
                        />

                        <Input
                            containerStyle={styles.modalRow}
                            placeholder='Comment'
                            leftIcon={
                                <Icon name="comments-o" type="font-awesome" />
                            }
                            leftIconContainerStyle={{marginRight: 10, marginLeft:0}}
                            placeholderTextColor="grey"
                            onChangeText={(comment) => this.setState({comment: comment})}
                        />

                        <Button
                            title="Submit"
                            onPress={()=> {this.handleComment(); this.toggleAddCommentModal(); this.resetForm()}}
                            style={styles.modalRow}
                        />

                        <Button
                            title="Cancel"
                            onPress={()=> {this.toggleAddCommentModal(); this.resetForm()}}
                            buttonStyle={{
                                backgroundColor: "grey",
                            }}
                            style={styles.modalRow}
                        />
                    </View>
                    </SafeAreaView>
                </Modal>
            </ScrollView>
            );
    }
};

const styles = StyleSheet.create({
    buttonsRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex:1
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    container: {
        flex:1
    },
    modalRow: {
        marginBottom: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

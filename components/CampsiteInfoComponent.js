import React, { Component } from 'react';
import { Text, View,ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments
    };
};

function RenderCampsite(props) {
    //Destructring the campsite props from the entre props en haut 
    const {campsite} = props;

    if(campsite) {
        return(
            <Card
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}}>
                <Text style={{margin:10}} >
                  {campsite.description}  
                </Text>
                <Icon
                   name={props.favorite ? 'heart' : 'heart-o' }
                   type='font-awesome'
                   color='#f50'
                   raised
                   reverse
                   //Pass the onpress and make sure you can press by just once
                   onPress={() => props.favorite ? console.log('Already set as a favorite') : props.markFavorite()}

                />
            </Card>
        );
    }
    return (
        <View />
    )
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return(
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`--${item.author}, ${item.date}`}</Text>
            </View>
        );
    }
    return(
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
}
 class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        };
    }

    //Event handler to toggle the favorite icon to true
    markFavorite() {
        this.setState({favorite: true});
    }

    //Set the title for the screen
    static navigationOptions = {
        title: 'CampsiteInfo'
    }

    render() {
        //Create an array of object with props naviation then filter it to get each campsiteId 
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        //Filter out (into a new array called 'comments') only the comments for a particular campsite using campsiteId
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite} 
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        
    );
    }
    
}

export default connect(mapStateToProps) (CampsiteInfo);
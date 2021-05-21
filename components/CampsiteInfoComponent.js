import React, { Component } from 'react';
import { Text, View,ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId))
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
                <View style={styles.cardRow}>
                    <Icon
                   name={props.favorite ? 'heart' : 'heart-o' }
                   type='font-awesome'
                   color='#f50'
                   raised
                   reverse
                   //Pass the onpress and make sure you can press by just once
                   onPress={() => props.favorite ? console.log('Already set as a favorite') : props.markFavorite()}

                />
                <Icon
                    name='pencil'
                    type='font-awesome'
                    color='#5637DD'
                    raised
                    reverse
                    onPress={() => props.onShowModal()}
                />
                </View>
                
                
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
    //Week 2 Assign Task 1
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }
    
    //Week 2 Assign Task 1
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    onShowModal() {
        this.toggleModal()
    }

    

    //Event handler to toggle the favorite icon to true
    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
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
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />
               
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <View style={{margin: 10}}>
                            <Button
                            onPress={() => {
                                this.toggleModal();
                            }}
                            color='#808080'
                            title='Cancel'
                        />
                        </View>
                        
                    </View>
                </Modal>
            </ScrollView>
        
    );
    }
    
}

//Modal Stylesheet
const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
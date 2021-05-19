import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        campsites: state.campsites
    };
};
class Directory extends Component {

    //Set the header of this compoment
    static navigationOptions = {
        title: 'Directory'
    };

    render() {
        //Get a naviagation props to navigate to other pages(see documentations)
        const {navigate} = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
        return (
            <Tile 
                title={item.name}
                caption={item.description}
                featured
                onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                imageSrc={{uri: baseUrl + item.image}}                
            />
        );
    };

    return (
        <FlatList 
            data={this.props.campsites.campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
            
        />
    );
}
    }

    



export default connect(mapStateToProps) (Directory);

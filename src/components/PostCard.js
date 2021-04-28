import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';
import { COLORS, FONT_SIZES, RADIUS, SPACING } from '../config/config';

const PostCard = ({post}) => {
    return(
        <View style={Styles._mainContainer}>
            <View style={Styles._topCardView}>
                <Image 
                    source={{ uri: post.owner.picture }}
                    style={Styles._userAvatar}
                />
                <View style={Styles._topDetailsContainer}>
                    <Text numberOfLines={1} style={Styles._userName}>{post.owner.firstName + ' ' + post.owner.lastName}</Text>
                    <Text numberOfLines={1} style={Styles._userEmail}>{post.owner.email}</Text>
                </View>
            </View>
            <Image 
                source={{ uri: post.image }}
                style={Styles._postImage}
            />
            <Text numberOfLines={1} style={Styles._title}>{post.text}</Text>
            <Text numberOfLines={1} style={Styles._link}>{post.link}</Text>

            <View style={Styles._likesDateView}>
                <View style={Styles._likesView}>
                    <Image 
                        source={require('../assets/heart.png')}
                        style={Styles._heartIcon}
                    />
                    <Text style={Styles._likes}>Likes <Text>{post.likes}</Text></Text>
                </View>
                <Text style={Styles._date}>{post.publishDate}</Text>
            </View>
            <Text style={Styles._hyperlink}>Get Posts Comments</Text>
            <Text style={Styles._hyperlink}>Get Owner Profile</Text>
        </View>
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        width: '100%',
        padding: SPACING,
        backgroundColor: 'white',
        borderRadius: RADIUS,
        shadowColor: 'black',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: RADIUS/2,
        elevation: 10,
        marginBottom: SPACING
    },
    _topCardView:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 1,
        marginBottom: SPACING,
        paddingBottom: SPACING,
    },
    _userAvatar:{
        width: 60,
        height: 60,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    _topDetailsContainer:{
        width: '78%',
        marginLeft: SPACING/2
    },
    _userName:{
        fontSize: FONT_SIZES.info2,
        fontWeight: '500',
    },
    _userEmail:{
        fontSize: FONT_SIZES.info3,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.5)',
        marginTop: SPACING/5
    },
    _postImage:{
        width: '100%',
        height: 350,
        borderRadius: RADIUS,
        resizeMode: 'cover',
        marginBottom: SPACING
    },
    _title:{
        fontSize: FONT_SIZES.h5,
        fontWeight: '500',
    },
    _link:{
        fontSize: FONT_SIZES.info1,
        color: COLORS.primaryColor,
        textDecorationLine: 'underline',
        marginTop: SPACING/5
    },
    _likesDateView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.3)',
        borderTopWidth: 1,
        paddingVertical: SPACING,
        marginTop: SPACING,
        marginBottom: SPACING
    },
    _likesView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    _heartIcon:{
        width: 15,
        height: 15,
        resizeMode: 'center'
    },
    _likes:{
        fontSize: FONT_SIZES.info2,
        fontWeight: '400',
        marginLeft: SPACING/2
    },
    _date:{
        fontSize: FONT_SIZES.info2,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.5)',
    },
    _hyperlink:{
        fontSize: FONT_SIZES.info2,
        color: COLORS.primaryColor,
        fontWeight: '400',
        textDecorationLine: 'underline',
        marginBottom: SPACING/5
    },
});

export default PostCard;
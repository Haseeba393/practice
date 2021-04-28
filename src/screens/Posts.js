import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    Text,
    TextInput,
} from 'react-native';

import { _POST_API } from '../apis/apis';
import PostCard from '../components/PostCard';
import { COLORS, FONT_SIZES, LOADER_SIZE, RADIUS, SPACING } from '../config/config';

const Posts = () => {

    const [Search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(0);
    const [postLoading, setPostLoading] = useState(false);
    const [nextPostLoading, setNextPostLoading] = useState(false);
    const [initialCall, setInitialCall] = useState(false);

    // Function to fetch posts
    const _fetchPosts = async () => {
        try {
            setPostLoading(true);
            await _POST_API(limit, page)
            .then((response)=>{
                setPosts(response.data.data);
            })
            .catch((err)=>{
                alert(err);
                console.log(err);
            })
            .finally(()=>{
                setPostLoading(false);
            })
        } catch (err) {
            alert(err);
            console.log(err);
        }
    }

    const _fetchNextPosts = async () => {
        try {

            setLimit(limit + 5);
            if(limit >= 50){
                setLimit(5);
                setPage(page + 1);
                if(page > 999)
                    setPage(999);
            }

            setNextPostLoading(true);
            await _POST_API(limit, page)
            .then((response)=>{
                let concatedPosts = posts.concat(response.data.data);
                setPosts(concatedPosts);
            })
            .catch((err)=>{
                alert(err);
                console.log(err);
            })
            .finally(()=>{
                setNextPostLoading(false);
            })
        } catch (err) {
            alert(err);
            console.log(err);
        }

    }

    console.log(posts);
    useEffect(()=>{
        if(!initialCall){
            _fetchPosts();
            setInitialCall(true);
        }
    },[])

    return(
        !postLoading ? (
            <View style={Styles._mainContainer}>

                <View
                    style={{
                        width: '100%',
                        height: '10%',
                        padding: SPACING
                    }}
                >
                    <TextInput 
                        placeholder='Search'
                        selectionColor={COLORS.primaryColor}
                        value={Search}
                        onChangeText={text => setSearch(text)}
                        style={Styles._inputStyle}
                    />
                </View>

                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    contentContainerStyle={Styles._scrollContainer}
                    onEndReached={_fetchNextPosts}
                    ListFooterComponent={()=>{
                        return(
                            nextPostLoading ? (
                                <ActivityIndicator 
                                    color={COLORS.primaryColor}
                                    size={LOADER_SIZE}
                                    style={{
                                        alignSelf: 'center',
                                        marginVertical: SPACING
                                    }}
                                />
                            ):(
                                null
                            )
                        );
                    }}
                    keyExtractor={item => item.id}
                    renderItem={({item, index})=>{
                        return(
                            <PostCard 
                                post={item}
                            />
                        );
                    }}
                />
            </View>
        ):(
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator 
                    color={COLORS.secondaryColor}
                    size={LOADER_SIZE}
                />
                <Text style={{
                    color: COLORS.secondaryColor,
                    fontWeight: '400',
                    marginTop: SPACING/2
                }}>Fetching Posts...</Text>
            </View>
        )
        
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        flex: 1,
        paddingTop: SPACING * 5
    },
    _inputStyle:{
        width: '100%',
        height: '100%',
        paddingHorizontal: SPACING,
        fontSize: FONT_SIZES.info3,
        backgroundColor: 'white',
        borderRadius: RADIUS,
        shadowColor: 'black',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: RADIUS/2,
        elevation: 10,
    },
    _scrollContainer:{
        padding: SPACING
    },
});

export default Posts;
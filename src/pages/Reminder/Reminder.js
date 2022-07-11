import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import TopBar from '../../components/TopBar/TopBar';

export default function Reminder() {
    return (
        <>
  
        <View style={styles.container}>
            <Text style={styles.text}>Reminder</Text>
        </View>
        </>
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text:{
        fontSize: 25,
        fontWeight: 'bold'
    }
});
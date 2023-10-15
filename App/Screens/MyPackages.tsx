import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, } from 'react-native';

const MyPackages = () => {
 return (
    <SafeAreaView>
        <View>
            <Text> My Packages</Text>
        </View>
    </SafeAreaView>
 )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default MyPackages;
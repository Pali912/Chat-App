import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MessageBubble = ({ message, sender, timestamp, isUser }) => {
    const bubbleStyle = isUser ? styles.userBubble : styles.otherBubble;
    const textStyle = isUser ? styles.userText : styles.otherText;
    const senderStyle = isUser ? styles.userSender : styles.otherSender;
    const alignStyle = isUser ? styles.userAlign : styles.otherAlign;

    return (
        <View style={[styles.container, bubbleStyle, alignStyle]}>
            <Text style={senderStyle}>{sender}</Text>
            <Text style={textStyle}>{message}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        maxWidth: '75%',
    },
    userAlign: {
        alignSelf: 'flex-end',
        backgroundColor: '#dcedc8', // Lightest green
        marginRight: 10,
    },
    otherAlign: {
        alignSelf: 'flex-start',
        backgroundColor: '#fffde7', // Lightest yellow
        marginLeft: 10,
    },
    userText: {
        color: '#2e7d32', // Darker green
        fontSize: 16,
    },
    otherText: {
        color: '#333',
        fontSize: 16,
    },
    timestamp: {
        fontSize: 11,
        color: '#757575',
        alignSelf: 'flex-end',
        marginTop: 3,
    },
    userSender: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
        color: '#1b5e20', // Even darker green
        alignSelf: 'flex-end',
    },
    otherSender: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
        color: '#546e7a', // Grayish blue
        alignSelf: 'flex-start',
    },
});

export default MessageBubble;
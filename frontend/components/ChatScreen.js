import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { io } from 'socket.io-client';
import MessageBubble from './MessageBubble';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [userList, setUserList] = useState([]);
    const flatListRef = useRef(null);

    useEffect(() => {
        const newSocket = io('http://10.1.34.60:3000');
        setSocket(newSocket);

        newSocket.on('receive-message', (data) => {
            console.log('Message received on phone/web:', data);
            setMessages((prevMessages) => [...prevMessages, data]);
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        });

        newSocket.on('user-connected', (userName) => {
            console.log(`${userName} connected`);
        });

        newSocket.on('user-disconnected', (userName) => {
            console.log(`${userName} disconnected`);
        });

        newSocket.on('user-list', (users) => {
            setUserList(users);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleLogin = useCallback(() => {
        if (username.trim() && password.trim() && socket) {
            socket.emit('login', { username: username.trim(), password: password.trim() }, (response) => {
                if (response.success) {
                    setUsername(response.username);
                    setPassword('');
                    setLoggedIn(true);
                    setLoginError('');
                } else {
                    setLoginError(response.error);
                }
            });
        } else {
            setLoginError('Username and password cannot be empty.');
        }
    }, [username, password, socket]);

    const handleSendMessage = useCallback(() => {
        if (newMessage.trim() && socket && loggedIn) {
            socket.emit('send-message', newMessage);
            setNewMessage('');
        } else if (!loggedIn) {
            alert('Please log in to send messages.');
        }
    }, [newMessage, socket, loggedIn]);

    const renderItem = useCallback(({ item }) => (
        <MessageBubble message={item.text} sender={item.sender === username ? 'You' : item.sender} timestamp={item.timestamp} isUser={item.sender === username} />
    ), [username]);

    if (!loggedIn) {
        return (
            <View style={styles.loginContainer}>
                <Text style={styles.loginTitle}>Welcome to Chat!</Text>
                {loginError && <Text style={styles.loginErrorText}>{loginError}</Text>}
                <TextInput
                    style={styles.loginInput}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                    placeholderTextColor="#999"
                />
                <TextInput
                    style={styles.loginInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#e8f5e9' }} // Light green background
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <View style={styles.chatContainer}>
                <Text style={styles.chatTitle}>Simple Chat</Text>
                {userList.length > 0 && (
                    <Text style={styles.userList}>Users online: {userList.join(', ')}</Text>
                )}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 10 }}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Type a message..."
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4c3', // Light yellow background for login
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    loginTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#558b2f', // Darker green
    },
    loginErrorText: {
        color: '#d32f2f', // Red error text
        marginBottom: 15,
        textAlign: 'center',
    },
    loginInput: {
        height: 50,
        borderColor: '#a5d6a7', // Light green border
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 25,
        backgroundColor: 'white',
        fontSize: 18,
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#558b2f', // Darker green button
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    chatContainer: {
        flex: 1,
        padding: 10,
    },
    chatTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#388e3c', // Another shade of green
    },
    userList: {
        marginBottom: 10,
        fontSize: 14,
        color: '#7cb342', // Lighter green
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f1f8e9', // Very light green
        borderRadius: 30,
        margin: 10,
        borderWidth: 1,
        borderColor: '#a5d6a7',
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: 'transparent',
        borderWidth: 0,
        marginRight: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        fontSize: 18,
        color: '#333',
        backgroundColor: 'white',
    },
    sendButton: {
        backgroundColor: '#388e3c', // Green send button
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default ChatScreen;